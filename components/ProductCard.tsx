"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Info, ExternalLink } from 'lucide-react'
import { Product } from '@/types/product'
import Image from 'next/image'
import { CategoryDefaultImage, CategoryIcon } from './CategoryImages'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const mainCategory = product.categories[0]

  return (
    <Card 
      className={`relative overflow-hidden group border-l-4 ${
        mainCategory === 'MIG Welding Gas' ? 'border-l-orange-500' :
        mainCategory === 'TIG Welding Gas' ? 'border-l-blue-500' :
        mainCategory === 'Oxy Fuel Gas' ? 'border-l-purple-500' :
        mainCategory === 'Trade - Beer & Cellar Gas' ? 'border-l-amber-500' :
        'border-l-gray-400'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Icon */}
      <div className="absolute top-4 right-4 z-10">
        <CategoryIcon category={mainCategory} />
      </div>

      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
        {imageError ? (
          <CategoryDefaultImage category={mainCategory} />
        ) : (
          <Image
            src={product.ImageURL}
            alt={product.Title}
            fill
            className="object-contain p-4"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-[500] text-gray-900 dark:text-white">
          {product.Title}
        </h3>

        {/* Specifications */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Gas Type:</span>
            <span className="font-medium text-[#FF8C42]">
              {product.specifications['Gas Type']}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Size:</span>
            <span className="font-medium">
              {product.specifications['Cylinder Size']}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {product.categories.map((category, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-[#1A1A1A] 
                       text-[#FF8C42] border border-[#FF8C42]/20"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-black/80 to-black/95 
                   flex flex-col justify-end p-6 transition-all duration-300 
                   ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="space-y-3">
          <Link href={`/products/${product.Slug}`} className="block">
            <Button 
              variant="default" 
              className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90 
                       flex items-center justify-center gap-2 py-6"
            >
              <Info className="w-4 h-4" />
              View Details
            </Button>
          </Link>
          <Link href="/stockists" className="block">
            <Button 
              variant="outline" 
              className="w-full border-[#FF8C42]/20 text-[#FF8C42] 
                       hover:bg-[#FF8C42]/10 flex items-center justify-center gap-2 py-6"
            >
              <ExternalLink className="w-4 h-4" />
              Find Stockist
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
} 