'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search, Filter, Flame, Zap, Cylinder, LucideIcon } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products, getCategories } from '@/lib/products'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ITEMS_PER_PAGE = 12

const categoryIcons: Record<string, LucideIcon> = {
  'MIG Welding Gas': Zap,
  'TIG Welding Gas': Flame,
  'Oxy Fuel Gas': Cylinder
} as const

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const categories = getCategories()

  // Filter products
  const filteredProducts = products.filter(product =>
    (product.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     product.Content.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!selectedCategory || product.categories.includes(selectedCategory))
  )

  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-[350] mb-2">Professional Welding Gas Solutions</h1>
        <p className="text-[#E5E5E5]/80 text-lg">
          High-quality welding gases for MIG, TIG, and Oxy-Fuel applications
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-72 flex-shrink-0 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF8C42]" />
            <Input 
              placeholder="Search welding gases..."
              className="pl-10 bg-[#1A1A1A] border-[#FF8C42]/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#FF8C42]/20">
            <h3 className="text-lg font-[350] mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Gas Categories
            </h3>
            
            <div className="space-y-4">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="w-full justify-start"
              >
                All Welding Gases
              </Button>

              <Accordion type="single" collapsible className="space-y-2">
                {categories.map((category) => {
                  const Icon = categoryIcons[category] || Cylinder
                  return (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger className="text-sm">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {category}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Button
                          variant={selectedCategory === category ? "default" : "outline"}
                          onClick={() => setSelectedCategory(category)}
                          className="w-full justify-start text-sm mt-2"
                        >
                          View All {category}
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#FF8C42]/20">
            <h3 className="text-lg font-[350] mb-4">Resources</h3>
            <div className="space-y-2">
              <Link href="/materials-guide">
                <Button variant="outline" className="w-full justify-start">
                  Welding Materials Guide
                </Button>
              </Link>
              <Link href="/gas-flow-chart">
                <Button variant="outline" className="w-full justify-start">
                  Gas Flow Settings
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="w-full justify-start">
                  About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.Slug} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: pageCount }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
                disabled={currentPage === pageCount}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 