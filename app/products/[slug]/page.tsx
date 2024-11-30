'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, FileText, Gauge, Info, Settings, Boxes, Target } from 'lucide-react'
import { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard'

interface ProductPageProps {
  params: { slug: string }
}

async function getProductData(slug: string): Promise<{
  product: Product | null;
  relatedProducts: Product[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)
  if (!res.ok) {
    return { product: null, relatedProducts: [] }
  }
  return res.json()
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, relatedProducts } = await getProductData(params.slug)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link href="/products" className="inline-flex items-center text-[#FF8C42] hover:text-[#FF8C42]/80">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        <div className="flex gap-4">
          <Link href="/materials-guide">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Materials Guide
            </Button>
          </Link>
          <Link href="/gas-flow-chart">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Flow Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 mb-12">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.imageUrl.startsWith('http') ? product.imageUrl : '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-contain p-4"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e: any) => {
              e.target.src = '/images/placeholder.jpg'
            }}
          />
        </div>

        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl font-[350] mb-4">{product.name}</h1>
          
          {/* Quick Facts */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Gas Type</div>
              <div className="font-medium">{product.specifications['Gas Type']}</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Cylinder Size</div>
              <div className="font-medium">{product.specifications['Cylinder Size']}</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Deposit</div>
              <div className="font-medium">{product.specifications['Refundable Deposit']}</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Output</div>
              <div className="font-medium">{product.specifications['Output'] || 'N/A'}</div>
            </div>
          </div>

          {/* Action Button */}
          <Link href="/stockists">
            <Button className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90">
              Find a Stockist
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="mt-12">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="specifications" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Specifications
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Boxes className="w-4 h-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Applications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{product.description}</p>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              value && (
                <div key={key} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{key}</div>
                  <div className="font-medium">{value}</div>
                </div>
              )
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FF8C42] mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{product.usesAndApplications}</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-[350] mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 