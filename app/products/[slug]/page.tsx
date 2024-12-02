/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from 'next'
import { generateProductSchema } from '@/utils/schema'
import ProductDetail from '@/components/ProductDetail'
import type { Product } from '@/types/product'
import { parseCSVProducts } from '@/utils/parseProducts'
import { redirect, notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const dynamicParams = false

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Handle invalid URLs
  if (params.slug.startsWith('https://') || params.slug.includes('.jpg') || params.slug.includes('.png')) {
    return {
      title: 'Products | AdamsGas',
      description: 'Browse our product catalog'
    }
  }

  const products = parseCSVProducts()
  const product = products.find(p => p.slug === params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found | AdamsGas',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: `${product.name} | AdamsGas`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : []
    }
  }
}

export async function generateStaticParams() {
  const products = parseCSVProducts()
  return products
    .filter(product => 
      product.slug && 
      !product.slug.startsWith('https://') && 
      !product.slug.includes('.jpg') && 
      !product.slug.includes('.png')
    )
    .map((product) => ({
      slug: product.slug,
    }))
}

export default function ProductPage({ params }: Props) {
  // Handle invalid URLs
  if (params.slug.startsWith('https://') || params.slug.includes('.jpg') || params.slug.includes('.png')) {
    redirect('/products')
  }

  const products = parseCSVProducts()
  const product = products.find(p => p.slug === params.slug)
  
  if (!product) {
    notFound()
  }

  // Get related products (same category)
  const relatedProducts = products
    .filter(p => 
      p.slug !== params.slug && 
      p.categories?.some(cat => product.categories?.includes(cat))
    )
    .slice(0, 4)

  const productSchema = generateProductSchema(product)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  )
} 