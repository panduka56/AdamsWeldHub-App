import { Product } from '@/types/product'
import path from 'path'
import { promises as fs } from 'fs'

export async function parseProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(fileContent) as Product[]
}

export const parseCSVProducts = async (): Promise<Product[]> => {
  return parseProducts()
} 