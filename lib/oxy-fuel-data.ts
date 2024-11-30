export const oxyFuelFlowRates = [
  {
    process: 'MIG',
    material: 'Mild Steel',
    thickness: '1-3mm',
    flowRate: '12-15 L/min',
    notes: 'Use 75/25 Ar/CO₂ mix'
  },
  {
    process: 'MIG',
    material: 'Stainless Steel',
    thickness: '1-3mm',
    flowRate: '12-16 L/min',
    notes: 'Use 98/2 Ar/CO₂ or tri-mix'
  },
  {
    process: 'TIG',
    material: 'Aluminum',
    thickness: 'All',
    flowRate: '15-20 L/min',
    notes: 'Use 100% Argon'
  },
  {
    process: 'TIG',
    material: 'Stainless Steel',
    thickness: 'All',
    flowRate: '12-15 L/min',
    notes: 'Use 100% Argon'
  },
  {
    process: 'Oxy-Fuel',
    material: 'Mild Steel',
    thickness: '0.5-12mm',
    flowRate: 'O₂: 5-15 L/min, C₂H₂: 2-5 L/min',
    notes: 'Welding - Neutral flame'
  },
  {
    process: 'Oxy-Fuel',
    material: 'Mild Steel',
    thickness: '>12mm',
    flowRate: 'O₂: 20-50 L/min, C₂H₂: 3-10 L/min',
    notes: 'Cutting - Slightly oxidizing'
  },
  {
    process: 'Oxy-Fuel',
    material: 'Mild Steel',
    thickness: 'Any',
    flowRate: 'O₂: 50-100 L/min, C₂H₂: 20-50 L/min',
    notes: 'Heating'
  },
  {
    process: 'Oxy-Fuel',
    material: 'Stainless Steel',
    thickness: '<3mm',
    flowRate: 'O₂: 10-20 L/min, H₂: 5-10 L/min',
    notes: 'Clean flame for minimal oxidation'
  }
]

export const oxyFuelGases = [
  {
    gas: 'Acetylene',
    flameTemp: '3,160°C',
    primaryUse: 'Welding, Cutting',
    welding: '✓',
    cutting: '✓',
    heating: '✓',
    brazing: '✓',
    advantages: 'High temperature, precise flame control',
    limitations: 'Expensive, flammable, unstable'
  },
  {
    gas: 'Propylene',
    flameTemp: '2,850°C',
    primaryUse: 'Cutting, Brazing',
    welding: '✗',
    cutting: '✓',
    heating: '✓',
    brazing: '✓',
    advantages: 'Economical, faster cuts than propane',
    limitations: 'Not suitable for welding'
  },
  {
    gas: 'MAPP Gas',
    flameTemp: '2,976°C',
    primaryUse: 'Welding, Brazing',
    welding: '✓',
    cutting: '✓',
    heating: '✓',
    brazing: '✓',
    advantages: 'High temperature, safe, clean flame',
    limitations: 'Higher cost than propane'
  },
  {
    gas: 'Propane',
    flameTemp: '2,828°C',
    primaryUse: 'Cutting',
    welding: '✗',
    cutting: '✓',
    heating: '✓',
    brazing: '✓',
    advantages: 'Economical, widely available',
    limitations: 'Slower preheat; unsuitable for welding'
  }
]

export const materialRecommendations = {
  'Mild Steel': {
    welding: {
      thickness: '< 3 mm',
      oxygenFlow: '5-15 L/min',
      fuelGasFlow: '2-5 L/min',
      notes: 'Use neutral flame for clean, strong welds'
    },
    cutting: {
      thickness: '> 12 mm',
      oxygenFlow: '20-50 L/min',
      fuelGasFlow: '3-10 L/min',
      notes: 'Slightly oxidizing flame for faster cuts'
    }
  },
  'Stainless Steel': {
    brazing: {
      thickness: '3-12 mm',
      oxygenFlow: '15-40 L/min',
      fuelGasFlow: '3-7 L/min',
      notes: 'Use MAPP gas for strong, clean joints'
    }
  },
  'Aluminum': {
    welding: {
      thickness: '< 3 mm',
      oxygenFlow: '10-20 L/min',
      fuelGasFlow: '5-10 L/min',
      notes: 'Use hydrogen for low oxidation'
    }
  }
} 