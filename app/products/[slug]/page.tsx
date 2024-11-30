import { Metadata } from 'next'
import { getAllProducts } from '@/utils/products'
import { generateProductSchema } from '@/utils/schema'
import ProductDetail from '@/components/ProductDetail'
import { Product } from '@/types/product'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await getProductData(params.slug)
  
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
      images: [{ url: product.imageUrl }]
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { product, relatedProducts } = await getProductData(params.slug)
  
  if (!product) {
    return <div>Product not found</div>
  }

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

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
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