export interface Product {
  ID: string;
  Title: string;
  Slug: string;
  Content?: string;
  'Image URL'?: string;
  imageUrl?: string;
  VolumeLiters?: string;
  PressureBar?: string;
  GasMixPercentage?: string;
  ProductCategories: string[];
  categories: string[];
  specifications: {
    'Gas Type'?: string;
    'Cylinder Size'?: string;
    'Welding'?: string;
    'Cutting'?: string;
    'Heating'?: string;
    'Brazing'?: string;
    [key: string]: string | undefined;
  };
} 