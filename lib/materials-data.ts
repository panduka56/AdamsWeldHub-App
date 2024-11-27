// materials.ts

import { Material } from './types'

export const materialsData: Material[] = [
  {
    id: 'mild-steel',
    name: 'Mild Steel',
    overview: 'Low carbon steel commonly used in general fabrication and construction. Known for its versatility and affordability.',
    properties: {
      density: '7.85 g/cm³',
      meltingPoint: '1,427°C',
      yieldStrength: '250 MPa',
      weldability: 'Excellent',
    },
    applications: [
      'Structural steelwork',
      'Automotive parts',
      'Machinery',
      'Pipelines',
    ],
    weldingRecommendations: {
      process: 'MIG, TIG, or Stick Welding',
      shieldingGas: '75% Argon / 25% CO₂ for MIG; 100% Argon for TIG',
      tips: [
        'Preheat for thick sections to avoid cracking',
        'Keep gas flow steady to prevent oxidation',
      ],
    },
    additionalNotes: 'Susceptible to rust; requires protective coatings for outdoor use.',
  },
  {
    id: 'stainless-steel',
    name: 'Stainless Steel',
    overview: 'An alloy steel with high chromium content, offering excellent corrosion resistance and strength.',
    properties: {
      density: '7.75-8.1 g/cm³',
      meltingPoint: '1,400-1,530°C',
      yieldStrength: '200-750 MPa',
      weldability: 'Good',
    },
    applications: [
      'Food processing equipment',
      'Medical instruments',
      'Chemical containers',
      'Architectural structures',
    ],
    weldingRecommendations: {
      process: 'MIG or TIG Welding',
      shieldingGas: '98% Argon / 2% Oxygen for MIG; 100% Argon for TIG',
      tips: [
        'Use low heat input to prevent distortion',
        'Employ back purging to protect the weld root',
      ],
    },
    additionalNotes: 'Requires proper cleaning before welding to prevent contamination.',
  },
  {
    id: 'aluminum',
    name: 'Aluminum',
    overview: 'A lightweight metal known for its high strength-to-weight ratio and excellent corrosion resistance.',
    properties: {
      density: '2.70 g/cm³',
      meltingPoint: '660°C',
      yieldStrength: '70-700 MPa',
      weldability: 'Good',
    },
    applications: [
      'Aerospace components',
      'Automotive parts',
      'Construction materials',
      'Consumer electronics',
    ],
    weldingRecommendations: {
      process: 'TIG or MIG Welding',
      shieldingGas: '100% Argon for both TIG and MIG',
      tips: [
        'Clean oxide layer before welding',
        'Use AC current for TIG welding',
      ],
    },
    additionalNotes: 'High thermal conductivity requires higher heat input.',
  },
  {
    id: 'copper',
    name: 'Copper',
    overview: 'A metal with excellent electrical and thermal conductivity, commonly used in electrical applications.',
    properties: {
      density: '8.96 g/cm³',
      meltingPoint: '1,085°C',
      yieldStrength: '33-414 MPa',
      weldability: 'Fair',
    },
    applications: [
      'Electrical wiring',
      'Plumbing',
      'Heat exchangers',
      'Roofing materials',
    ],
    weldingRecommendations: {
      process: 'TIG Welding',
      shieldingGas: '100% Argon or Argon/Helium mix',
      tips: [
        'Preheat thicker sections to prevent cracking',
        'Use high amperage due to high thermal conductivity',
      ],
    },
    additionalNotes: 'Susceptible to porosity; proper cleaning is essential.',
  },
  {
    id: 'titanium',
    name: 'Titanium',
    overview: 'A strong, lightweight metal with excellent corrosion resistance, used in high-performance applications.',
    properties: {
      density: '4.51 g/cm³',
      meltingPoint: '1,668°C',
      yieldStrength: '170-1,400 MPa',
      weldability: 'Good',
    },
    applications: [
      'Aerospace structures',
      'Medical implants',
      'Chemical processing equipment',
      'Sporting goods',
    ],
    weldingRecommendations: {
      process: 'TIG Welding',
      shieldingGas: '100% Argon with trailing shields',
      tips: [
        'Prevent oxygen contamination by using proper shielding',
        'Maintain a clean welding environment',
      ],
    },
    additionalNotes: 'Requires inert atmosphere to prevent embrittlement.',
  },
  {
    id: 'cast-iron',
    name: 'Cast Iron',
    overview: 'An iron-carbon alloy with high carbon content, known for its hardness and brittleness.',
    properties: {
      density: '7.1 g/cm³',
      meltingPoint: '1,150-1,200°C',
      yieldStrength: '100-200 MPa',
      weldability: 'Poor',
    },
    applications: [
      'Engine blocks',
      'Pipes and fittings',
      'Cookware',
      'Machine tool frames',
    ],
    weldingRecommendations: {
      process: 'Stick Welding with Nickel Electrodes',
      shieldingGas: 'Not applicable',
      tips: [
        'Preheat and post-heat to reduce cracking',
        'Use short weld runs to minimize heat input',
      ],
    },
    additionalNotes: 'High risk of cracking due to brittleness; welding is challenging.',
  },
  // Add other materials as needed...
]
