"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Info, ExternalLink } from 'lucide-react'
import { Product } from '@/types/product'
import Image from 'next/image'
import { CategoryDefaultImage, CategoryIcon, getCategoryColor } from './CategoryImages'

export default function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const mainCategory = product.categories[0]

  return (
    <Card 
      className={`relative overflow-hidden group border-l-4 ${
        mainCategory === 'MIG Welding Gas' ? 'border-l-orange-500' :
        mainCategory === 'TIG Welding Gas' ? 'border-l-blue-500' :
        mainCategory === 'Oxy Fuel Gas' ? 'border-l-gray-500' :
        mainCategory === 'Beer Gas' ? 'border-l-amber-500' :
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
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-[350] mb-2">{product.name}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {product.categories.map((category, index) => (
            <span 
              key={index}
              className={`text-sm px-2 py-1 rounded-full ${getCategoryColor(category)}`}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {product.specifications['Gas Type']} • {product.specifications['Cylinder Size']}
        </div>
      </div>

      {/* Hover Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-black/90 to-black/95 
                   flex flex-col justify-end p-6 transition-all duration-300 
                   ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="space-y-3">
          <Link href={`/products/${product.slug}`} className="block">
            <Button 
              variant="default" 
              className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90 flex items-center justify-center gap-2 py-6"
            >
              <Info className="w-4 h-4" />
              View Details
            </Button>
          </Link>
          <Link href="/stockists" className="block">
            <Button 
              variant="outline" 
              className="w-full border-[#FF8C42]/20 text-[#FF8C42] hover:bg-[#FF8C42]/10
                       flex items-center justify-center gap-2 py-6"
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