import { notFound } from 'next/navigation'
import { parseCSVProducts } from '../../../utils/parseProducts'
import ProductDetail from '../../../components/ProductDetail'

interface Props {
  params: { slug: string }
}

export default async function ProductPage({ params }: Props) {
  const products = parseCSVProducts()
  const product = products.find(p => p.Slug === params.slug)
  
  if (!product) {
    notFound()
  }

  // Get related products (same category)
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