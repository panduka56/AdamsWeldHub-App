import { Metadata } from 'next'
import { DiscountCalculator } from '@/components'

export const metadata: Metadata = {
  title: 'Discount Calculator | AdamsGas',
  description: 'Calculate bulk order discounts'
}

export default function DiscountsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Discount Calculator</h1>
      <DiscountCalculator />
    </div>
  )
} 