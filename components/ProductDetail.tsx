'use client'

import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface ProductDetailProps {
  product: Product
  relatedProducts?: Product[]
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1A1A1A]">
        {product['Image URL'] && (
          <Image
            src={product['Image URL']}
            alt={product.Title}
            fill
            className="object-contain"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <h1 className="text-3xl font-[350]">{product.Title}</h1>
        
        <div className="prose dark:prose-invert">
          {product.Content}
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4">
          {product.VolumeLiters && (
            <div className="p-4 bg-[#1A1A1A] rounded-lg">
              <div className="text-sm text-[#E5E5E5]/60">Volume</div>
              <div className="font-medium">{product.VolumeLiters}L</div>
            </div>
          )}
          {product.PressureBar && (
            <div className="p-4 bg-[#1A1A1A] rounded-lg">
              <div className="text-sm text-[#E5E5E5]/60">Pressure</div>
              <div className="font-medium">{product.PressureBar} Bar</div>
            </div>
          )}
        </div>

        <Link href="/stockists">
          <Button className="w-full">Find a Stockist</Button>
        </Link>
      </div>
    </div>
  )
} 