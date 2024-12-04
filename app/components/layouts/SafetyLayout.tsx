'use client'

import type { SafetyTip } from '@/data/safety'

interface SafetyLayoutProps {
  tip: SafetyTip;
}

export default function SafetyLayout({ tip }: SafetyLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-[350] mb-6">{tip.title}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-[#E5E5E5]/80 mb-8">{tip.description}</p>
        
        {/* Procedures */}
        {tip.procedures?.map((procedure, index) => (
          <div key={index} className="mt-8">
            <h2 className="text-xl font-[350] mb-4">{procedure.title}</h2>
            <ul className="space-y-2">
              {procedure.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="text-[#E5E5E5]/60">{step}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Warnings */}
        {tip.warnings && tip.warnings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-[350] mb-4">Warnings</h2>
            <ul className="space-y-2">
              {tip.warnings.map((warning, index) => (
                <li key={index} className="text-[#E5E5E5]/60">{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Equipment */}
        {tip.equipment && tip.equipment.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-[350] mb-4">Required Equipment</h2>
            <ul className="space-y-2">
              {tip.equipment.map((item, index) => (
                <li key={index} className="text-[#E5E5E5]/60">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 