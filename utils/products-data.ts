import { Product } from '@/types/product'
import { parseProducts } from './parseProducts'

export async function getProducts(): Promise<Product[]> {
  return parseProducts()
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await parseProducts()
  return products.find(p => p.Slug === slug) || null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await parseProducts()
  return products.filter(p => 
    p.ProductCategories.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  )
} 