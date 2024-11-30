import { Product } from '@/types/product'
import path from 'path'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

export function parseCSVProducts(): Product[] {
  const csvPath = path.join(process.cwd(), 'ProductData.csv')
  const content = fs.readFileSync(csvPath, 'utf-8')
  
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ',',
  })

  return records.map((record: any, index: number): Product => {
    // Split features and applications into arrays
    const keyFeatures = record['Key Features']?.split(';').map((f: string) => f.trim()) || []
    const applications = record['Applications']?.split(',').map((a: string) => a.trim()) || []
    
    // Create specifications object
    const specifications: { [key: string]: string } = {
      'Gas Type': record['Gas Type'] || '',
      'Cylinder Size': record['Cylinder Size'] || '',
      'Pressure/Content': record['Pressure/Content'] || '',
      'Cylinder Dimensions': record['Cylinder Dimensions'] || '',
      'Cylinder Weight': record['Cylinder Weight'] || '',
      'Output': record['Output'] || '',
      'Refundable Deposit': record['Refundable Deposit'] || '',
    }

    // Determine category based on gas type
    const categories = determineCategories(record['Gas Type'], record['Product Name'])

    return {
      id: index + 1,
      name: record['Product Name'],
      description: `${record['Product Name']} - ${record['Gas Type']}`,
      specifications,
      keyFeatures,
      usesAndApplications: record['Typical Uses'] || '',
      imageUrl: record['Image URL'],
      categories,
      slug: record['Slug'],
    }
  })
}

function determineCategories(gasType: string, productName: string): string[] {
  const categories: string[] = []
  
  // Add categories based on gas type
  if (gasType.includes('CO₂') || gasType.includes('CO2')) {
    if (productName.toLowerCase().includes('mig')) {
      categories.push('MIG Welding Gas')
    } else if (productName.toLowerCase().includes('beer') || 
               productName.toLowerCase().includes('cellar')) {
      categories.push('Beer Gas')
    }
  }
  
  if (gasType.includes('Argon')) {
    if (productName.toLowerCase().includes('tig')) {
      categories.push('TIG Welding Gas')
    } else if (productName.toLowerCase().includes('mig')) {
      categories.push('MIG Welding Gas')
    }
  }
  
  if (gasType.includes('Oxygen') || 
      gasType.includes('Propylene') || 
      gasType.includes('Propane')) {
    categories.push('Oxy Fuel Gas')
  }
  
  if (gasType.includes('Helium')) {
    categories.push('Balloon Gas')
  }
  
  if (gasType.includes('Butane')) {
    categories.push('Fuel Gas')
  }

  // If no category was assigned, add a default
  if (categories.length === 0) {
    categories.push('Other Gas')
  }

  return categories
} 