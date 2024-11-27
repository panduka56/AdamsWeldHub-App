import { Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  steps: string[];
  procedures: {
    title: string;
    steps: string[];
  }[];
  warnings: string[];
  equipment: string[];
}

export const safetyTips: SafetyTip[] = [
  {
    id: 'gas-handling',
    title: 'Gas Cylinder Handling',
    description: 'Safe handling and storage of welding gas cylinders',
    icon: Wrench,
    steps: [
      'Secure cylinders in upright position',
      'Use proper lifting techniques',
      'Keep away from heat sources'
    ],
    procedures: [
      {
        title: 'Storage Procedure',
        steps: [
          'Store in well-ventilated area',
          'Separate full and empty cylinders',
          'Keep protective caps in place'
        ]
      }
    ],
    warnings: [
      'Never drop cylinders',
      'Avoid exposure to electrical circuits',
      'Do not use damaged cylinders'
    ],
    equipment: [
      'Cylinder cart',
      'Safety chains',
      'Protective caps'
    ]
  }
  // Add more safety tips as needed
]; 