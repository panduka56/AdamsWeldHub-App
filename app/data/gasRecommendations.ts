export type WeldingProcess = 'MIG' | 'TIG' | 'Flux-Cored' | 'Oxy-Fuel'
export type MaterialType = 'Mild-Steel' | 'Stainless-Steel' | 'Aluminum' | 'Copper' | 'Cast-Iron' | 'Nickel-Alloys' | 'Titanium'

export interface GasRecommendation {
  thicknessRange: string
  primaryGas: string
  alternativeGas: string | null
  notes: string
}

export interface GasRecommendations {
  [K: string]: {
    [M: string]: GasRecommendation[]
  }
}

export interface ProductMatching {
  [key: string]: string[]
}

export interface CylinderSizes {
  hobby: string[]
  professional: string[]
  industrial: string[]
}

export const gasRecommendations: GasRecommendations = {
  'MIG': {
    'Mild-Steel': [
      {
        thicknessRange: '<6',
        primaryGas: '75% Argon / 25% CO₂',
        alternativeGas: '90% Argon / 10% CO₂',
        notes: 'Lower CO₂ for reduced spatter, higher CO₂ for better penetration'
      },
      {
        thicknessRange: '≥6',
        primaryGas: '75% Argon / 25% CO₂',
        alternativeGas: '100% CO₂',
        notes: 'CO₂ provides deeper penetration for thicker materials'
      }
    ],
    'Stainless-Steel': [
      {
        thicknessRange: 'All',
        primaryGas: '98% Argon / 2% CO₂',
        alternativeGas: '90% Helium / 7.5% Argon / 2.5% CO₂',
        notes: 'Low CO₂ content prevents carbide formation'
      }
    ],
    'Aluminum': [
      {
        thicknessRange: 'All',
        primaryGas: '100% Argon',
        alternativeGas: '75% Argon / 25% Helium',
        notes: 'Pure argon for most applications, helium mix for thicker materials'
      }
    ]
  },
  'TIG': {
    'Mild-Steel': [
      {
        thicknessRange: 'All',
        primaryGas: '100% Argon',
        alternativeGas: '75% Argon / 25% Helium',
        notes: 'Pure argon is standard, helium mix for increased penetration'
      }
    ],
    'Stainless-Steel': [
      {
        thicknessRange: 'All',
        primaryGas: '100% Argon',
        alternativeGas: '98% Argon / 2% Hydrogen',
        notes: 'Hydrogen addition increases heat input and cleaning action'
      }
    ],
    'Aluminum': [
      {
        thicknessRange: 'All',
        primaryGas: '100% Argon',
        alternativeGas: null,
        notes: 'Pure argon provides excellent arc stability and cleaning action'
      }
    ]
  }
}

export const productMatching: ProductMatching = {
  '100% Argon': ['pure-argon-gas-bottle-', 'for-mig-and-tig-welding'],
  '75% Argon / 25% CO₂': ['20-co2-in-argon-mix-', 'for-mig-welding'],
  '90% Argon / 10% CO₂': ['5-co2-argon-mix-', 'for-mig-welding'],
  '98% Argon / 2% CO₂': ['5-co2-argon-mix-', 'for-mig-welding'], // Closest match
  '100% CO₂': ['carbon-dioxode-co2-gas-']
}

export const cylinderSizes: CylinderSizes = {
  'hobby': ['2L', '10L'],
  'professional': ['20L', '50L'],
  'industrial': ['50L']
} 