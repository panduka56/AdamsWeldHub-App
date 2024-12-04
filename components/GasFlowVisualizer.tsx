'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, AlertTriangle, CheckCircle, Info, ChevronDown } from 'lucide-react'

interface ProcessConfig {
  minFlow: number;
  maxFlow: number;
  optimalMin: number;
  optimalMax: number;
  unit: 'L/min' | 'CFH';
}

interface FlowState {
  status: 'underflow' | 'optimal' | 'overflow';
  message: string;
  color: string;
}

const processConfigs: Record<string, Record<string, ProcessConfig>> = {
  'MIG': {
    'Mild Steel': { minFlow: 10, maxFlow: 25, optimalMin: 12, optimalMax: 15, unit: 'L/min' },
    'Stainless Steel': { minFlow: 10, maxFlow: 25, optimalMin: 12, optimalMax: 16, unit: 'L/min' },
    'Aluminum': { minFlow: 12, maxFlow: 30, optimalMin: 15, optimalMax: 20, unit: 'L/min' },
  },
  'TIG': {
    'Mild Steel': { minFlow: 8, maxFlow: 20, optimalMin: 10, optimalMax: 15, unit: 'L/min' },
    'Stainless Steel': { minFlow: 8, maxFlow: 20, optimalMin: 12, optimalMax: 15, unit: 'L/min' },
    'Aluminum': { minFlow: 12, maxFlow: 25, optimalMin: 15, optimalMax: 20, unit: 'L/min' },
  }
}

const getFlowState = (flow: number, config: ProcessConfig): FlowState => {
  if (flow < config.optimalMin) {
    return {
      status: 'underflow',
      message: `Gas flow is too low for this process. Increase to ${config.optimalMin}-${config.optimalMax} ${config.unit} for proper shielding.`,
      color: '#FF4444'
    }
  } else if (flow > config.optimalMax) {
    return {
      status: 'overflow',
      message: `Flow rate exceeds recommended ${config.optimalMin}-${config.optimalMax} ${config.unit}. Reduce to prevent turbulence and waste.`,
      color: '#FF8C42'
    }
  } else {
    return {
      status: 'optimal',
      message: `Optimal flow rate achieved. Maintaining ${config.optimalMin}-${config.optimalMax} ${config.unit} ensures proper shielding.`,
      color: '#44FF88'
    }
  }
}

