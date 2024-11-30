'use client'

import { getAllProducts } from '@/utils/products'
import ProductCard from '@/components/ProductCard'
import { useState, useEffect } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Product } from '@/types/product'

const WELDING_CATEGORIES = [
  'MIG Welding Gas',
  'TIG Welding Gas',
  'Oxy Fuel Gas'
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await getAllProducts()
        // Filter to only include welding gases
        const weldingProducts = allProducts.filter(product => 
          product.categories.some(cat => WELDING_CATEGORIES.includes(cat))
        )
        if (weldingProducts.length === 0) {
          throw new Error('No welding products found')
        }
        setProducts(weldingProducts)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? 
      product.categories.includes(selectedCategory) : true
    const matchesSearch = product.name.toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort products by category
  const sortedProducts = filteredProducts.sort((a, b) => {
    const categoryOrder = {
      'MIG Welding Gas': 1,
      'TIG Welding Gas': 2,
      'Oxy Fuel Gas': 3
    }
    const categoryA = a.categories[0]
    const categoryB = b.categories[0]
    return (categoryOrder[categoryA as keyof typeof categoryOrder] || 999) -
           (categoryOrder[categoryB as keyof typeof categoryOrder] || 999)
  })

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF8C42]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Professional Welding Gas Solutions</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        High-quality welding gases for MIG, TIG, and Oxy-Fuel applications
      </p>
      
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block">
          <div className="bg-[#222222]/80 rounded-lg p-4 mb-8">
            <h2 className="text-xl font-[350] mb-4">Gas Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === '' 
                    ? 'bg-[#FF8C42] text-white' 
                    : 'hover:bg-[#FF8C42]/10'
                }`}
              >
                All Welding Gases
              </button>
              {WELDING_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category 
                      ? 'bg-[#FF8C42] text-white' 
                      : 'hover:bg-[#FF8C42]/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search welding gases..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 
                       border border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 