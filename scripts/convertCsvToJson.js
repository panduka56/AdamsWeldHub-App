const fs = require('fs-extra')
const { parse } = require('csv-parse/sync')
const path = require('path')

async function convertCsvToJson() {
  try {
    const csvPath = path.join(__dirname, '../data/Cleaned_Welding_Gas_Products.csv')
    const jsonPath = path.join(__dirname, '../lib/products.json')

    console.log('Reading CSV file...')
    const csvData = await fs.readFile(csvPath, 'utf-8')
    
    console.log('Parsing CSV data...')
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      quote: '"',
      escape: '"',
      relax_quotes: true,
      relax_column_count: true,
      relax: true,
      skip_records_with_error: true,
      on_record: (record) => {
        try {
          // Clean and transform each record
          const content = record.Content
            ?.replace(/[\n\r]+/g, ' ')
            ?.replace(/\s+/g, ' ')
            ?.replace(/\\"/g, '"')
            ?.replace(/"""/g, '"')
            ?.replace(/["]+/g, '"')
            ?.trim() || ''

          return {
            Title: record.Title?.trim() || '',
            Content: content,
            'Image URL': record['Image URL']?.trim() || '',
            'Product Categories': record['Product Categories']?.trim() || '',
            Slug: record.Slug?.trim() || ''
          }
        } catch (err) {
          console.warn('Warning: Error processing record:', record.Title || 'Unknown', err)
          return null
        }
      }
    })

    // Filter out any null records
    const cleanedRecords = records.filter(Boolean)

    console.log(`Found ${records.length} records in CSV`)
    console.log(`Cleaned ${cleanedRecords.length} records`)

    // Write JSON file
    await fs.writeJson(jsonPath, cleanedRecords, { spaces: 2 })
    console.log('Successfully converted CSV to JSON')

    // Validate the output
    const jsonContent = await fs.readJson(jsonPath)
    console.log(`Wrote ${jsonContent.length} records to JSON file`)
    console.log('First record:', jsonContent[0])
    console.log('Last record:', jsonContent[jsonContent.length - 1])

  } catch (err) {
    console.error('Error converting CSV to JSON:', err)
  }
}

convertCsvToJson() 