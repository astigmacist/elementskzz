'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function AccessoriesSection() {
  // Mock data - показываем для демонстрации
  const products = mockProducts.filter(p => p.category_name === 'Аксессуары')
  
  // Дублируем для заполнения
  const displayProducts = [...products, ...products, ...products]

  return (
    <ProductSection
      title="Аксессуары"
      subtitle="Мышки, клавиатуры, наушники и многое другое"
      viewAllLink="/catalog/accessories"
      products={displayProducts}
      backgroundColor="bg-gradient-to-r from-blue-50 to-purple-50"
    />
  )
}

