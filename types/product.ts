export interface Product {
  ID: string;
  Title: string;
  Slug: string;
  ProductCategories: string[];
  Content: string;
  ImageURL: string;
  GasMixPercentage?: string;
  VolumeLiters?: string;
  PressureBar?: string;
  RentFree?: boolean;
  Supplier?: string;
  specifications: {
    'Gas Type': string;
    'Cylinder Size': string;
  };
  categories: string[];
} 