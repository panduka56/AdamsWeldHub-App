export type WeldingProcess = 'MIG' | 'TIG' | 'Flux-Cored' | 'Oxy-Fuel'

export type MaterialType = 
  | 'Mild-Steel' 
  | 'Stainless-Steel' 
  | 'Aluminum' 
  | 'Copper' 
  | 'Cast-Iron' 
  | 'Nickel-Alloys' 
  | 'Titanium'

export interface WeldingParameters {
  process: WeldingProcess
  material: MaterialType
  thickness: number
} 