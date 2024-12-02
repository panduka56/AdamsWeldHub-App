'use client'

import dynamic from 'next/dynamic'

const QuickOrderForm = dynamic(
  () => import('@/components/QuickOrderForm'),
  { ssr: false }
)

export default function QuickOrderPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Quick Order</h1>
      <QuickOrderForm />
    </div>
  )
} 