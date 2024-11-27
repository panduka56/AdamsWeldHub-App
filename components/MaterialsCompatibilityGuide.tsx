"use client"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronRight, Info, Thermometer, Zap, Flame } from 'lucide-react'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

interface Material {
  id: string;
  name: string;
  description: string;
  compatibleGases: string[];
  properties: {
    meltingPoint: string;
    thermalConductivity: string;
    strength: string;
  };
  applications: string[];
  considerations: string[];
}

const materials: Material[] = [
  {
    id: 'mild-steel',
    name: 'Mild Steel',
    description: 'Low carbon steel commonly used in general fabrication and construction.',
    compatibleGases: [
      '75% Argon / 25% CO₂',
      '100% CO₂',
      '90% Argon / 10% CO₂'
    ],
    properties: {
      meltingPoint: '1425-1540°C',
      thermalConductivity: '50 W/mK',
      strength: '250-500 MPa'
    },
    applications: [
      'Structural fabrication',
      'General manufacturing',
      'Automotive components',
      'Construction'
    ],
    considerations: [
      'Prone to oxidation',
      'Good weldability',
      'Cost-effective'
    ]
  },
  {
    id: 'stainless-steel',
    name: 'Stainless Steel',
    description: 'Corrosion-resistant alloy with high chromium content.',
    compatibleGases: [
      '98% Argon / 2% CO₂',
      '98% Argon / 2% Oxygen',
      'Tri-Mix (90% He, 7.5% Ar, 2.5% CO₂)'
    ],
    properties: {
      meltingPoint: '1400-1450°C',
      thermalConductivity: '16 W/mK',
      strength: '500-850 MPa'
    },
    applications: [
      'Food processing equipment',
      'Chemical tanks',
      'Medical devices',
      'Marine applications'
    ],
    considerations: [
      'Higher cost than mild steel',
      'Requires proper gas coverage',
      'Heat input control critical'
    ]
  },
  // Add more materials...
]

export default function MaterialsCompatibilityGuide() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

  const filteredMaterials = useMemo(() => {
    return materials.filter(material =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-xl 
                     bg-white/5 border border-[#FF8C42]/20
                     text-[#E5E5E5] placeholder-[#E5E5E5]/40
                     focus:outline-none focus:border-[#FF8C42]/50
                     transition-colors"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E5E5E5]/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Materials List */}
        <div className="md:col-span-1 space-y-4">
          {filteredMaterials.map((material) => (
            <motion.button
              key={material.id}
              onClick={() => setSelectedMaterial(material)}
              className={`w-full p-4 rounded-xl border transition-all duration-200 text-left
                ${selectedMaterial?.id === material.id
                  ? 'bg-[#FF8C42]/10 border-[#FF8C42] text-white'
                  : 'bg-[#222222]/80 border-[#FF8C42]/10 text-[#E5E5E5]/80 hover:bg-[#FF8C42]/5'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{material.name}</span>
                <ChevronRight className="w-5 h-5 text-[#FF8C42]" />
              </div>
              <p className="text-sm text-[#E5E5E5]/60 mt-1">{material.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Material Details */}
        {selectedMaterial ? (
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#222222]/80 rounded-xl border border-[#FF8C42]/10 p-6">
              <h2 className={`${outfit.className} text-2xl font-[350] text-white mb-4`}>
                {selectedMaterial.name}
              </h2>
              
              {/* Properties */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/10">
                  <div className="flex items-center text-[#FF8C42] mb-2">
                    <Thermometer className="w-5 h-5 mr-2" />
                    <span className="text-sm">Melting Point</span>
                  </div>
                  <div className="text-white font-medium">
                    {selectedMaterial.properties.meltingPoint}
                  </div>
                </div>
                <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/10">
                  <div className="flex items-center text-[#FF8C42] mb-2">
                    <Zap className="w-5 h-5 mr-2" />
                    <span className="text-sm">Conductivity</span>
                  </div>
                  <div className="text-white font-medium">
                    {selectedMaterial.properties.thermalConductivity}
                  </div>
                </div>
                <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/10">
                  <div className="flex items-center text-[#FF8C42] mb-2">
                    <Flame className="w-5 h-5 mr-2" />
                    <span className="text-sm">Strength</span>
                  </div>
                  <div className="text-white font-medium">
                    {selectedMaterial.properties.strength}
                  </div>
                </div>
              </div>

              {/* Compatible Gases */}
              <div className="mb-6">
                <h3 className="text-[#FF8C42] text-lg mb-3">Compatible Gases</h3>
                <div className="space-y-2">
                  {selectedMaterial.compatibleGases.map((gas, index) => (
                    <div
                      key={index}
                      className="p-3 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/10
                               text-white"
                    >
                      {gas}
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications & Considerations */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[#FF8C42] text-lg mb-3">Applications</h3>
                  <ul className="list-disc list-inside text-[#E5E5E5]/80 space-y-2">
                    {selectedMaterial.applications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#FF8C42] text-lg mb-3">Considerations</h3>
                  <ul className="list-disc list-inside text-[#E5E5E5]/80 space-y-2">
                    {selectedMaterial.considerations.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:col-span-2 flex items-center justify-center h-full">
            <div className="text-center text-[#E5E5E5]/60">
              <Info className="w-12 h-12 mx-auto mb-4" />
              <p>Select a material to view detailed information</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

