import { Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  procedures?: {
    title: string;
    steps: string[];
  }[];
  warnings?: string[];
  equipment?: string[];
}

const safetyData: SafetyTip[] = [
  {
    id: 'gas-handling',
    title: 'Gas Cylinder Handling',
    description: 'Safe practices for handling and storing gas cylinders',
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
      'Never drop or strike cylinders',
      'Do not use cylinders as rollers',
      'Keep valve protection caps in place when not in use'
    ]
  },
  // Add more safety tips...
]

export default safetyData 