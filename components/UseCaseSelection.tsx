import { motion } from 'framer-motion'

interface UseCaseSelectionProps {
  onSelect: (useCase: string) => void;
  selected: string;
}

interface UseCase {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const useCases: UseCase[] = [
  { id: 'automotive', name: 'Automotive', icon: '🚗', description: 'Automotive welding applications' },
  { id: 'construction', name: 'Construction', icon: '🏗️', description: 'Construction and structural welding' },
  { id: 'aerospace', name: 'Aerospace', icon: '✈️', description: 'Aerospace and aviation welding' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭', description: 'General manufacturing processes' },
]

export default function UseCaseSelection({ onSelect, selected }: UseCaseSelectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {useCases.map((useCase) => (
        <motion.button
          key={useCase.id}
          onClick={() => onSelect(useCase.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            p-4 rounded-xl border transition-all duration-200
            ${selected === useCase.id
              ? 'bg-[#FF8C42]/10 border-[#FF8C42] text-[#FF8C42]'
              : 'bg-[#222222]/80 border-[#FF8C42]/10 text-[#E5E5E5]/60 hover:bg-[#FF8C42]/5'
            }
          `}
        >
          <div className="text-lg font-[350] mb-1">{useCase.name}</div>
          <div className="text-sm opacity-60">{useCase.description}</div>
        </motion.button>
      ))}
    </div>
  )
}

