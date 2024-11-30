export interface Product {
  id: string;
  name: string;
  description: string;
  specifications: {
    'Gas Type': string;
    'Cylinder Size': string;
    'Pressure/Content': string;
    'Cylinder Dimensions': string;
    'Cylinder Weight': string;
    'Output': string;
    'Refundable Deposit': string;
  };
  keyFeatures: string[];
  usesAndApplications: string;
  imageUrl: string;
  categories: string[];
  slug: string;
} 