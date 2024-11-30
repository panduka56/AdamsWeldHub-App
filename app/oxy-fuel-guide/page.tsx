import Link from 'next/link'
import { ArrowLeft, Flame } from 'lucide-react'

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
  {
    gas: 'MAPP Gas',
    welding: '✓',
    cutting: '✓',
    heating: '✓',
    brazing: '✓',
    advantages: 'High temperature; versatile',
    limitations: 'Higher cost than propane'
  },
  {
    gas: 'Propane',
    welding: '✗',
    cutting: '✓',
    heating: '✓',
    brazing: '✓',
    advantages: 'Economical for large-scale heating',
    limitations: 'Slower preheat; not for welding'
  }
]

export default function OxyFuelGuide() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex space-x-4 mb-8">
        <Link 
          href="/gas-flow-chart" 
          className="inline-flex items-center text-[#FF8C42]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Gas Flow Chart
        </Link>
      </div>

      <div className="space-y-12">
        <div className="bg-[#222222]/80 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-8 h-8 text-[#FF8C42]" />
            <h1 className="text-3xl font-[350]">Oxy-Fuel Guide</h1>
          </div>

          <p className="text-[#E5E5E5]/80 mb-8">
            Comprehensive guide for oxy-fuel welding, cutting, heating, and brazing applications.
          </p>

          {/* Gas Comparison Table */}
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
  )
} 