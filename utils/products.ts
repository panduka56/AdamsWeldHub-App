import { Product } from '@/types/product'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts()
  return products.find((product) => product.slug === slug) || null
}

export function getProductsByCategory(category: string): Promise<Product[]> {
  return getAllProducts().then(products => 
    products.filter(product => product.categories.includes(category))
  )
} 