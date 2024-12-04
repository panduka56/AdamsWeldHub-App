import { Product } from '@/types/product'
import path from 'path'
import { promises as fs } from 'fs'

export async function getProducts(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'Cleaned_Welding_Gas_Products.csv')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    
    const rows = fileContent.split('\n').slice(1)
    
    const products = rows.map(row => {
      const [ID, Title, ProductCategories, Slug] = row
        .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
        ?.map(str => str.replace(/^"|"$/g, '').trim()) || []

      const gasMatch = Title?.match(/([\d.]+)L|(\d+)kg/)
      const volumeSize = gasMatch ? gasMatch[0] : ''
      const gasType = Title?.split(',')[0]?.replace('_', '')
      
      const categories = ProductCategories?.split('|').map(c => c.trim()) || []

      return {
        ID,
        Title: Title?.replace('_', ''),
        Content: `${Title?.replace('_', '')} - Available from Adams Gas. Professional welding supplies and gases.`,
        ImageURL: `/images/products/${Slug}.jpg`,
        ProductCategories: categories,
        Slug,
        categories,
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

    return products
  } catch (error) {
    console.error('Error in getProducts:', error)
    return []
  }
}
  