import { promises as fs } from 'fs'
import path from 'path'
import { Product } from '@/types/product'

function determineCategories(gasType: string, productName: string): string[] {
  const categories: string[] = []
  const lowerName = productName.toLowerCase()
  const lowerType = gasType.toLowerCase()

  // MIG Welding Gas
  if (
    lowerName.includes('mig') || 
    (lowerType.includes('co2') && lowerName.includes('welding')) ||
    (lowerType.includes('argon') && lowerName.includes('welding')) ||
    (lowerType.includes('mix') && lowerName.includes('welding'))
  ) {
    categories.push('MIG Welding Gas')
  }

  // TIG Welding Gas
  if (
    lowerName.includes('tig') || 
    (lowerType.includes('pure argon') && lowerName.includes('welding')) ||
    (lowerType.includes('argon') && !categories.includes('MIG Welding Gas') && lowerName.includes('welding'))
  ) {
    categories.push('TIG Welding Gas')
  }

  // Oxy Fuel Gas
  if (
    lowerName.includes('heating') ||
    lowerName.includes('cutting') ||
    lowerName.includes('brazing') ||
    lowerType.includes('propylene') ||
    lowerType.includes('oxygen') ||
    lowerType.includes('oxy') ||
    (lowerType.includes('nitrogen') && lowerName.includes('ofn'))
  ) {
    categories.push('Oxy Fuel Gas')
  }

  return categories
}

function isValidImageUrl(url: string): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'ProductData.csv')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    
    const lines = fileContent.trim().split('\n')
    const headers = lines[0].split(',')
    
    let products: Product[] = []
    
    lines.slice(1).forEach((line, index) => {
      if (!line.trim()) return

      const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || []
      const record: { [key: string]: string } = {}
      
      headers.forEach((header, i) => {
        const value = values[i] || ''
        record[header.trim()] = value.replace(/^"|"$/g, '').trim()
      })

      const categories = determineCategories(record['Gas Type'], record['Product Name'])

      // Create the product object
      const product: Product = {
        id: index + 1,
        name: record['Product Name'],
        description: `${record['Product Name']} - ${record['Gas Type']}`,
        specifications: {
          'Gas Type': record['Gas Type'] || '',
          'Cylinder Size': record['Cylinder Size'] || '',
          'Pressure/Content': record['Pressure/Content'] || '',
          'Cylinder Dimensions': record['Cylinder Dimensions'] || '',
          'Cylinder Weight': record['Cylinder Weight'] || '',
          'Output': record['Output'] || '',
          'Refundable Deposit': record['Refundable Deposit'] || '',
        },
        keyFeatures: record['Key Features']?.split(';')
          .map(f => f.trim())
          .filter(Boolean) || [],
        usesAndApplications: record['Typical Uses'] || '',
        imageUrl: isValidImageUrl(record['Image URL']) 
          ? record['Image URL'] 
          : '/images/placeholder.jpg',
        categories: categories.length > 0 ? categories : ['Other Gas'],
        slug: record['Slug'] || ''
      }

      if (product.name && product.slug) {
        products.push(product)
      }
    })

    // Sort products by category priority
    const categoryPriority = {
      'MIG Welding Gas': 1,
      'TIG Welding Gas': 2,
      'Oxy Fuel Gas': 3,
      'Other Gas': 4
    }

    products.sort((a, b) => {
      const priorityA = categoryPriority[a.categories[0] as keyof typeof categoryPriority] || 999
      const priorityB = categoryPriority[b.categories[0] as keyof typeof categoryPriority] || 999
      return priorityA - priorityB
    })

    console.log(`Processed ${products.length} products`)
    return Response.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    return Response.json({ error: 'Failed to load products' }, { status: 500 })
  }
} 