import Link from 'next/link'
import { AlertCircle, Phone, Globe } from 'lucide-react'
import { WeldingProcess, MaterialType } from '@/types/welding'
import type { GasRecommendation } from '@/app/data/welding-data/gas-recommendations'
import { safetyNotes } from '@/app/data/welding-data/safety-notes'

interface ResultsDisplayProps {
  process: WeldingProcess
  material: MaterialType
  thickness: number
  recommendation: GasRecommendation | null
  setCurrentStep: (step: number) => void
}

export default function ResultsDisplay({
  process,
  material,
  thickness,
  recommendation,
  setCurrentStep
}: ResultsDisplayProps) {
  const safetyInfo = safetyNotes.find(
    note => note.process === process && note.material === material
  )

  if (!recommendation) {
    return (
      <div className="bg-[#1A1A1A] rounded-xl p-8 border border-[#FF8C42]/20 flex flex-col items-center text-center">
        {/* Header */}
        <div className="flex items-center text-[#FF8C42] mb-8">
          <AlertCircle className="w-6 h-6 mr-2" />
          <h2 className="text-2xl font-[350]">No Results Found</h2>
        </div>
        
        {/* Selection Summary */}
        <div className="bg-[#222222] rounded-lg p-6 mb-8 w-full max-w-2xl">
          <h3 className="text-[#E5E5E5] font-[350] mb-4">Your Selection:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#E5E5E5]/60">
            <div className="flex flex-col items-center">
              <span className="text-[#FF8C42] mb-1">Process</span>
              <span>{process} Welding</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#FF8C42] mb-1">Material</span>
              <span>{material.replace('-', ' ')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#FF8C42] mb-1">Thickness</span>
              <span>{thickness}mm</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="max-w-xl mb-8">
          <p className="text-[#E5E5E5]/60 text-lg mb-4">
            We don&apos;t have a standard recommendation for this combination.
            Our experts can help find the perfect solution for your needs.
          </p>
          
          <div className="bg-[#222222] rounded-lg p-4 text-left">
            <ul className="list-disc list-inside space-y-2 text-[#E5E5E5]/60">
              <li>Get advice specific to your application</li>
              <li>Discuss custom gas mixtures</li>
              <li>Learn about alternative solutions</li>
              <li>Ensure optimal equipment setup</li>
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mb-8">
          <a 
            href="tel:+441215448960"
            className="flex items-center justify-center gap-3 p-6
                     bg-[#FF8C42] rounded-lg text-white
                     hover:bg-[#FF8C42]/90 transition-colors group"
          >
            <Phone className="w-5 h-5" />
            <span className="text-lg font-[350]">
              Call 0121 544 8960
            </span>
          </a>

          <a 
            href="https://www.adamsgas.co.uk/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-6
                     bg-[#222222] rounded-lg text-white
                     hover:bg-[#333333] transition-colors group
                     border border-[#FF8C42]/20"
          >
            <Globe className="w-5 h-5 text-[#FF8C42]" />
            <span className="text-lg font-[350]">Contact Online</span>
          </a>
        </div>

        {/* Alternative Actions */}
        <div className="text-[#E5E5E5]/60">
          <p>You can also:</p>
          <div className="flex gap-4 mt-2">
            <button 
              onClick={() => {
                // Reset to first step
                setCurrentStep(0)
                // Or use router if you prefer
                // router.push('/')
              }}
              className="text-[#FF8C42] hover:text-[#FF8C42]/80 transition-colors"
            >
              Try Different Settings
            </button>
            <span>or</span>
            <Link 
              href="/products?category=gas"
              className="text-[#FF8C42] hover:text-[#FF8C42]/80 transition-colors"
            >
              Browse All Gases
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Primary Recommendation */}
      <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#FF8C42]/20">
        <h2 className="text-2xl font-[350] text-[#FF8C42] mb-4">
          Recommended Gas Solution
        </h2>
        
        <div className="mb-6">
          <div className="text-xl text-[#E5E5E5] mb-2">
            {recommendation.primaryGas}
          </div>
          <p className="text-[#E5E5E5]/60">
            {recommendation.notes}
          </p>
        </div>

        {/* Application Notes */}
        {recommendation.applicationNotes && (
          <div className="mb-6">
            <h3 className="text-lg font-[350] text-[#E5E5E5] mb-2">
              Application Notes
            </h3>
            <p className="text-[#E5E5E5]/60">
              {recommendation.applicationNotes}
            </p>
          </div>
        )}

        {/* Safety Information */}
        {safetyInfo && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-[350] text-[#E5E5E5]">
              Safety Considerations
            </h3>
            
            {safetyInfo.notes.length > 0 && (
              <div>
                <h4 className="text-sm text-[#E5E5E5]/60 mb-2">Guidelines:</h4>
                <ul className="list-disc list-inside space-y-1 text-[#E5E5E5]">
                  {safetyInfo.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {safetyInfo.warnings.length > 0 && (
              <div>
                <h4 className="text-sm text-[#FF8C42] mb-2">Important Warnings:</h4>
                <ul className="list-disc list-inside space-y-1 text-[#E5E5E5]">
                  {safetyInfo.warnings.map((warning, i) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Alternative Gas Section */}
      {recommendation.alternativeGas && (
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#FF8C42]/20">
          <h3 className="text-lg font-[350] text-[#FF8C42] mb-2">
            Alternative Solution
          </h3>
          <p className="text-[#E5E5E5]">{recommendation.alternativeGas}</p>
          <p className="text-[#E5E5E5]/60 mt-2">
            Consider this alternative when:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-[#E5E5E5]/60">
            <li>Different penetration characteristics are needed</li>
            <li>Primary gas mixture is not available</li>
            <li>Specific finish requirements exist</li>
          </ul>
        </div>
      )}
    </div>
  )
}
