'use client'

import { useState } from 'react'
import { ArrowLeft, Cylinder, Info, FileText, Shield, Gauge } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Product } from '@/lib/types'
import { products } from '@/lib/products'

function parseProductContent(content: string) {
  const details = {
    gasType: content.match(/Gas Type: ([^\n]+)/)?.[1]?.trim(),
    cylinderSize: content.match(/Cylinder Size: ([^\n]+)/)?.[1]?.trim(),
    pressure: content.match(/Pressure: ([^\n]+)/)?.[1]?.trim(),
    gasVolume: content.match(/Gas Volume: ([^\n]+)/)?.[1]?.trim(),
    dimensions: content.match(/Cylinder Dimensions: ([^\n]+)/)?.[1]?.trim(),
    compatibility: content.match(/Compatibility: ([^\n]+)/)?.[1]?.trim(),
  }

  // Extract features (sentences that describe capabilities/benefits)
  const features = content
    .split('\n')
    .filter(line => 
      line.includes(':') && 
      !Object.keys(details).some(key => line.startsWith(key))
    )
    .map(line => line.split(': ')[1]?.trim())
    .filter(Boolean)

  // Extract applications (typically listed after "Applications:" or similar headers)
  const applications = content
    .split('\n')
    .filter(line => 
      !line.includes(':') && 
      line.trim().length > 0 && 
      !line.startsWith('•') &&
      !line.startsWith('‣')
    )
    .map(line => line.trim())
    .filter(Boolean)

  return { details, features, applications }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product] = useState<Product | null>(() => {
    const foundProduct = products.find((p: Product) => p.Slug === params.slug)
    if (foundProduct) {
      const parsed = parseProductContent(foundProduct.Content)
      return {
        ...foundProduct,
        details: parsed.details,
        features: parsed.features,
        applications: parsed.applications
      }
    }
    return null
  })

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-[350] mb-4">Product not found</h1>
          <Link href="/products">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    )
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Product Image - 5 columns */}
        <div className="lg:col-span-5">
          <div className="aspect-square bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] 
                        rounded-xl border border-[#FF8C42]/20 p-8
                        flex items-center justify-center relative">
            {product['Image URL'].split('|')[0] ? (
              <img 
                src={product['Image URL'].split('|')[0]}
                alt={product.Title}
                className="object-contain w-full h-full"
              />
            ) : (
              <Cylinder className="w-48 h-48 text-[#FF8C42]/50" />
            )}
            {product.details?.gasType && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 p-3 rounded-lg
                            text-[#FF8C42] text-center font-medium">
                {product.details.gasType}
              </div>
            )}
          </div>
        </div>

        {/* Product Details - 7 columns */}
        <div className="lg:col-span-7 space-y-8">
          {/* Title and Categories */}
          <div>
            <h1 className="text-3xl font-[350] mb-4">{product.Title}</h1>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category, i) => (
                <span key={i} className="text-sm px-3 py-1 rounded-full bg-[#FF8C42]/10 
                                     text-[#FF8C42] border border-[#FF8C42]/20">
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(product.details || {}).map(([key, value]) => 
              value ? (
                <div key={key} className="p-4 rounded-lg bg-[#1A1A1A] border border-[#FF8C42]/20">
                  <span className="text-sm text-[#E5E5E5]/60">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </span>
                  <p className="text-lg">{value}</p>
                </div>
              ) : null
            )}
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                Safety Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <div className="grid gap-4">
                {product.features?.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[#1A1A1A]">
                    <div className="w-2 h-2 rounded-full bg-[#FF8C42] mt-2" />
                    <p className="text-[#E5E5E5]/80">{feature}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="mt-6">
              <div className="grid gap-4">
                {product.applications?.map((app, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[#1A1A1A]">
                    <div className="w-2 h-2 rounded-full bg-[#FF8C42] mt-2" />
                    <p className="text-[#E5E5E5]/80">{app}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="safety" className="mt-6">
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: product.Content.split('Safety Information:')[1]?.split('</div>')[0] || 
                         'Safety information not available.' 
                }} />
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <a 
              href={`https://adamsgas.co.uk/product/${product.Slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90 text-lg py-6">
                Buy Now
              </Button>
            </a>
            <Link href="/stockists" className="flex-1">
              <Button 
                variant="outline"
                className="w-full border-[#FF8C42]/20 text-[#FF8C42] 
                         hover:bg-[#FF8C42]/10 text-lg py-6"
              >
                Find Stockist
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 