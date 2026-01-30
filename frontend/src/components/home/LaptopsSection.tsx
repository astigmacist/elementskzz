'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function LaptopsSection() {
  // Mock data - показываем для демонстрации
  const products = mockProducts.filter(p => p.category_name === 'Ноутбуки' || p.id === 1)
  
  // Дублируем для заполнения
  const displayProducts = [...products, ...products, ...products, ...products]

  return (
    <ProductSection
      title="Ноутбуки для работы и игр"
      subtitle="Мощные ноутбуки для любых задач"
      viewAllLink="/catalog/laptops"
      products={displayProducts}
      backgroundColor="bg-gray-50"
    />
  )
}

