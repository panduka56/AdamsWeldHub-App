import { Material } from '../../data/materials'

interface MaterialLayoutProps {
  material: Material
}

export default function MaterialLayout({ material }: MaterialLayoutProps) {
  return (
    <div>
      <h1>{material.name}</h1>
      <p>{material.description}</p>
      {/* Add more material details layout here */}
    </div>
  )
} 