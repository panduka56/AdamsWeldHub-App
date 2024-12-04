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
import { getGasRecommendation } from '@/lib/welding-utils'
import type { WeldingProcess, MaterialType } from '@/types/welding'
import type { GasRecommendation } from '@/app/data/welding-data/gas-recommendations'

const steps = [
  { id: 'process', label: 'Process', icon: Wrench },
  { id: 'material', label: 'Material', icon: Beaker },
  { id: 'thickness', label: 'Thickness', icon: Ruler },
  { id: 'results', label: 'Results', icon: CheckCircle }
]

const processOptions: Array<{
  id: WeldingProcess
  name: string
  description: string
}> = [
  { id: 'MIG', name: 'MIG Welding', description: 'Metal Inert Gas Welding' },
  { id: 'TIG', name: 'TIG Welding', description: 'Tungsten Inert Gas Welding' },
  { id: 'Flux-Cored', name: 'Flux-Cored', description: 'Flux-Cored Arc Welding' },
  { id: 'Oxy-Fuel', name: 'Oxy-Fuel', description: 'Oxy-Fuel Welding' }
]

const materialOptions: Array<{
  id: MaterialType
  name: string
  description: string
}> = [
  { id: 'Mild-Steel', name: 'Mild Steel', description: 'Low Carbon Steel' },
  { id: 'Stainless-Steel', name: 'Stainless Steel', description: '300 Series Stainless' },
  { id: 'Aluminum', name: 'Aluminum', description: '6000 Series Aluminum' },
  { id: 'Copper', name: 'Copper', description: 'Pure Copper & Alloys' },
  { id: 'Cast-Iron', name: 'Cast Iron', description: 'Gray & Ductile Cast Iron' },
  { id: 'Nickel-Alloys', name: 'Nickel Alloys', description: 'Inconel, Monel, etc.' },
  { id: 'Titanium', name: 'Titanium', description: 'Pure Titanium & Alloys' }
]

export default function WeldingGasCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedProcess, setSelectedProcess] = useState<WeldingProcess>('MIG')
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('Mild-Steel')
  const [thickness, setThickness] = useState(0)
  const [recommendation, setRecommendation] = useState<GasRecommendation | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        const transformedProducts = data.map((rawProduct: Product) => ({
          ...rawProduct,
          ProductCategories: Array.isArray(rawProduct.ProductCategories) 
            ? rawProduct.ProductCategories 
            : typeof rawProduct.ProductCategories === 'string'
              ? (rawProduct.ProductCategories as string).split('|')
              : []
        } as Product))
        setProducts(transformedProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchProducts()
  }, [])

  const nextStep = () => {
    if (currentStep === steps.length - 1) return
    
    if (currentStep === 2) {
      // Don't auto-advance on step 3 (thickness)
      // Let the Calculate button handle it
      return
    }
    
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleCalculate = () => {
    const result = getGasRecommendation(
      selectedProcess,
      selectedMaterial,
      thickness
    )
    setRecommendation(result)
    setCurrentStep(3) // Always advance to results, even if no recommendation
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={step.id}
              className={`flex items-center ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2
                  ${
                    currentStep >= index
                      ? 'border-[#FF8C42] text-[#FF8C42]'
                      : 'border-[#FF8C42]/20 text-[#E5E5E5]/40'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-[2px] mx-2
                    ${
                      currentStep > index
                        ? 'bg-[#FF8C42]'
                        : 'bg-[#FF8C42]/20'
                    }
                  `}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 0 && (
            <ProcessSelection
              options={processOptions}
              onSelect={setSelectedProcess}
              selected={selectedProcess}
            />
          )}

          {currentStep === 1 && (
            <MaterialSelection
              options={materialOptions}
              onSelect={setSelectedMaterial}
              selected={selectedMaterial}
            />
          )}

          {currentStep === 2 && (
            <ThicknessInput
              value={thickness}
              onChange={setThickness}
              onCalculate={handleCalculate}
            />
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Information */}
              <div className="space-y-6">
                <ResultsDisplay
                  process={selectedProcess}
                  material={selectedMaterial}
                  thickness={thickness}
                  recommendation={recommendation}
                  setCurrentStep={setCurrentStep}
                />
              </div>

              {/* Right Column - Products */}
              {recommendation && (
                <div>
                  <AvailableCylinders
                    process={selectedProcess}
                    thickness={thickness}
                    recommendation={recommendation}
                    products={products}
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="px-6 py-2 rounded-lg bg-[#222222] text-[#E5E5E5]/60 
                     hover:bg-[#FF8C42]/10 hover:text-[#FF8C42] transition-colors"
          >
            Back
          </button>
        )}
        {currentStep < 2 && ( // Only show Next button for steps 0 and 1
          <button
            onClick={nextStep}
            className="ml-auto px-6 py-2 rounded-lg bg-[#FF8C42] 
                     text-white hover:bg-[#FF8C42]/90 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
