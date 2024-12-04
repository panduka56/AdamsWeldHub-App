export interface Product {
  ID: string;
  Title: string;
  Content: string;
  ImageURL: string;
  ProductCategories: string;
  Slug: string;
  categories: string[];
  GasMixPercentage: string;
  VolumeLiters: string;
  PressureBar: string;
  specifications: {
    'Gas Type': string;
    'Cylinder Size': string;
    [key: string]: string;
  };
} 