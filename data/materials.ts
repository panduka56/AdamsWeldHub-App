export interface Material {
  id: string;
  name: string;
  description: string;
  properties: {
    meltingPoint: string;
    conductivity: string;
    strength: string;
  };
  compatibleGases: string[];
  applications: string[];
}

const materials: Material[] = [
  {
    id: 'mild-steel',
    name: 'Mild Steel',
    description: 'Common carbon steel used in general fabrication',
    properties: {
      meltingPoint: '1500°C',
      conductivity: 'Medium',
      strength: 'High'
    },
    compatibleGases: [
      '75% Argon / 25% CO₂',
      '100% CO₂',
      '90% Argon / 10% CO₂'
    ],
    applications: [
      'Structural fabrication',
      'General manufacturing',
      'Construction'
    ]
  },
  // Add more materials...
]

export default materials 