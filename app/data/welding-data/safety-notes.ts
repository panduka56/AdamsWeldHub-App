import type { WeldingProcess, MaterialType } from '../../../types/welding'

export interface SafetyNote {
  process: WeldingProcess
  material: MaterialType
  notes: string[]
  warnings: string[]
  priority?: number
}

export const safetyNotes: SafetyNote[] = [
  {
    process: 'MIG',
    material: 'Mild-Steel',
    priority: 1,
    notes: [
      'Ensure proper ventilation',
      'Check gas connections before starting',
      'Keep work area clean and dry'
    ],
    warnings: [
      'CO₂ can displace oxygen in confined spaces',
      'Monitor gas flow rates to prevent wastage'
    ]
  },
  {
    process: 'TIG',
    material: 'Stainless-Steel',
    notes: [
      'Use proper eye protection',
      'Maintain clean welding area',
      'Check for proper gas coverage'
    ],
    warnings: [
      'Hydrogen mixtures require extra ventilation',
      'Avoid contamination of tungsten electrode'
    ]
  }
] 