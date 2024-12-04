import { Product } from '@/types/product'
import path from 'path'
import { promises as fs } from 'fs'

export async function parseProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), 'data', 'Cleaned_Welding_Gas_Products.csv')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  
  // Parse CSV and convert to Product type
  const products = fileContent
    .split('\n')
    .slice(1) // Skip header row
    .map(line => {
      const [
        ID,
        Title,
        Slug,
        Content,
        ImageURL,
        VolumeLiters,
        PressureBar,
        GasMixPercentage,
        Categories
      ] = line.split(',').map(field => field.trim())

      return {
        ID,
        Title,
        Slug,
        Content,
        'Image URL': ImageURL,
        imageUrl: ImageURL,
        VolumeLiters,
        PressureBar,
        GasMixPercentage,
        ProductCategories: Categories ? Categories.split(';').map(c => c.trim()) : [],
        categories: Categories ? Categories.split(';').map(c => c.trim()) : [],
        specifications: {
          'Gas Type': GasMixPercentage,
          'Cylinder Size': VolumeLiters ? `${VolumeLiters}L` : undefined
        }
      }
    })

  return products
} 