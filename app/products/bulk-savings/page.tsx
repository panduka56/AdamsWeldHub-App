'use client'

import dynamic from 'next/dynamic'

const BulkSavingsCalculator = dynamic(
  () => import('@/components/BulkSavingsCalculator'),
  { ssr: false }
)

export default function BulkSavingsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Bulk Savings Calculator</h1>
      <BulkSavingsCalculator />
    </div>
  )
} 