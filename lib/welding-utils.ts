import { WeldingProcess, MaterialType } from '@/types/welding'
import { Product } from '@/types/product'
import { gasRecommendations } from '@/app/data/welding-data/gas-recommendations'
import type { GasRecommendation } from '@/app/data/welding-data/gas-recommendations'

export function determineThicknessRange(thickness: number): string {
  if (thickness <= 3) return '<3'
  if (thickness > 3 && thickness <= 12) return '3-12'
  if (thickness > 12) return '>12'
  return 'All'
}

export function getGasRecommendation(
  process: WeldingProcess,
  material: MaterialType,
  thickness: number
): GasRecommendation | null {
  const processRecommendations = gasRecommendations[process]
  if (!processRecommendations) return null

  const materialOptions = processRecommendations[material]
  if (!materialOptions) return null

  const matches = materialOptions.filter(option => {
    if (option.thicknessRange === 'All') return true
    
    if (option.thicknessRange.startsWith('<')) {
      const maxThickness = parseFloat(option.thicknessRange.substring(1))
      return thickness < maxThickness
    }
    if (option.thicknessRange.startsWith('≥')) {
      const minThickness = parseFloat(option.thicknessRange.substring(1))
      return thickness >= minThickness
    }
    if (option.thicknessRange.includes('-')) {
      const [min, max] = option.thicknessRange.split('-').map(Number)
      return thickness >= min && thickness <= max
    }
    
    return false
  })

  return matches.sort((a, b) => a.priority - b.priority)[0] || null
}

export function findMatchingProducts(recommendation: GasRecommendation, products: Product[]): Product[] {
  if (!recommendation.productMatches) return []
  
  return products.filter(product => 
    recommendation.productMatches!.primary.some(term => 
      product.Slug.toLowerCase().includes(term.toLowerCase())
    )
  )
} 