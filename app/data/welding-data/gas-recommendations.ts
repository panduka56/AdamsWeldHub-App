import type { WeldingProcess, MaterialType } from '@/types/welding'

export interface GasRecommendation {
  thicknessRange: string
  primaryGas: string
  alternativeGas: string | null
  notes: string
  priority: number
  productMatches?: {
    primary: string[]
    alternative?: string[]
  }
  safetyNotes?: string[]
  applicationNotes?: string
}

export interface ProcessMaterialMap {
  [K: string]: {
    [M: string]: GasRecommendation[]
  }
}

export const gasRecommendations: ProcessMaterialMap = {
  'MIG': {
    'Mild-Steel': [
      {
        thicknessRange: '<3',
        primaryGas: '75% Argon / 25% CO₂',
        alternativeGas: '90% Argon / 10% CO₂',
        notes: 'Lower CO₂ for reduced spatter, higher CO₂ for better penetration',
        priority: 1,
        applicationNotes: 'Ideal for thin materials, minimizes heat input and distortion',
        productMatches: {
          primary: ['20-co2-in-argon-mix-', 'for-mig-welding'],
          alternative: ['5-co2-argon-mix-', 'for-mig-welding']
        }
      },
      {
        thicknessRange: '3-12',
        primaryGas: '75% Argon / 25% CO₂',
        alternativeGas: '100% CO₂',
        notes: 'CO₂ provides deeper penetration for thicker materials',
        priority: 2,
        applicationNotes: 'Balanced penetration and spatter control for medium thickness',
        productMatches: {
          primary: ['20-co2-in-argon-mix-', 'for-mig-welding'],
          alternative: ['carbon-dioxode-co2-gas-']
        }
      }
    ],
    'Stainless-Steel': [
      {
        thicknessRange: 'All',
        primaryGas: '98% Argon / 2% CO₂',
        alternativeGas: '90% Helium / 7.5% Argon / 2.5% CO₂',
        notes: 'Low CO₂ content prevents carbide formation',
        priority: 1,
        applicationNotes: 'Maintains corrosion resistance and provides excellent bead appearance',
        productMatches: {
          primary: ['5-co2-argon-mix-', 'for-mig-welding']
        }
      }
    ],
    'Aluminum': [
      {
        thicknessRange: 'All',
        primaryGas: '100% Argon',
        alternativeGas: '75% Argon / 25% Helium',
        notes: 'Pure argon provides excellent arc stability and clean welds',
        priority: 1,
        applicationNotes: 'Ideal for all aluminum thicknesses, provides excellent cleaning action',
        productMatches: {
          primary: ['pure-argon-gas-bottle-', 'for-mig-and-tig-welding']
        }
      }
    ]
  },
  'TIG': {
    'Mild-Steel': [
      {
        thicknessRange: 'All',
        primaryGas: '100% Argon',
        alternativeGas: '75% Argon / 25% Helium',
        notes: 'Pure argon is standard, helium mix for increased penetration',
        priority: 1,
        applicationNotes: 'Provides excellent arc stability and control for all thicknesses',
        productMatches: {
          primary: ['pure-argon-gas-bottle-', 'for-mig-and-tig-welding']
        }
      }
    ],
    'Stainless-Steel': [
      {
        thicknessRange: 'All',
        primaryGas: '100% Argon',
        alternativeGas: '98% Argon / 2% Hydrogen',
        notes: 'Hydrogen addition increases heat input and cleaning action',
        priority: 1,
        applicationNotes: 'Excellent for maintaining material properties and finish quality',
        productMatches: {
          primary: ['pure-argon-gas-bottle-', 'for-mig-and-tig-welding']
        }
      }
    ],
    'Aluminum': [
      {
        thicknessRange: '<6',
        primaryGas: '100% Argon',
        alternativeGas: null,
        notes: 'Pure argon provides optimal cleaning action and arc stability',
        priority: 1,
        applicationNotes: 'Perfect for thin aluminum, minimizes risk of burn-through',
        productMatches: {
          primary: ['pure-argon-gas-bottle-', 'for-mig-and-tig-welding']
        }
      },
      {
        thicknessRange: '≥6',
        primaryGas: '75% Argon / 25% Helium',
        alternativeGas: '100% Argon',
        notes: 'Helium mix increases heat input for better penetration',
        priority: 1,
        applicationNotes: 'Better heat penetration for thicker materials',
        productMatches: {
          primary: ['argon-helium-mix-', 'for-tig-welding'],
          alternative: ['pure-argon-gas-bottle-', 'for-mig-and-tig-welding']
        }
      }
    ]
  }
}

export const processTypes: WeldingProcess[] = ['MIG', 'TIG', 'Flux-Cored', 'Oxy-Fuel']
export const materialTypes: MaterialType[] = [
  'Mild-Steel',
  'Stainless-Steel',
  'Aluminum',
  'Copper',
  'Cast-Iron',
  'Nickel-Alloys',
  'Titanium'
] 