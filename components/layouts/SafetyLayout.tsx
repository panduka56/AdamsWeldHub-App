'use client'

import { type SafetyTip } from '@/utils/safety-data'

interface SafetyLayoutProps {
  tip: SafetyTip;
}

export default function SafetyLayout({ tip }: SafetyLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-6">{tip.title}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-[#E5E5E5]/80 mb-8">{tip.content}</p>
        
        {/* Procedures */}
        {tip.recommendations?.map((recommendation, index) => (
          <div key={index} className="mt-8">
            <h2 className="text-xl font-[350] mb-4">{recommendation}</h2>
          </div>
        ))}
      </div>
    </div>
  )
} 