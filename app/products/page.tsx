import { getAllProducts } from '@/utils/products'
import ProductsList from '@/components/ProductsList'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Products</h1>
      <ProductsList initialProducts={products} />
    </div>
  )
} 