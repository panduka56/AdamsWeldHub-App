'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProcessSelection from './ProcessSelection'
import MaterialSelection from './MaterialSelection'
import ThicknessInput from './ThicknessInput'
import ResultsDisplay from './ResultsDisplay'
import AvailableCylinders from './AvailableCylinders'
import { Product } from '@/types/product'
import { Wrench, Beaker, Ruler, CheckCircle } from 'lucide-react'

const steps = [
  { id: 'process', label: 'Process', icon: Wrench },
  { id: 'material', label: 'Material', icon: Beaker },
  { id: 'thickness', label: 'Thickness', icon: Ruler },
  { id: 'results', label: 'Results', icon: CheckCircle }
]

const processOptions = [
  { id: 'MIG', name: 'MIG Welding', description: 'Metal Inert Gas Welding' },
  { id: 'TIG', name: 'TIG Welding', description: 'Tungsten Inert Gas Welding' },
  { id: 'Flux-Cored', name: 'Flux-Cored', description: 'Flux-Cored Arc Welding' },
  { id: 'Oxy-Fuel', name: 'Oxy-Fuel', description: 'Oxy-Fuel Welding' }
]

const materialOptions = [
  { id: 'Mild-Steel', name: 'Mild Steel', description: 'Low Carbon Steel' },
  { id: 'Stainless-Steel', name: 'Stainless Steel', description: '300 Series Stainless' },
  { id: 'Aluminum', name: 'Aluminum', description: '6000 Series Aluminum' },
  { id: 'Copper', name: 'Copper', description: 'Pure Copper & Alloys' },
  { id: 'Cast-Iron', name: 'Cast Iron', description: 'Gray & Ductile Cast Iron' },
  { id: 'Nickel-Alloys', name: 'Nickel Alloys', description: 'Inconel, Monel, etc.' },
  { id: 'Titanium', name: 'Titanium', description: 'Pure Titanium & Alloys' }
]

interface GasMixOption {
  thicknessRange: string;
  gases: string[];
}

interface MaterialGasMixes {
  [key: string]: GasMixOption[];
}

interface ProcessGasMixes {
  [key: string]: MaterialGasMixes;
}

const gasMixOptions: ProcessGasMixes = {
  'MIG': {
    'Aluminum': [
      {
        thicknessRange: '<6',
        gases: ['100% Argon'],
      },
      {
        thicknessRange: '≥6',
        gases: ['75% Helium / 25% Argon', '50% Argon / 50% Helium'],
      },
    ],
    'Mild-Steel': [
      {
        thicknessRange: '<6',
        gases: ['75% Argon / 25% CO₂', '90% Argon / 10% CO₂'],
      },
      {
        thicknessRange: '≥6',
        gases: ['100% CO₂', '75% Argon / 25% CO₂'],
      },
    ],
    'Stainless-Steel': [
      {
        thicknessRange: 'All',
        gases: ['98% Argon / 2% CO₂', '90% Helium / 7.5% Argon / 2.5% CO₂'],
      },
    ],
    'Copper': [
      {
        thicknessRange: '<6',
        gases: ['100% Argon'],
      },
      {
        thicknessRange: '≥6',
        gases: ['75% Helium / 25% Argon', '50% Argon / 50% Helium'],
      },
    ],
  },
  'TIG': {
    'Mild-Steel': [
      {
        thicknessRange: '<6',
        gases: ['100% Argon'],
      },
      {
        thicknessRange: '≥6',
        gases: ['75% Argon / 25% Helium'],
      },
    ],
    'Stainless-Steel': [
      {
        thicknessRange: '<6',
        gases: ['100% Argon'],
      },
      {
        thicknessRange: '≥6',
        gases: ['100% Argon', '97% Argon / 3% Hydrogen'],
      },
    ],
    'Aluminum': [
      {
        thicknessRange: '<6',
        gases: ['100% Argon'],
      },
      {
        thicknessRange: '≥6',
        gases: ['70% Argon / 30% Helium'],
      },
    ],
    'Copper': [
      {
        thicknessRange: '<6',
        gases: ['100% Argon'],
      },
      {
        thicknessRange: '≥6',
        gases: ['50% Argon / 50% Helium'],
      },
    ],
    // Additional materials...
  },
  'Flux-Cored': {
    'Mild-Steel': [
      {
        thicknessRange: 'All',
        gases: ['100% CO₂', '75% Argon / 25% CO₂'],
      },
    ],
    'Stainless-Steel': [
      {
        thicknessRange: 'All',
        gases: ['98% Argon / 2% CO₂'],
      },
    ],
    // Additional materials...
  },
  'Oxy-Fuel': {
    'Mild-Steel': [
      {
        thicknessRange: 'All',
        gases: ['Oxygen and Acetylene'],
      },
    ],
    'Cast-Iron': [
      {
        thicknessRange: 'All',
        gases: ['Oxygen and Acetylene'],
      },
    ],
    // Additional materials...
  },
}

