import { Metadata } from 'next'
import { QuickOrderForm } from '@/components'

export const metadata: Metadata = {
  title: 'Quick Order | AdamsGas',
  description: 'Place orders quickly and easily'
}

export default function QuickOrderPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Quick Order</h1>
      <QuickOrderForm />
    </div>
  )
} 