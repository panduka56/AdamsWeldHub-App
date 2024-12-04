import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Discount Calculator | AdamsGas',
  description: 'Calculate your discounts'
}

export default function DiscountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 