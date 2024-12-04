import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ShoppingCart, AlertCircle, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Product {
  ID: string;
  Title: string;
  ProductCategories: string[];
  Slug: string;
  GasType: string[];
  GasMixPercentage: string | null;
  VolumeLiters: number | null;
  PressureBar: number | null;
  Application: string[];
  Supplier: string;
  RentFree: boolean;
}

// Helper function to match gas mix to products
function findMatchingProducts(gasMix: string, process: string, products: Product[]): Product[] {
  try {
    return products.filter(product => {
      // Match process first
      const matchesProcess = product.ProductCategories.includes(`${process} Welding Gas`) ||
                           (process === 'Oxy-Fuel' && product.ProductCategories.includes('Oxy Fuel Gas'))

      if (!matchesProcess) return false

      // Match gas mix
      if (!product.GasMixPercentage) return false

      const normalizedRecommended = gasMix.toLowerCase().replace('₂', '2')
      const normalizedProduct = product.GasMixPercentage.toLowerCase()

      // Exact match
      if (normalizedRecommended === normalizedProduct) return true

      // Handle similar mixes (e.g., 75/25 matching 80/20)
      if (normalizedRecommended.includes('argon') && normalizedRecommended.includes('co2')) {
        const recommendedCO2 = parseInt(normalizedRecommended.match(/(\d+)%\s*co2/)?.[1] || '0')
        const productCO2 = parseInt(normalizedProduct.match(/(\d+)%\s*co2/)?.[1] || '0')
        
        // Allow 5% variance in CO2 content
        return Math.abs(recommendedCO2 - productCO2) <= 5
      }

      return false
    })
  } catch (error) {
    console.error('Error matching products:', error)
    return []
  }
}

interface ResultsDisplayProps {
  process: string;
  material: string;
  thickness: number;
  recommendedGases: string[];
}

type SortOption = 'volume' | 'supplier' | 'default'
type FilterOptions = {
  rentFree: boolean
  volumePreference?: number
  supplier?: string
}

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'volume':
        return (a.VolumeLiters || 0) - (b.VolumeLiters || 0)
      case 'supplier':
        return a.Supplier.localeCompare(b.Supplier)
      default:
        return 0
    }
  })
}

function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  return products.filter(product => {
    if (filters.rentFree && !product.RentFree) return false
    if (filters.supplier && product.Supplier !== filters.supplier) return false
    if (filters.volumePreference && product.VolumeLiters) {
      // Allow ±10L from preferred volume
      const diff = Math.abs(product.VolumeLiters - filters.volumePreference)
      if (diff > 10) return false
    }
    return true
  })
}

