'use client'

import type { SafetyTip } from '@/data/safety'

interface SafetyLayoutProps {
  tip: SafetyTip;
}

export default function SafetyLayout({ tip }: SafetyLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-4">{tip.title}</h1>
      <p className="text-[#E5E5E5]/80 mb-8">{tip.description}</p>
      
      {/* Add more content using the tip data */}
    </div>
  )
} 