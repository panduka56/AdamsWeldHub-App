'use client'

import { motion } from 'framer-motion'

interface ProcessSelectionProps {
  options: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  onSelect: (process: string) => void;
  selected: string;
}

export default function ProcessSelection({ options, onSelect, selected }: ProcessSelectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((process) => (
        <motion.button
          key={process.id}
          onClick={() => onSelect(process.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            p-4 rounded-xl border transition-all duration-200
            ${selected === process.id
              ? 'bg-[#FF8C42]/10 border-[#FF8C42] text-[#FF8C42]'
              : 'bg-[#222222]/80 border-[#FF8C42]/10 text-[#E5E5E5]/60 hover:bg-[#FF8C42]/5'
            }
          `}
        >
          <div className="text-lg font-[350] mb-1">{process.name}</div>
          <div className="text-sm opacity-60">{process.description}</div>
        </motion.button>
      ))}
    </div>
  )
}

