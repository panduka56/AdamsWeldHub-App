import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/products'
import ProductDetail from '@/components/ProductDetail'
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

// Generate static params for all product slugs
export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.Slug,
  }))
}

// Add metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const products = await getProducts()
  const product = products.find(p => p.Slug === params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found | AdamsGas',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: `${product.Title} | AdamsGas`,
    description: product.Content
  }
}

export default async function ProductPage({ params }: Props) {
  const products = await getProducts()
  const product = products.find(p => p.Slug === params.slug)
  
  if (!product) {
    notFound()
  }

  // Get related products (same category)
  const relatedProducts = products
    .filter(p => 
      p.Slug !== params.slug && 
      p.ProductCategories === product.ProductCategories
    )
    .slice(0, 4)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
} 