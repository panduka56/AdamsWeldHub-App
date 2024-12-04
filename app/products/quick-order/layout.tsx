import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Order | AdamsGas',
  description: 'Place orders quickly and easily'
}

export default function QuickOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 