function calculateRecommendations(
  process: string,
  material: string,
  thickness: number,
): string[] {
  const options = gasMixOptions[process]?.[material]
  if (!options) return []

  const thicknessOption = options.find((option) => {
    if (option.thicknessRange === 'All') return true
    const value = parseFloat(option.thicknessRange.substring(1))
    return option.thicknessRange.startsWith('<') 
      ? thickness < value 
      : thickness >= value
  })

  if (!thicknessOption) return []
  return thicknessOption.gases
}

export default function WeldingGasCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedProcess, setSelectedProcess] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [thickness, setThickness] = useState(0)
  const [recommendedGases, setRecommendedGases] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchProducts()
  }, [])

  const nextStep = () => {
    if (currentStep === steps.length - 1) return
    if (currentStep === steps.length - 2) {
      const gases = calculateRecommendations(
        selectedProcess,
        selectedMaterial,
        thickness,
      )
      setRecommendedGases(gases)
    }
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleCalculate = () => {
    const gases = calculateRecommendations(
      selectedProcess,
      selectedMaterial,
      thickness,
    )
    setRecommendedGases(gases)
    nextStep()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProcessSelection options={processOptions} onSelect={setSelectedProcess} selected={selectedProcess} />
      case 1:
        return <MaterialSelection options={materialOptions} onSelect={setSelectedMaterial} selected={selectedMaterial} />
      case 2:
        return <ThicknessInput onChange={setThickness} value={thickness} />
      case 3:
        return <ResultsDisplay
          process={selectedProcess}
          material={selectedMaterial}
          thickness={thickness}
          recommendedGases={recommendedGases}
        />
      default:
        return null
    }
  }

  return (
    <div className="space-y-12">
      <div 
        className={`grid transition-all duration-300 ${
          currentStep === 3 
            ? 'md:grid-cols-2 gap-8' 
            : 'grid-cols-1 max-w-3xl mx-auto'
        }`}
      >
        {/* Calculator Column */}
        <motion.div
          layout
          className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 
                    dark:border-[#FF8C42]/20 p-8 shadow-lg"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <motion.button
                  onClick={() => setCurrentStep(index)}
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    transition-all duration-200 border-2
                    ${index <= currentStep 
                      ? 'bg-[#FF8C42]/10 border-[#FF8C42] text-[#FF8C42] dark:bg-[#FF8C42]/10 dark:border-[#FF8C42] dark:text-[#FF8C42]' 
                      : 'bg-gray-200 border-gray-300 text-gray-500 dark:bg-[#222222]/80 dark:border-[#333333] dark:text-[#888888] hover:bg-gray-100 dark:hover:bg-[#222222]'
                    }
                  `}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`
                    absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs transition-colors duration-200 font-medium
                    ${index === currentStep 
                      ? 'text-[#FF8C42] dark:text-[#FF8C42]' 
                      : 'text-gray-600 group-hover:text-gray-800 dark:text-[#888888] dark:group-hover:text-[#E5E5E5]'
                    }
                  `}>
                    {step.label}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="mt-12">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-[#FF8C42]/20">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 rounded-lg border transition-colors
                       border-[#FF8C42]/20 text-[#FF8C42] hover:bg-[#FF8C42]/10 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              Previous
            </button>
            <button
              onClick={currentStep === steps.length - 2 ? handleCalculate : nextStep}
              disabled={currentStep === steps.length - 1}
              className="px-6 py-2 rounded-lg transition-colors
                       bg-[#FF8C42] text-white hover:bg-[#FF8C42]/90 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === steps.length - 2 ? 'Calculate' : 'Next'}
            </button>
          </div>
        </motion.div>

        {/* Available Cylinders Column */}
        <AnimatePresence>
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <AvailableCylinders
                recommendedGas={recommendedGases[0]}
                process={selectedProcess}
                products={products}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