export default function ResultsDisplay({ 
  process, 
  material, 
  thickness, 
  recommendedGases 
}: ResultsDisplayProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [filters, setFilters] = useState<FilterOptions>({
    rentFree: false
  })

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to load products')
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError('Failed to load product recommendations')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const matchingProducts = recommendedGases[0] 
    ? filterProducts(
        sortProducts(
          findMatchingProducts(recommendedGases[0], process, products),
          sortBy
        ),
        filters
      )
    : []

  const uniqueSuppliers = Array.from(new Set(products.map(p => p.Supplier)))
  const availableVolumes = Array.from(
    new Set(
      products
        .filter(p => p.VolumeLiters)
        .map(p => p.VolumeLiters)
    )
  ).filter((vol): vol is number => vol !== null)

  // Add debugging
  console.log('Debug Info:', {
    recommendedGas: recommendedGases[0],
    process,
    availableProducts: products,
    matchingProducts,
  })

  if (loading) {
    return (
      <div className="text-center p-8 text-[#E5E5E5]/60">
        Loading product recommendations...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-[#FF8C42]">
        <AlertCircle className="w-5 h-5 mr-2" />
        {error}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#222222]/80 p-6 rounded-xl border border-[#FF8C42]/10"
    >
      {/* Gas Mix Recommendations */}
      <h2 className="text-2xl font-[350] text-[#E5E5E5] mb-4">Recommended Gas Mix</h2>
      {recommendedGases.length > 0 ? (
        <div>
          <div className="text-4xl font-[350] text-[#FF8C42] mb-6">{recommendedGases[0]}</div>
          {recommendedGases.length > 1 && (
            <div className="text-[#E5E5E5]/60">
              Alternative options:
              <ul className="list-disc list-inside mt-2 space-y-1">
                {recommendedGases.slice(1).map((gas, i) => (
                  <li key={i}>{gas}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-[#FF8C42] mb-6">
          No recommendations available for the selected combination
        </div>
      )}

      {/* Selection Details */}
      <div className="grid grid-cols-2 gap-4 text-[#E5E5E5]/60 mb-8">
        <div>
          <strong className="text-[#E5E5E5]">Process:</strong> {process}
        </div>
        <div>
          <strong className="text-[#E5E5E5]">Material:</strong> {material}
        </div>
        <div>
          <strong className="text-[#E5E5E5]">Thickness:</strong> {thickness} mm
        </div>
      </div>

      {/* Product Recommendations */}
      {matchingProducts.length > 0 ? (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-[350] text-[#E5E5E5]">Available Cylinders</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[#FF8C42] hover:text-[#FF8C42]/80 
                       transition-colors text-sm"
              aria-expanded={showFilters}
              aria-label="Toggle filters"
            >
              {showFilters ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sort Options */}
                <div>
                  <label className="block text-sm text-[#E5E5E5]/60 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full bg-[#222222] border border-[#FF8C42]/20 rounded-lg 
                             p-2 text-[#E5E5E5] text-sm"
                  >
                    <option value="default">Default</option>
                    <option value="volume">Cylinder Volume</option>
                    <option value="supplier">Supplier</option>
                  </select>
                </div>

                {/* Volume Preference */}
                <div>
                  <label className="block text-sm text-[#E5E5E5]/60 mb-2">Preferred Volume</label>
                  <select
                    value={filters.volumePreference || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      volumePreference: e.target.value ? Number(e.target.value) : undefined
                    }))}
                    className="w-full bg-[#222222] border border-[#FF8C42]/20 rounded-lg 
                             p-2 text-[#E5E5E5] text-sm"
                  >
                    <option value="">Any Volume</option>
                    {availableVolumes.sort((a, b) => (a || 0) - (b || 0)).map(vol => (
                      <option key={vol} value={vol}>{vol}L</option>
                    ))}
                  </select>
                </div>

                {/* Additional Filters */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-[#E5E5E5]">
                    <input
                      type="checkbox"
                      checked={filters.rentFree}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        rentFree: e.target.checked
                      }))}
                      className="rounded border-[#FF8C42]/20"
                    />
                    Rent Free Only
                  </label>
                  
                  {uniqueSuppliers.length > 1 && (
                    <select
                      value={filters.supplier || ''}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        supplier: e.target.value || undefined
                      }))}
                      className="w-full bg-[#222222] border border-[#FF8C42]/20 rounded-lg 
                               p-2 text-[#E5E5E5] text-sm"
                    >
                      <option value="">Any Supplier</option>
                      {uniqueSuppliers.map(supplier => (
                        <option key={supplier} value={supplier}>{supplier}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Product Cards */}
          <div className="space-y-4">
            {matchingProducts.map((product) => (
              <div 
                key={product.ID}
                className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                         hover:border-[#FF8C42]/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-[#E5E5E5] font-[350] mb-1">{product.Title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.ProductCategories.map((category, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full bg-[#FF8C42]/10 
                                   text-[#FF8C42]"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    href={`https://adamsgas.co.uk/product/${product.Slug}/`}
                    target="_blank"
                    className="flex items-center text-[#FF8C42] hover:text-[#FF8C42]/80 
                             transition-colors text-sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    View Product
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  {product.VolumeLiters && (
                    <div>
                      <span className="text-[#E5E5E5]/60">Volume:</span>{' '}
                      <span className="text-[#E5E5E5]">{product.VolumeLiters}L</span>
                    </div>
                  )}
                  {product.PressureBar && (
                    <div>
                      <span className="text-[#E5E5E5]/60">Pressure:</span>{' '}
                      <span className="text-[#E5E5E5]">{product.PressureBar} Bar</span>
                    </div>
                  )}
                  {product.GasMixPercentage && (
                    <div>
                      <span className="text-[#E5E5E5]/60">Mix:</span>{' '}
                      <span className="text-[#E5E5E5]">{product.GasMixPercentage}</span>
                    </div>
                  )}
                  {product.RentFree && (
                    <div className="text-[#44FF88]">
                      Rent Free
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
            <div className="flex items-center text-[#FF8C42] mb-2">
              <AlertCircle className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-[350]">No Exact Matches Found</h3>
            </div>
            <p className="text-[#E5E5E5]/60">
              We couldn't find products matching your exact requirements, but you can browse our full range below:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {process === 'MIG' && (
              <Link 
                href="https://adamsgas.co.uk/product-category/mig-welding-gas/"
                target="_blank"
                className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                         hover:border-[#FF8C42]/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[#E5E5E5] font-[350]">MIG Welding Gas</h4>
                  <ExternalLink className="w-4 h-4 text-[#FF8C42] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-[#E5E5E5]/60">
                  View our full range of MIG welding gases
                </p>
              </Link>
            )}

            {process === 'TIG' && (
              <Link 
                href="https://adamsgas.co.uk/product-category/tig-welding-gas/"
                target="_blank"
                className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                         hover:border-[#FF8C42]/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[#E5E5E5] font-[350]">TIG Welding Gas</h4>
                  <ExternalLink className="w-4 h-4 text-[#FF8C42] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-[#E5E5E5]/60">
                  View our full range of TIG welding gases
                </p>
              </Link>
            )}

            {process === 'Oxy-Fuel' && (
              <Link 
                href="https://adamsgas.co.uk/product-category/oxy-fuel-gas/"
                target="_blank"
                className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                         hover:border-[#FF8C42]/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[#E5E5E5] font-[350]">Oxy-Fuel Gas</h4>
                  <ExternalLink className="w-4 h-4 text-[#FF8C42] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-[#E5E5E5]/60">
                  View our full range of oxy-fuel gases
                </p>
              </Link>
            )}

            <Link 
              href="https://adamsgas.co.uk/bottle-gases/"
              target="_blank"
              className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                       hover:border-[#FF8C42]/40 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[#E5E5E5] font-[350]">All Gas Products</h4>
                <ExternalLink className="w-4 h-4 text-[#FF8C42] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-[#E5E5E5]/60">
                Browse our complete range of gas products
              </p>
            </Link>

            <div className="col-span-2 text-center mt-2">
              <p className="text-sm text-[#E5E5E5]/60">
                Need help choosing? Contact us at{' '}
                <a 
                  href="tel:01843220596" 
                  className="text-[#FF8C42] hover:text-[#FF8C42]/80 transition-colors"
                >
                  01843 220 596
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

