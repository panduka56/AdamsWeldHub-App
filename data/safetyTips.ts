import { Shield } from 'lucide-react'
import type { IconType } from '@/types/icons'

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  procedures: Array<{
    title: string;
    steps: string[];
  }>;
  warnings: string[];
  equipment: string[];
}

const safetyTips: SafetyTip[] = [
  {
    id: 'general-safety',
    title: 'General Safety Guidelines',
    description: 'Essential safety practices for welding gas handling',
    icon: Shield,
    procedures: [
      {
        title: 'Before Starting',
        steps: [
          'Inspect all equipment',
          'Ensure proper ventilation',
          'Wear appropriate PPE',
          'Check for gas leaks'
        ]
      }
    ],
    warnings: [
      'Never use damaged equipment',
      'Keep fire extinguisher nearby',
      'Avoid confined spaces without ventilation'
    ],
    equipment: [
      'Safety glasses',
      'Welding gloves',
      'Fire-resistant clothing',
      'Proper footwear'
    ]
  },
  // Add more safety tips...
]

export default safetyTips 