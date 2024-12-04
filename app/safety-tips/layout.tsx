import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welding Safety Tips | AdamsGas',
  description: 'Comprehensive welding safety guidelines covering PPE, gas handling, workspace safety, and emergency procedures.',
  keywords: ['welding safety', 'PPE', 'gas safety', 'workspace safety', 'emergency procedures', 'welding hazards'],
}

export default function SafetyTipsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 