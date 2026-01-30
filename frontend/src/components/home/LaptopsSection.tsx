'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function LaptopsSection() {
  // Mock data - показываем ноутбуки
  const products = mockProducts.filter(p => p.category_name === 'Ноутбуки')

  return (
    <ProductSection
      title="Ноутбуки для работы и игр"
      subtitle="Мощные ноутбуки для любых задач"
      viewAllLink="/catalog/laptops"
      products={products}
      backgroundColor="bg-gray-50"
    />
  )
}

