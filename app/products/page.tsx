import { Metadata } from 'next'
import { getAllProducts } from '@/utils/products'
import ProductsList from '@/components/ProductsList'

export const metadata: Metadata = {
  title: 'Welding Gases & Supplies | AdamsGas',
  description: 'Professional welding gases including MIG, TIG, and Oxy-Fuel. Browse our selection of high-quality welding supplies.',
  openGraph: {
    title: 'Welding Gases & Supplies',
    description: 'Professional welding gases and supplies',
  }
}

export default async function ProductsPage() {
  const products = await getAllProducts()
  
  return <ProductsList initialProducts={products} />
} 