'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'

interface ProductsListProps {
  initialProducts: Product[];
}

const categories = ['MIG Welding Gas', 'TIG Welding Gas', 'Oxy Fuel Gas', 'Trade - Beer & Cellar Gas', 'Calor Gas']

export default function ProductsList({ initialProducts }: ProductsListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  console.log('ProductsList received products:', initialProducts.length)

  const filteredProducts = initialProducts.filter(product => {
    const matchesSearch = product.Title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.categories.some(cat => cat.includes(selectedCategory))
    
    console.log('Filtering product:', {
      title: product.Title,
      categories: product.categories,
      matchesSearch,
      matchesCategory
    })

    return matchesSearch && matchesCategory
  })

  console.log('Filtered products:', filteredProducts.length)

  if (!initialProducts?.length) {
    return (
      <div className="text-center py-12 text-[#E5E5E5]/60">
        No products available
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-[#FF8C42]/20 rounded-lg 
                     py-3 px-12 text-[#E5E5E5] placeholder-[#E5E5E5]/40"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF8C42]/60" />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#1A1A1A] border border-[#FF8C42]/20 rounded-lg px-4 text-[#E5E5E5]"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-[#E5E5E5]/60">
          No products found matching your criteria
        </div>
      )}
    </div>
  )
} 