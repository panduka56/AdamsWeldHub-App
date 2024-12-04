import { Product } from '@/types/product'
import path from 'path'
import { promises as fs } from 'fs'

export async function getProducts(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'Cleaned_Welding_Gas_Products.csv')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    
    // Parse CSV manually since we know the format
    const rows = fileContent.split('\n').slice(1) // Skip header
    
    const products = rows.map(row => {
      // Split by comma but handle quoted values
      const [ID, Title, ProductCategories, Slug] = row
        .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
        ?.map(str => str.replace(/^"|"$/g, '').trim()) || []

      // Extract gas type and size from title
      const gasMatch = Title?.match(/([\d.]+)L|(\d+)kg/)
      const volumeSize = gasMatch ? gasMatch[0] : ''
      const gasType = Title?.split(',')[0]?.replace('_', '')

      return {
        ID,
        Title: Title?.replace('_', ''),
        Content: `${Title?.replace('_', '')} - Available from Adams Gas. Professional welding supplies and gases.`,
        ImageURL: `/images/products/${Slug}.jpg`,
        ProductCategories,
        Slug,
        categories: ProductCategories?.split('|').map(c => c.trim()) || [],
        GasMixPercentage: gasType,
        VolumeLiters: volumeSize,
        PressureBar: '200',
        specifications: {
          'Gas Type': gasType,
          'Cylinder Size': volumeSize
        }
      } as Product
    }).filter(product => 
      product.ID && 
      product.Title && 
      product.ProductCategories && 
      product.Slug
    )

    console.log('Total products:', products.length)
    console.log('Sample product:', products[0])
    return products

  } catch (error) {
    console.error('Error in getProducts:', error)
    return []
  }
}
  