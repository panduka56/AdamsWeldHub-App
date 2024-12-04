import { Phone, Globe, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Product } from '@/types/product'
import type { WeldingProcess } from '@/types/welding'
import type { GasRecommendation } from '@/app/data/welding-data/gas-recommendations'

interface AvailableCylindersProps {
  process: WeldingProcess
  thickness: number
  recommendation: GasRecommendation
  products: Product[]
}

export default function AvailableCylinders({
  process,
  thickness,
  recommendation,
  products = []
}: AvailableCylindersProps) {
  const scoredProducts = products
    .map(product => {
      let score = 0;
      
      // Process match (highest priority)
      const processMatch = product.ProductCategories.some(cat => 
        cat.toLowerCase().includes(process.toLowerCase())
      )
      if (!processMatch) return { product, score: -1 };
      score += 10;

      // Gas mixture match
      if (product.GasMixPercentage && recommendation.primaryGas) {
        const normalizedProduct = product.GasMixPercentage.toLowerCase().replace(/\s/g, '')
        const normalizedGas = recommendation.primaryGas.toLowerCase().replace(/\s/g, '')
        
        // Exact match
        if (normalizedProduct === normalizedGas) {
          score += 8;
        }
        // Partial match
        else if (normalizedProduct.includes(normalizedGas)) {
          score += 5;
        }
        // Alternative gas match
        else if (recommendation.alternativeGas && 
                 normalizedProduct.includes(recommendation.alternativeGas.toLowerCase())) {
          score += 3;
        }
      }

      // Volume suitability
      if (product.VolumeLiters) {
        const volume = parseInt(product.VolumeLiters);
        // Professional size (most common)
        if (volume === 20) score += 4;
        // Hobby size (good for thin materials)
        else if (volume === 10 && thickness < 3) score += 3;
        // Industrial size (good for thick materials)
        else if (volume === 50 && thickness > 12) score += 3;
        // Other sizes
        else score += 1;
      }

      return { product, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const filteredProducts = scoredProducts.map(item => item.product);

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 
                    dark:border-[#FF8C42]/20 p-8 h-fit">
      <h2 className="text-2xl font-[350] mb-6">Recommended Cylinders</h2>
      
      <div className="space-y-6">
        {filteredProducts.length > 0 ? (
          <>
            <p className="text-sm text-[#E5E5E5]/60 mb-4">
              Showing best matches for your {process} welding requirements:
            </p>

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
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-8 text-[#E5E5E5]/60">
              We couldn&apos;t find an exact match for your requirements
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <a 
                href="tel:+441215448960"
                className="flex items-center justify-center gap-2 p-4 
                         bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                         hover:border-[#FF8C42]/40 transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#FF8C42]" />
                <span className="text-[#E5E5E5]">
                  Call us at <span className="text-[#FF8C42]">0121 544 8960</span>
                </span>
              </a>

              <a 
                href="https://www.adamsgas.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 
                         bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                         hover:border-[#FF8C42]/40 transition-colors group"
              >
                <Globe className="w-4 h-4 text-[#FF8C42]" />
                <span className="text-[#E5E5E5]">Visit our full website</span>
              </a>
            </div>

            <p className="text-center text-sm text-[#E5E5E5]/60 mt-4">
              Our experts can help you find the perfect gas solution for your needs. 
              We stock a wide range of welding gases and can provide custom mixtures on request.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 