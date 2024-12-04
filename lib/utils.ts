import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from '@/types/product'
import { productMatching } from '@/app/data/gasRecommendations'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findMatchingProducts(gas: string, products: Product[]): Product[] {
  const matchTerms = productMatching[gas as keyof typeof productMatching]
  if (!matchTerms) return []

  return products.filter(product => 
    matchTerms.every(term => 
      product.Slug.toLowerCase().includes(term.toLowerCase())
    )
  )
}
