import { notFound } from 'next/navigation'
import { parseCSVProducts } from '@/utils/parseProducts'
import ProductDetail from '../../../components/ProductDetail'
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const products = await parseCSVProducts()
  return products.map((product) => ({
    slug: product.Slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const products = await parseCSVProducts()
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
  const products = await parseCSVProducts()
  const product = products.find(p => p.Slug === params.slug)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter(p => 
      p.Slug !== params.slug && 
      p.ProductCategories.some(cat => 
        product.ProductCategories.includes(cat)
      )
    )
    .slice(0, 4)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
} 