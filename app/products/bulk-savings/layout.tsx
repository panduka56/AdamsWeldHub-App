import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bulk Savings Calculator | AdamsGas',
  description: 'Calculate your savings on bulk gas orders'
}

export default function BulkSavingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 