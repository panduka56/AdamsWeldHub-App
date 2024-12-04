import { Product } from '@/types/product'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface AvailableCylindersProps {
  recommendedGas: string | null
  process: string
  products: Product[]
}

export default function AvailableCylinders({ recommendedGas, process, products }: AvailableCylindersProps) {
  const filteredProducts = products.filter(product => {
    // Match by gas mixture
    if (recommendedGas && product.GasMixPercentage) {
      const normalizedRecommended = recommendedGas.toLowerCase().replace(/\s/g, '')
      const normalizedProduct = product.GasMixPercentage.toLowerCase().replace(/\s/g, '')
      return normalizedProduct.includes(normalizedRecommended)
    }
    return false
  })

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 
                    dark:border-[#FF8C42]/20 p-8 h-fit">
      <h2 className="text-2xl font-[350] mb-6">Available Cylinders</h2>
      
      <div className="space-y-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.ID}
            className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                     hover:border-[#FF8C42]/40 transition-colors group"
          >
            <Link 
              href={`/products/${product.Slug}`} 
              className="block hover:opacity-80 transition-opacity"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-[350] text-[#FF8C42] group-hover:text-[#FF8C42]/80">
                  {product.Title}
                </h3>
                <ExternalLink className="w-4 h-4 text-[#FF8C42] opacity-0 group-hover:opacity-100" />
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {product.ProductCategories.map((category, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-[#FF8C42]/10 text-[#FF8C42]"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-[#E5E5E5]/60">
                  {product.VolumeLiters && (
                    <div>
                      <span className="text-[#E5E5E5]/40">Volume:</span>{' '}
                      <span className="text-[#E5E5E5]">{product.VolumeLiters}L</span>
                    </div>
                  )}
                  {product.PressureBar && (
                    <div>
                      <span className="text-[#E5E5E5]/40">Pressure:</span>{' '}
                      <span className="text-[#E5E5E5]">{product.PressureBar} Bar</span>
                    </div>
                  )}
                  {product.GasMixPercentage && (
                    <div className="col-span-2">
                      <span className="text-[#E5E5E5]/40">Mix:</span>{' '}
                      <span className="text-[#E5E5E5]">{product.GasMixPercentage}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-[#E5E5E5]/60">
            No matching cylinders found
          </div>
        )}
      </div>
    </div>
  )
} 