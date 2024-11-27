import { Wrench } from 'lucide-react'
import type { IconType } from '@/types/icons'

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  steps: string[];
  warnings: string[];
}

const safetyData: SafetyTip[] = [
  {
    id: 'gas-handling',
    title: 'Gas Cylinder Handling',
    description: 'Safe practices for handling and storing gas cylinders',
    icon: Wrench,
    steps: [
      'Always secure cylinders in upright position',
      'Use proper lifting techniques and equipment',
      'Store in well-ventilated area',
      'Keep away from heat sources'
    ],
    warnings: [
      'Never drop or strike cylinders',
      'Do not use cylinders as rollers',
      'Keep valve protection caps in place when not in use'
    ]
  },
  // Add more safety tips...
]

export default safetyData 