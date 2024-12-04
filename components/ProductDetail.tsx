'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Home, ChevronRight, Info, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { CategoryDefaultImage } from './CategoryImages'

interface ProductDetailProps {
  product: Product
  relatedProducts?: Product[]
}
export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [imageError, setImageError] = useState<boolean>(false)
  const [relatedImageErrors, setRelatedImageErrors] = useState<{[key: string]: boolean}>({})
  const mainCategory = product.categories[0]

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-[#E5E5E5]/60 mb-8">
        <Link href="/" className="hover:text-[#FF8C42] flex items-center">
          <Home className="w-4 h-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-[#FF8C42]">
          Products
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#FF8C42]">{mainCategory}</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-2 gap-12"
      >
        {/* Product Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1A1A1A] border border-[#FF8C42]/20">
          {imageError ? (
            <CategoryDefaultImage category={mainCategory} />
          ) : (
            <Image
              src={product.ImageURL}
              alt={product.Title}
              fill
              className="object-contain p-8"
              onError={() => setImageError(true)}
              priority
            />
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-[350] mb-2">{product.Title}</h1>
            <p className="text-[#E5E5E5]/60">{mainCategory}</p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
              <div className="text-sm text-[#E5E5E5]/60">Gas Mix</div>
              <div className="font-medium text-[#FF8C42]">{product.GasMixPercentage}</div>
            </div>
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
              <div className="text-sm text-[#E5E5E5]/60">Cylinder Size</div>
              <div className="font-medium">{product.specifications['Cylinder Size']}</div>
            </div>
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
              <div className="text-sm text-[#E5E5E5]/60">Pressure</div>
              <div className="font-medium">{product.PressureBar} Bar</div>
            </div>
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
              <div className="text-sm text-[#E5E5E5]/60">Categories</div>
              <div className="font-medium">{product.categories.join(', ')}</div>
            </div>
          </div>

          {/* Description */}
          <div className="prose dark:prose-invert">
            <p>{product.Content}</p>
          </div>

          {/* CTAs */}
          <div className="space-y-4">
            <Link 
              href={`https://adamsgas.co.uk/product/${product.Slug}/`}
              target="_blank"
              className="block"
            >
              <Button 
                className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90 h-14 text-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                View on Adams Gas
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/stockists">
              <Button 
                variant="outline" 
                className="w-full border-[#FF8C42]/20 text-[#FF8C42] hover:bg-[#FF8C42]/10 h-14"
              >
                Find a Stockist
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-[350] mb-8">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Link 
                key={relatedProduct.ID} 
                href={`/products/${relatedProduct.Slug}`}
                className="block group"
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative aspect-square rounded-lg overflow-hidden bg-[#1A1A1A] mb-4 
                           border border-[#FF8C42]/20"
                >
                  {relatedImageErrors[relatedProduct.ID] ? (
                    <CategoryDefaultImage category={relatedProduct.categories[0]} />
                  ) : (
                    <Image
                      src={relatedProduct.ImageURL}
                      alt={relatedProduct.Title}
                      fill
                      className="object-contain p-4"
                      onError={() => setRelatedImageErrors(prev => ({
                        ...prev,
                        [relatedProduct.ID]: true
                      }))}
                    />
                  )}
                </motion.div>
                <h3 className="font-medium group-hover:text-[#FF8C42] transition-colors">
                  {relatedProduct.Title}
                </h3>
                <div className="text-sm text-[#E5E5E5]/60">
                  {relatedProduct.specifications['Gas Type']}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 