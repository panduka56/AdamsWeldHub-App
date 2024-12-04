'use client'

import { Material } from '@/lib/types'
import Link from 'next/link'

interface MaterialCardProps {
  material: Material
}

export default function MaterialCard({ material }: MaterialCardProps) {
  return (
    <Link href={`/materials-guide/${material.id}`}>
      <div className="p-6 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20 
                    hover:border-[#FF8C42]/40 transition-colors">
        <h2 className="text-xl font-[350] text-[#FF8C42] mb-3">{material.name}</h2>
        <p className="text-[#E5E5E5] mb-4">{material.overview}</p>
        
        <div className="space-y-2 text-sm text-[#E5E5E5]/80">
          <div>
            <span className="text-[#FF8C42]/80">Density:</span> {material.properties.density}
          </div>
          <div>
            <span className="text-[#FF8C42]/80">Weldability:</span> {material.properties.weldability}
          </div>
        </div>
      </div>
    </Link>
  )
} 