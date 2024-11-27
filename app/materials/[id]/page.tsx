import { notFound } from 'next/navigation'
import { materials, Material } from '../../data/materials'
import MaterialLayout from '../../components/layouts/MaterialLayout'

export async function generateStaticParams() {
  return materials.map((material: Material) => ({
    id: material.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const material = materials.find((m: Material) => m.id === params.id)
  if (!material) return {}

  return {
    title: `${material.name} - AdamsGas Materials Guide`,
    description: material.description,
  }
}

export default function MaterialPage({ params }: { params: { id: string } }) {
  const material = materials.find((m: Material) => m.id === params.id)
  if (!material) notFound()

  return <MaterialLayout material={material} />
} 