export default function GasFlowVisualizer() {
  const [process, setProcess] = useState('MIG')
  const [material, setMaterial] = useState('Mild Steel')
  const [flowRate, setFlowRate] = useState(15)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showProcessDropdown, setShowProcessDropdown] = useState(false)
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false)

  const config = processConfigs[process][material]
  const flowState = getFlowState(flowRate, config)

  useEffect(() => {
    // Reset flow rate to optimal minimum when process/material changes
    setFlowRate(config.optimalMin)
  }, [config.optimalMin, process, material])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Main Visualization (Left Column) */}
      <div className="lg:col-span-3 bg-[#222222]/80 rounded-xl p-8 border border-[#FF8C42]/20">
        <div className="flex items-center mb-6">
          <Wind className="w-6 h-6 text-[#FF8C42] mr-2" />
          <h2 className="text-2xl font-[350]">Gas Flow Visualizer</h2>
        </div>

        {/* Process & Material Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Process Selector */}
          <div className="relative">
            <button
              onClick={() => setShowProcessDropdown(!showProcessDropdown)}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#FF8C42]/20
                       flex items-center justify-between text-[#E5E5E5]"
            >
              <span>{process}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {showProcessDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20
                           shadow-lg overflow-hidden"
                >
                  {Object.keys(processConfigs).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setProcess(p)
                        setShowProcessDropdown(false)
                      }}
                      className="w-full p-3 text-left hover:bg-[#FF8C42]/10 text-[#E5E5E5]"
                    >
                      {p}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Material Selector */}
          <div className="relative">
            <button
              onClick={() => setShowMaterialDropdown(!showMaterialDropdown)}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#FF8C42]/20
                       flex items-center justify-between text-[#E5E5E5]"
            >
              <span>{material}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {showMaterialDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-[#1A1A1A] rounded-lg border border-[#FF8C42]/20
                           shadow-lg overflow-hidden"
                >
                  {Object.keys(processConfigs[process]).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMaterial(m)
                        setShowMaterialDropdown(false)
                      }}
                      className="w-full p-3 text-left hover:bg-[#FF8C42]/10 text-[#E5E5E5]"
                    >
                      {m}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Flow Rate Control */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-[#E5E5E5]/60">Flow Rate ({config.unit})</span>
            <span className="text-[#FF8C42]">{flowRate.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={config.minFlow}
            max={config.maxFlow}
            step={0.5}
            value={flowRate}
            onChange={(e) => setFlowRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-[#333333] rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                     [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-[#FF8C42]"
          />
          <div className="flex justify-between text-xs text-[#E5E5E5]/40 mt-1">
            <span>{config.minFlow}</span>
            <span>{config.optimalMin}</span>
            <span>{config.optimalMax}</span>
            <span>{config.maxFlow}</span>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="relative h-64 bg-[#1A1A1A] rounded-lg mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Gas Flow Particles */}
            <AnimatePresence>
              {Array.from({ length: Math.floor(flowRate / 2) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ 
                    y: [-100, 100],
                    opacity: [0, 1, 0],
                    x: Math.sin(i) * (flowRate > config.optimalMax ? 20 : 5)
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "linear"
                  }}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: flowState.color }}
                />
              ))}
            </AnimatePresence>
            
            {/* Status Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4"
            >
              {flowState.status === 'optimal' ? (
                <CheckCircle className="w-8 h-8 text-[#44FF88]" />
              ) : (
                <AlertTriangle className="w-8 h-8" style={{ color: flowState.color }} />
              )}
            </motion.div>
          </div>
        </div>

        {/* Status Message */}
        <div className="relative">
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: `${flowState.color}10`,
              borderColor: `${flowState.color}30`
            }}
          >
            <div className="flex items-start">
              <Info 
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                style={{ color: flowState.color }}
              />
              <p className="text-[#E5E5E5]/80">{flowState.message}</p>
            </div>
          </div>

          {/* Hover Tooltip */}
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#333333] 
                     flex items-center justify-center text-[#E5E5E5]/60 text-sm
                     hover:bg-[#444444] transition-colors"
          >
            ?
          </button>
          
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-8 w-64 p-3 rounded-lg bg-[#333333] 
                         text-sm text-[#E5E5E5]/80 shadow-lg z-10"
              >
                Adjust the slider to see how different gas flow rates affect your weld quality. 
                Aim to stay within the optimal range (20-30 CFH) for best results.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Reference (Right Column) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-[#222222]/80 rounded-xl p-6 border border-[#FF8C42]/20">
          <h3 className="text-lg font-[350] mb-4">Quick Reference</h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-[#E5E5E5]/60 mb-1">Recommended Range</div>
              <div className="text-[#44FF88]">
                {config.optimalMin}-{config.optimalMax} {config.unit}
              </div>
            </div>
            <div>
              <div className="text-[#E5E5E5]/60 mb-1">Gas Type</div>
              <div className="text-[#E5E5E5]">
                {process === 'MIG' && material === 'Stainless Steel' 
                  ? '98% Argon / 2% CO₂' 
                  : process === 'MIG' && material === 'Mild Steel'
                  ? '75% Argon / 25% CO₂'
                  : '100% Argon'}
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-[#222222]/80 rounded-xl p-6 border border-[#FF8C42]/20">
          <h3 className="text-lg font-[350] mb-4">Process Tips</h3>
          <ul className="space-y-3 text-sm text-[#E5E5E5]/80">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] mt-1.5 mr-2 flex-shrink-0" />
              Ensure proper gas coverage by maintaining consistent torch angle
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] mt-1.5 mr-2 flex-shrink-0" />
              Check for drafts that may disrupt shielding gas
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] mt-1.5 mr-2 flex-shrink-0" />
              Monitor weld quality for signs of inadequate gas coverage
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 