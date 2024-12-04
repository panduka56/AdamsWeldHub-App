import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

interface RawProduct {
  ID: string;
  Title: string;
  'Product Categories': string;
  Slug: string;
}

interface EnhancedProduct {
  ID: string;
  Title: string;
  ProductCategories: string[];
  Slug: string;
  GasType: string[];
  GasMixPercentage: string | null;
  VolumeLiters: number | null;
  PressureBar: number | null;
  Application: string[];
  Supplier: string;
  RentFree: boolean;
}

function extractProductDetails(product: RawProduct): EnhancedProduct {
  const title = product.Title.toLowerCase()
  
  // Extract gas type and mix percentage
  const gasInfo = (() => {
    if (title.includes('co2') && title.includes('argon')) {
      const co2Match = title.match(/(\d+)%\s*co2/)
      const co2Percentage = co2Match ? parseInt(co2Match[1]) : null
      return {
        types: ['CO2', 'Argon'],
        mixture: co2Percentage ? `${co2Percentage}% CO₂ / ${100-co2Percentage}% Argon` : null
      }
    }
    if (title.includes('pure argon')) {
      return { types: ['Argon'], mixture: '100% Argon' }
    }
    if (title.includes('oxygen')) {
      return { types: ['Oxygen'], mixture: null }
    }
    // Add more gas type detection rules
    return { types: [], mixture: null }
  })()

  // Extract volume
  const volumeMatch = title.match(/(\d+)l/)
  const volumeLiters = volumeMatch ? parseInt(volumeMatch[1]) : null

  // Extract pressure
  const pressureMatch = title.match(/(\d+)bar/)
  const pressureBar = pressureMatch ? parseInt(pressureMatch[1]) : null

  // Determine if rent free
  const rentFree = title.includes('rent free')

  // Extract supplier
  const supplier = title.includes('calor') ? 'Calor Gas' : 
                  title.includes('campingaz') ? 'Campingaz' : 
                  'Adams Gas'

  // Parse categories into array
  const categories = product['Product Categories'].split('|').map(c => c.trim())

  return {
    ID: product.ID,
    Title: product.Title,
    ProductCategories: categories,
    Slug: product.Slug,
    GasType: gasInfo.types,
    GasMixPercentage: gasInfo.mixture,
    VolumeLiters: volumeLiters,
    PressureBar: pressureBar,
    Application: categories,
    Supplier: supplier,
    RentFree: rentFree
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'Cleaned_Welding_Gas_Products.csv')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }) as RawProduct[]

    // Transform and filter welding products
    const enhancedProducts = records
      .map(extractProductDetails)
      .filter(product => 
        product.ProductCategories.some(cat => 
          cat.includes('MIG Welding Gas') || 
          cat.includes('TIG Welding Gas') || 
          cat.includes('Oxy Fuel Gas')
        )
      )

    return NextResponse.json(enhancedProducts)
  } catch (error) {
    console.error('Error processing products:', error)
    return NextResponse.json(
      { error: 'Failed to process products' },
      { status: 500 }
    )
  }
} 