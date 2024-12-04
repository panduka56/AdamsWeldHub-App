export interface Note {
  id: string;
  content: string;
  timestamp: string;
  title: string;
  header?: string;
}

export interface TroubleshootingIssue {
  id: string;
  title: string;
  category: string;
  description: string;
  causes: string[];
  solutions: string[];
  equipment: string[];
}

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: string[];
  procedures: {
    title: string;
    steps: string[];
  }[];
  warnings: string[];
  equipment: string[];
}

export interface GasCalculation {
  flowRate: number;
  duration: number;
  totalConsumption: number;
}

export interface BulkSavings {
  regularPrice: number;
  bulkPrice: number;
  quantity: number;
  totalSavings: number;
}
