export interface Material {
  id: string;
  name: string;
  description: string;
  // Add other material properties as needed
}

export const materials: Material[] = [
  {
    id: 'steel',
    name: 'Steel',
    description: 'Common carbon steel materials used in welding',
  },
  // Add other materials as needed
]; 