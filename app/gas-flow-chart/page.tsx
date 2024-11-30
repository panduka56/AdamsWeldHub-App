import Link from 'next/link'
import { ArrowLeft, Beaker, Flame } from 'lucide-react'
import GasFlowVisualizer from '@/components/GasFlowVisualizer'
import NotesSection from '@/components/NotesSection'

interface GasFlowRate {
  process: string;
  material: string;
  thickness: string;
  flowRate: string;
  notes?: string;
}

const gasFlowRates: GasFlowRate[] = [
  {
    process: 'MIG',
    material: 'Mild Steel',
    thickness: '1-3mm',
    flowRate: '12-15 L/min',
    notes: 'Use 75/25 Ar/CO₂ mix'
  },
  {
    process: 'MIG',
    material: 'Stainless Steel',
    thickness: '1-3mm',
    flowRate: '12-16 L/min',
    notes: 'Use 98/2 Ar/CO₂ or tri-mix'
  },
  {
    process: 'TIG',
    material: 'Aluminum',
    thickness: 'All',
    flowRate: '15-20 L/min',
    notes: 'Use 100% Argon'
  },
  {
    process: 'TIG',
    material: 'Stainless Steel',
    thickness: 'All',
    flowRate: '12-15 L/min',
    notes: 'Use 100% Argon'
  },
  {
    process: 'Oxy-Fuel',
    material: 'Mild Steel',
    thickness: '0.5-12mm',
    flowRate: 'O₂: 5-15 L/min, C₂H₂: 2-5 L/min',
    notes: 'Welding - Neutral flame'
  },
  {
    process: 'Oxy-Fuel',
    material: 'Mild Steel',
    thickness: '>12mm',
    flowRate: 'O₂: 20-50 L/min, C₂H₂: 3-10 L/min',
    notes: 'Cutting - Slightly oxidizing'
  },
  {
    process: 'Oxy-Fuel',
    material: 'Mild Steel',
    thickness: 'Any',
    flowRate: 'O₂: 50-100 L/min, C₂H₂: 20-50 L/min',
    notes: 'Heating'
  },
  {
    process: 'Oxy-Fuel',
    material: 'Stainless Steel',
    thickness: '<3mm',
    flowRate: 'O₂: 10-20 L/min, H₂: 5-10 L/min',
    notes: 'Clean flame for minimal oxidation'
  }
  // Add more flow rates as needed
]

const oxyFuelGases = [
  {
    gas: 'Acetylene',
    welding: '✓',
    cutting: '✓',
    heating: '✓',
    brazing: '✓',
    advantages: 'High flame temperature; precise control',
    limitations: 'Expensive, requires careful handling'
  },
  {
    gas: 'Propylene',
    welding: '✗',
    cutting: '✓',
    heating: '✓',
    brazing: '✓',
    advantages: 'Fast cutting; economical for heating',
    limitations: 'Not suitable for welding'
  },
  // ... add other gases
]

export default function GasFlowChart() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex space-x-4 mb-8">
        <Link 
          href="/materials-guide" 
          className="inline-flex items-center text-[#FF8C42]"
        >
          <Beaker className="w-5 h-5 mr-2" />
          Materials Guide
        </Link>
        <Link 
          href="/oxy-fuel-guide" 
          className="inline-flex items-center text-[#FF8C42]"
        >
          <Flame className="w-5 h-5 mr-2" />
          Oxy-Fuel Guide
        </Link>
        <Link 
          href="/" 
          className="inline-flex items-center text-[#FF8C42] mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Calculator
        </Link>
      </div>

      <div className="space-y-12">
        <GasFlowVisualizer />
        
        <div className="bg-[#222222]/80 rounded-xl p-8">
          <h1 className="text-3xl font-[350] mb-6">Gas Flow Cheat Sheet</h1>
          <p className="text-[#E5E5E5]/80 mb-8">
            Quick reference guide for optimal gas flow rates across different welding processes and materials.
          </p>

          {/* Flow Rates Table */}
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
                    className="border-b border-[#FF8C42]/10 
                             hover:bg-[#FF8C42]/5 transition-colors"
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

          {/* Additional Tips */}
          <div className="mt-8 p-6 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20">
            <h2 className="text-xl font-[350] mb-4">Tips for Optimal Flow</h2>
            <ul className="list-disc list-inside space-y-2 text-[#E5E5E5]/80">
              <li>Start with the recommended flow rate and adjust as needed</li>
              <li>Increase flow rate when working in drafty conditions</li>
              <li>Reduce flow rate for smaller joints to prevent turbulence</li>
              <li>Monitor for signs of inadequate coverage (porosity, oxidation)</li>
            </ul>
          </div>

          {/* Notes Section */}
          <div className="mt-8">
            <NotesSection />
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-[350] mb-6">Oxy-Fuel Gas Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#FF8C42]/20">
                    <th className="text-left py-4 px-6 text-[#FF8C42]">Gas</th>
                    <th className="text-center py-4 px-6 text-[#FF8C42]">Welding</th>
                    <th className="text-center py-4 px-6 text-[#FF8C42]">Cutting</th>
                    <th className="text-center py-4 px-6 text-[#FF8C42]">Heating</th>
                    <th className="text-center py-4 px-6 text-[#FF8C42]">Brazing</th>
                    <th className="text-left py-4 px-6 text-[#FF8C42]">Advantages</th>
                    <th className="text-left py-4 px-6 text-[#FF8C42]">Limitations</th>
                  </tr>
                </thead>
                <tbody>
                  {oxyFuelGases.map((gas, index) => (
                    <tr 
                      key={index}
                      className="border-b border-[#FF8C42]/10 hover:bg-[#FF8C42]/5 transition-colors"
                    >
                      <td className="py-4 px-6 text-[#E5E5E5]">{gas.gas}</td>
                      <td className="py-4 px-6 text-center text-[#E5E5E5]">{gas.welding}</td>
                      <td className="py-4 px-6 text-center text-[#E5E5E5]">{gas.cutting}</td>
                      <td className="py-4 px-6 text-center text-[#E5E5E5]">{gas.heating}</td>
                      <td className="py-4 px-6 text-center text-[#E5E5E5]">{gas.brazing}</td>
                      <td className="py-4 px-6 text-[#E5E5E5]">{gas.advantages}</td>
                      <td className="py-4 px-6 text-[#E5E5E5]/60">{gas.limitations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 