import { parseCSVProducts } from './parseProducts'

export async function getAllProducts() {
  return parseCSVProducts()
}

export async function getProductBySlug(slug: string) {
  const products = parseCSVProducts()
  return products.find((product) => product.slug === slug) || null
}

export function getProductsByCategory(category: string) {
  const products = parseCSVProducts()
  return products.filter(product => product.categories.includes(category))
} 