import { Product } from '@/types/product'
import { parseProducts } from './parseProducts'

export async function getAllProducts(): Promise<Product[]> {
  const products = await parseProducts()
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await parseProducts()
  return products.find(p => p.Slug === slug) || null
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  const products = await parseProducts()
  return products.filter(p => 
    p.ID !== product.ID && 
    p.ProductCategories.some(cat => 
      product.ProductCategories.includes(cat)
    )
  ).slice(0, 3)
} 