import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Thermometer } from 'lucide-react'
import { materialsData } from '@/lib/materials-data'

interface MaterialPageProps {
  params: {
    material: string
  }
}

export default function MaterialPage({ params }: MaterialPageProps) {
  const material = materialsData.find(m => m.id === params.material)
  
  if (!material) {
    notFound()
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Weld ${material.name}`,
    description: material.overview,
    step: material.weldingRecommendations.tips.map((tip, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: tip
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="container mx-auto px-6 py-12">
        <div className="flex space-x-4 mb-8">
          <Link 
            href="/materials-guide" 
            className="inline-flex items-center text-[#FF8C42]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Materials Guide
          </Link>
        </div>

        <div className="space-y-12">
          <div className="bg-[#222222]/80 rounded-xl p-8">
            <h1 className="text-3xl font-[350] mb-6">{material.name}</h1>
            <p className="text-[#E5E5E5]/80 mb-8">{material.overview}</p>

            {/* Properties */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="p-4 bg-[#1A1A1A] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-[#FF8C42]" />
                  <span className="text-[#E5E5E5]/60">Melting Point</span>
                </div>
                <div className="text-lg font-[350]">{material.properties.meltingPoint}</div>
              </div>
              {/* Add other properties */}
            </div>

            {/* Welding Recommendations */}
            <div className="mb-8">
              <h2 className="text-2xl font-[350] mb-4">Welding Recommendations</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
                  <h3 className="text-lg font-[350] mb-3">Process</h3>
                  <p className="text-[#E5E5E5]/80">{material.weldingRecommendations.process}</p>
                </div>
                <div className="p-6 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
                  <h3 className="text-lg font-[350] mb-3">Shielding Gas</h3>
                  <p className="text-[#E5E5E5]/80">{material.weldingRecommendations.shieldingGas}</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div>
              <h2 className="text-2xl font-[350] mb-4">Tips & Considerations</h2>
              <ul className="space-y-3">
                {material.weldingRecommendations.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF8C42] mt-2" />
                    <span className="text-[#E5E5E5]/80">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams() {
  return materialsData.map((material) => ({
    material: material.id,
  }))
} 