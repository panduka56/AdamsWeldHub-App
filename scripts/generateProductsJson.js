const path = require('path');
const fs = require('fs/promises');
const { parse } = require('csv-parse/sync');

async function generateProductsJson() {
  try {
    const csvPath = path.join(process.cwd(), 'data', 'Cleaned_Welding_Gas_Products.csv');
    const jsonPath = path.join(process.cwd(), 'data', 'products.json');

    console.log('Reading CSV file...');
    const csvData = await fs.readFile(csvPath, 'utf-8');
    
    console.log('Parsing CSV data...');
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });

    const products = records.map(record => ({
      ID: record.ID,
      Title: record.Title,
      Content: record.Content,
      ImageURL: `/images/products/${record.Slug}.jpg`,
      ProductCategories: record['Product Categories']?.split('|') || [],
      Slug: record.Slug,
      categories: record['Product Categories']?.split('|') || [],
      specifications: {
        'Gas Type': record.Title?.split(',')[0],
        'Cylinder Size': record.Title?.match(/([\d.]+)L|(\d+)kg/)?.[0] || ''
      }
    }));

    console.log('Writing JSON file...');
    await fs.writeFile(jsonPath, JSON.stringify(products, null, 2));
    console.log('Products JSON generated successfully!');
  } catch (error) {
    console.error('Error generating products JSON:', error);
    process.exit(1);
  }
}

generateProductsJson(); 