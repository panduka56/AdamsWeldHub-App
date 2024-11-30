import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { Product } from '@/types/product'

// Add image domain transformation
const transformImageUrl = (url: string) => {
  if (!url) return '/images/placeholder.jpg'
  if (url.startsWith('http')) {
    return url.replace(
      'adamsgas.co.uk/wp-content/uploads',
      'adamsgas.com/images/products'
    )
  }
  return url
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'ProductData.csv')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    
    const lines = fileContent.trim().split('\n')
    const headers = lines[0].split(',')
    
    let mainProduct: Product | null = null
    const allProducts: Product[] = []

    lines.slice(1).forEach(line => {
      const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || []
      const record: { [key: string]: string } = {}
      headers.forEach((header, i) => {
        record[header.trim()] = (values[i] || '').replace(/^"|"$/g, '').trim()
      })

      const product: Product = {
        id: record['Slug'],
        name: record['Product Name'],
        description: record['Applications'] || '',
        specifications: {
          'Gas Type': record['Gas Type'] || '',
          'Cylinder Size': record['Cylinder Size'] || '',
          'Pressure/Content': record['Pressure/Content'] || '',
          'Cylinder Dimensions': record['Cylinder Dimensions'] || '',
          'Cylinder Weight': record['Cylinder Weight'] || '',
          'Output': record['Output'] || '',
          'Refundable Deposit': record['Refundable Deposit'] || '',
        },
        keyFeatures: record['Key Features']?.split(';').map(f => f.trim()).filter(Boolean) || [],
        usesAndApplications: record['Typical Uses'] || '',
        imageUrl: record['Image URL'] || '/images/placeholder.jpg',
        categories: [record['Gas Type'] || 'Other Gas'],
        slug: record['Slug']
      }

      if (record['Slug'] === params.slug) {
        mainProduct = product
      }
      allProducts.push(product)
    })

    // Transform image URLs for main product
    let transformedMainProduct: Product | null = null
    if (mainProduct !== null) {
      const typedProduct = mainProduct as Product
      transformedMainProduct = {
        ...typedProduct,
        imageUrl: transformImageUrl(typedProduct.imageUrl)
      }
    }

    // Transform image URLs for related products
    const relatedProducts = transformedMainProduct ? 
      allProducts
        .filter((p: Product) => 
          p.slug !== params.slug && 
          p.categories[0] === transformedMainProduct.categories[0]
        )
        .map((p: Product) => ({
          ...p,
          imageUrl: transformImageUrl(p.imageUrl)
        }))
        .slice(0, 3)
      : []

    return NextResponse.json({ 
      product: transformedMainProduct, 
      relatedProducts 
    })
  } catch (error) {
    console.error('Error reading product data:', error)
    return NextResponse.json({ 
      product: null, 
      relatedProducts: [] 
    }, { status: 500 })
  }
} 