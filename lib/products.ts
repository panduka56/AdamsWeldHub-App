import { Product } from './types'
import rawProductsData from './products.json'

// Define welding-related categories
const WELDING_CATEGORIES = [
  'MIG Welding Gas',
  'TIG Welding Gas',
  'Oxy Fuel Gas'
]

// Validate and filter welding products
const validateProduct = (product: any): product is Product => {
  return (
    typeof product === 'object' &&
    typeof product.Title === 'string' &&
    typeof product.Content === 'string' &&
    typeof product['Image URL'] === 'string' &&
    typeof product['Product Categories'] === 'string' &&
    typeof product.Slug === 'string'
  )
}

// Convert raw data to Product type and filter for welding products only
export const products: Product[] = (Array.isArray(rawProductsData) ? rawProductsData : [])
  .filter(validateProduct)
  .filter(product => {
    const categories = product['Product Categories'].split('|')
    return categories.some(cat => WELDING_CATEGORIES.includes(cat.trim()))
  })
  .map(product => ({
    ...product,
    Content: product.Content.replace(/\n/g, ' ').trim(),
    categories: product['Product Categories']
      .split('|')
      .map(cat => cat.trim())
      .filter(cat => WELDING_CATEGORIES.includes(cat))
  }))

// Get unique welding categories
export const getCategories = (): string[] => {
  return WELDING_CATEGORIES
}

// Get featured welding products
export const getFeaturedProducts = (): Product[] => {
  return products
    .filter(product => product.categories.includes('MIG Welding Gas') || 
                      product.categories.includes('TIG Welding Gas'))
    .slice(0, 3)
}

// Get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.Slug === slug)
} 