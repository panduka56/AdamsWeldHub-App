import { Metadata } from 'next'
import ProductsList from '@/components/ProductsList'
import { getProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Products | AdamsGas',
  description: 'Browse our complete range of welding gases and supplies'
}

export default async function ProductsPage() {
  const products = await getProducts()
  console.log('Products page loaded:', {
    total: products.length,
    sample: products[0]
  })
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-6">Our Products</h1>
      <ProductsList initialProducts={products} />
    </div>
  )
} 