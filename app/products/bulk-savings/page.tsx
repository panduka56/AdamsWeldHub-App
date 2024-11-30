import { Metadata } from 'next'
import { BulkSavingsCalculator } from '@/components'

export const metadata: Metadata = {
  title: 'Bulk Savings Calculator | AdamsGas',
  description: 'Calculate your savings on bulk gas orders'
}

export default function BulkSavingsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-8">Bulk Savings Calculator</h1>
      <BulkSavingsCalculator />
    </div>
  )
} 