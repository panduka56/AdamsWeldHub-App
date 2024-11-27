export interface TroubleshootingIssue {
  id: string;
  title: string;
  category: string;
  description: string;
  causes: string[];
  solutions: string[];
  equipment: string[];
}

export const categories = [
  'MIG Welding Issues',
  'TIG Welding Issues',
  'General Welding Issues'
] as const;

export const troubleshootingIssues: TroubleshootingIssue[] = [
  {
    id: 'porosity-in-welds',
    title: 'Porosity in Welds',
    category: 'MIG Welding Issues',
    description: 'Gas pockets or voids in the weld metal leading to weak joints.',
    causes: [
      'Contaminated base metal',
      'Improper shielding gas flow',
      'Excessive travel speed'
    ],
    solutions: [
      'Clean the base metal thoroughly before welding',
      'Adjust shielding gas flow rate to recommended settings',
      'Reduce travel speed to allow proper gas coverage'
    ],
    equipment: ['Wire brush', 'Gas regulator', 'Welding torch']
  },
  // Add more issues...
]; 