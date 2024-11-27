'use client'

import { motion } from 'framer-motion'

interface MaterialSelectionProps {
  options: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  onSelect: (material: string) => void;
  selected: string;
}

export default function MaterialSelection({ options, onSelect, selected }: MaterialSelectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((material) => (
        <motion.button
          key={material.id}
          onClick={() => onSelect(material.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            p-4 rounded-xl border transition-all duration-200
            ${selected === material.id
              ? 'bg-[#FF8C42]/10 border-[#FF8C42] text-[#FF8C42]'
              : 'bg-[#222222]/80 border-[#FF8C42]/10 text-[#E5E5E5]/60 hover:bg-[#FF8C42]/5'
            }
          `}
        >
          <div className="text-lg font-[350] mb-1">{material.name}</div>
          <div className="text-sm opacity-60">{material.description}</div>
        </motion.button>
      ))}
    </div>
  )
}

