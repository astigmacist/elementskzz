'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function Deals() {
  // Mock data - показываем для демонстрации
  const products = mockProducts.filter(p => p.discount_percentage > 0)
  
  // Дублируем для заполнения
  const displayProducts = [...products, ...products, ...products]

  return (
    <ProductSection
      title="🔥 Лучшие предложения"
      subtitle="Акции и скидки на популярные товары"
      viewAllLink="/deals"
      products={displayProducts}
      backgroundColor="bg-gradient-to-r from-red-50 to-orange-50"
    />
  )
}

