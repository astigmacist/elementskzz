'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function NewArrivals() {
  // Mock data - показываем для демонстрации
  const products = mockProducts.filter(p => p.is_new)
  
  // Дублируем для заполнения
  const displayProducts = [...products, ...products, ...products, ...products]

  return (
    <ProductSection
      title="🆕 Новинки"
      subtitle="Только что поступили в продажу"
      viewAllLink="/catalog?new=true"
      products={displayProducts}
      backgroundColor="bg-white"
    />
  )
}
