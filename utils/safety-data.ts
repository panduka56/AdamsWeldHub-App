export interface SafetyTip {
  id: string;
  title: string;
  content: string;
  category: string;
  recommendations: string[];
}

export const safetyTips: SafetyTip[] = [
  {
    id: 'gas-handling',
    title: 'Gas Cylinder Handling',
    content: 'Proper handling and storage of gas cylinders is crucial for workplace safety.',
    category: 'Gas Safety',
    recommendations: [
      'Always secure cylinders in upright position',
      'Use proper lifting techniques',
      'Store in well-ventilated areas'
    ]
  },
  {
    id: 'ppe',
    title: 'Personal Protective Equipment',
    content: 'Using proper PPE is essential for welding safety.',
    category: 'Personal Safety',
    recommendations: [
      'Always wear appropriate welding helmet',
      'Use flame-resistant clothing',
      'Wear safety boots and gloves'
    ]
  }
] 