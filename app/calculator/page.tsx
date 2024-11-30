'use client'

import { useState } from 'react'
import WeldingGasCalculator from '@/components/WeldingGasCalculator'
import { ChevronDown, ChevronUp, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { oxyFuelFlowRates } from '@/lib/oxy-fuel-data'

const gasFlowRates = oxyFuelFlowRates

export default function CalculatorPage() {
  const [showOxyFuelGuide, setShowOxyFuelGuide] = useState(false)
  const [showFlowRates, setShowFlowRates] = useState(false)

  return (
    <div className="container mx-auto px-6 py-12">
      <WeldingGasCalculator />

      {/* Oxy-Fuel Guide Section */}
      <div className="mt-12">
        <button
          onClick={() => setShowOxyFuelGuide(!showOxyFuelGuide)}
          className="w-full flex items-center justify-between p-6 
                     bg-[#222222]/80 rounded-t-xl border border-[#FF8C42]/20"
        >
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-[#FF8C42]" />
            <h2 className="text-2xl font-[350]">Oxy-Fuel Guide</h2>
          </div>
          {showOxyFuelGuide ? (
            <ChevronUp className="w-5 h-5 text-[#FF8C42]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#FF8C42]" />
          )}
        </button>

        <AnimatePresence>
          {showOxyFuelGuide && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-[#222222]/80 rounded-b-xl border-x border-b border-[#FF8C42]/20">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Process Cards */}
                  {['Welding', 'Cutting', 'Heating', 'Brazing'].map(process => (
                    <div key={process} className="p-4 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
                      <h3 className="text-lg font-[350] text-[#FF8C42] mb-2">{process}</h3>
                      <p className="text-[#E5E5E5]/80 text-sm">
                        {process === 'Welding' && 'Best with acetylene for high temperature and control'}
                        {process === 'Cutting' && 'All fuel gases suitable with proper setup'}
                        {process === 'Heating' && 'Choose based on heat requirements and cost'}
                        {process === 'Brazing' && 'MAPP gas offers good balance of heat and control'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gas Flow Rates Section */}
      <div className="mt-6">
        <button
          onClick={() => setShowFlowRates(!showFlowRates)}
          className="w-full flex items-center justify-between p-6 
                     bg-[#222222]/80 rounded-t-xl border border-[#FF8C42]/20"
        >
          <div className="flex items-center gap-3">
            <ChevronDown className="w-6 h-6 text-[#FF8C42]" />
            <h2 className="text-2xl font-[350]">Gas Flow Rates</h2>
          </div>
          {showFlowRates ? (
            <ChevronUp className="w-5 h-5 text-[#FF8C42]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#FF8C42]" />
          )}
        </button>

        <AnimatePresence>
          {showFlowRates && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-[#222222]/80 rounded-b-xl border-x border-b border-[#FF8C42]/20">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#FF8C42]/20">
                        <th className="text-left py-4 px-6 text-[#FF8C42]">Process</th>
                        <th className="text-left py-4 px-6 text-[#FF8C42]">Material</th>
                        <th className="text-left py-4 px-6 text-[#FF8C42]">Thickness</th>
                        <th className="text-left py-4 px-6 text-[#FF8C42]">Flow Rate</th>
                        <th className="text-left py-4 px-6 text-[#FF8C42]">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gasFlowRates.map((rate, index) => (
                        <tr 
                          key={index}
                          className="border-b border-[#FF8C42]/10 hover:bg-[#FF8C42]/5 transition-colors"
                        >
                          <td className="py-4 px-6 text-[#E5E5E5]">{rate.process}</td>
                          <td className="py-4 px-6 text-[#E5E5E5]">{rate.material}</td>
                          <td className="py-4 px-6 text-[#E5E5E5]">{rate.thickness}</td>
                          <td className="py-4 px-6 text-[#E5E5E5]">{rate.flowRate}</td>
                          <td className="py-4 px-6 text-[#E5E5E5]/60">{rate.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 