export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  categories: string[];
  specifications: {
    'Gas Type': string;
    'Cylinder Size': string;
    'Refundable Deposit': string;
    'Output'?: string;
    [key: string]: string | undefined;
  };
  keyFeatures: string[];
  usesAndApplications: string;
}

export interface GasSettings {
  oxygenFlow: string;
  fuelGasFlow: string;
  notes?: string;
}

export interface GasChartEntry {
  gasMixture: string;
  metalType: string;
  materialThickness: string;
  process: string[];
  settings: GasSettings;
}

export interface OxyFuelChart {
  entries: GasChartEntry[];
  materialRecommendations: {
    welding: Record<string, GasSettings & { thickness: string; gasMixture: string }>;
    cutting: Record<string, GasSettings & { thickness: string; gasMixtures: string[] }>;
    heating: Record<string, GasSettings & { gasMixtures: string[] }>;
    brazing: Record<string, GasSettings & { thickness: string; gasMixtures: string[] }>;
  };
  gasComparisons: Array<{
    gas: string;
    welding: boolean;
    cutting: boolean;
    heating: boolean;
    brazing: boolean;
    advantages: string;
    limitations: string;
  }>;
} 