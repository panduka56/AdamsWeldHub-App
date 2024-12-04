'use client'

import dynamic from 'next/dynamic'

const DiscountCalculator = dynamic(
  () => import('@/components/DiscountCalculator'),
  { ssr: false }
)

export default function DiscountsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Discount Calculator</h1>
      <DiscountCalculator />
    </div>
  )
} 