// gasRecommendations.ts

export interface GasRecommendation {
    process: string;
    material: string;
    thicknessRange: string;
    recommendedGas: string;
    productId?: string; // Optional, if product is available
    notes?: string; // Additional information or tips
  }
  
  export const gasRecommendations: GasRecommendation[] = [
    // MIG Welding - Mild Steel
    {
      process: 'MIG Welding',
      material: 'Mild Steel',
      thicknessRange: 'Up to 3mm',
      recommendedGas: 'Argon with 5% CO₂',
      productId: '101', // Replace with your actual product ID
      notes: 'Ideal for thin sheets; provides good arc stability and reduces spatter.'
    },
    {
      process: 'MIG Welding',
      material: 'Mild Steel',
      thicknessRange: '3mm - 12mm',
      recommendedGas: 'Argon with 12% CO₂',
      productId: '102', // Replace with your actual product ID
      notes: 'Suitable for thicker sections; offers deeper penetration.'
    },
    {
      process: 'MIG Welding',
      material: 'Mild Steel',
      thicknessRange: 'Above 12mm',
      recommendedGas: 'Argon with 20% CO₂',
      productId: '103', // Replace with your actual product ID
      notes: 'Best for heavy-duty applications; increases heat input for thicker materials.'
    },
  
    // MIG Welding - Stainless Steel
    {
      process: 'MIG Welding',
      material: 'Stainless Steel',
      thicknessRange: 'Any',
      recommendedGas: 'Argon with 2% CO₂',
      productId: '104', // Replace with your actual product ID
      notes: 'Maintains corrosion resistance; minimizes carbon pickup.'
    },
    {
      process: 'MIG Welding',
      material: 'Stainless Steel',
      thicknessRange: 'Any',
      recommendedGas: 'Argon with 2% Oxygen',
      productId: '105', // Replace with your actual product ID
      notes: 'Improves wetting and bead appearance.'
    },
  
    // MIG Welding - Aluminium
    {
      process: 'MIG Welding',
      material: 'Aluminium',
      thicknessRange: 'Up to 12mm',
      recommendedGas: 'Pure Argon',
      productId: '106', // Replace with your actual product ID
      notes: 'Provides a stable arc and clean welds for aluminium.'
    },
    {
      process: 'MIG Welding',
      material: 'Aluminium',
      thicknessRange: 'Above 12mm',
      recommendedGas: 'Argon with Helium (75% Ar / 25% He)',
      productId: '107', // Replace with your actual product ID
      notes: 'Helium addition increases heat input for thicker sections.'
    },
  
    // TIG Welding - Mild Steel
    {
      process: 'TIG Welding',
      material: 'Mild Steel',
      thicknessRange: 'Any',
      recommendedGas: 'Pure Argon',
      productId: '108', // Replace with your actual product ID
      notes: 'Ensures a stable arc and high-quality welds.'
    },
  
    // TIG Welding - Stainless Steel
    {
      process: 'TIG Welding',
      material: 'Stainless Steel',
      thicknessRange: 'Any',
      recommendedGas: 'Pure Argon',
      productId: '108', // Replace with your actual product ID
      notes: 'Prevents oxidation and maintains material properties.'
    },
    {
      process: 'TIG Welding',
      material: 'Stainless Steel',
      thicknessRange: 'Thick Sections',
      recommendedGas: 'Argon with 2% Hydrogen',
      productId: '109', // Replace with your actual product ID
      notes: 'Hydrogen addition improves penetration and travel speed.'
    },
  
    // TIG Welding - Aluminium
    {
      process: 'TIG Welding',
      material: 'Aluminium',
      thicknessRange: 'Any',
      recommendedGas: 'Pure Argon',
      productId: '108', // Replace with your actual product ID
      notes: 'Provides excellent arc stability for aluminium welding.'
    },
    {
      process: 'TIG Welding',
      material: 'Aluminium',
      thicknessRange: 'Above 12mm',
      recommendedGas: 'Argon with Helium (50% Ar / 50% He)',
      productId: '110', // Replace with your actual product ID
      notes: 'Helium increases heat input, ideal for thicker materials.'
    },
  
    // TIG Welding - Copper and Copper Alloys
    {
      process: 'TIG Welding',
      material: 'Copper Alloys',
      thicknessRange: 'Any',
      recommendedGas: 'Pure Argon',
      productId: '108', // Replace with your actual product ID
      notes: 'Suitable for most copper alloys; prevents contamination.'
    },
  
    // MIG Welding - Nickel Alloys
    {
      process: 'MIG Welding',
      material: 'Nickel Alloys',
      thicknessRange: 'Any',
      recommendedGas: 'Argon with 2% CO₂',
      productId: '104', // Replace with your actual product ID
      notes: 'Minimizes oxidation and maintains alloy integrity.'
    },
  
    // TIG Welding - Titanium
    {
      process: 'TIG Welding',
      material: 'Titanium',
      thicknessRange: 'Any',
      recommendedGas: 'High-Purity Argon',
      productId: '111', // Replace with your actual product ID
      notes: 'Prevents contamination; use with proper shielding techniques.'
    },
  
    // MIG Welding - High Strength Steels
    {
      process: 'MIG Welding',
      material: 'High Strength Steel',
      thicknessRange: 'Any',
      recommendedGas: 'Argon with 8-10% CO₂',
      productId: '112', // Replace with your actual product ID
      notes: 'Balances arc stability and mechanical properties.'
    },
  
    // General Recommendations for Gases Not Sold
    {
      process: 'MIG Welding',
      material: 'Specialty Alloys',
      thicknessRange: 'Any',
      recommendedGas: 'Consult Manufacturer',
      notes: 'Specific gas mixtures may be required; please contact us for assistance.'
    },
  ];
  
  