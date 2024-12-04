import { getProductBySlug, getRelatedProducts } from '@/utils/products'
import ProductDetail from '@/components/ProductDetail'
import { notFound } from 'next/navigation'

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product)

  return (
    <div className="container mx-auto px-6 py-12">
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </div>
  )
} 