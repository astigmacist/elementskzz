'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function Deals() {
  // Mock data - показываем только товары со скидкой
  const products = mockProducts.filter(p => p.discount_percentage > 0)

  return (
    <ProductSection
      title="🔥 Лучшие предложения"
      subtitle="Акции и скидки на популярные товары"
      viewAllLink="/deals"
      products={products}
      backgroundColor="bg-gradient-to-r from-red-50 to-orange-50"
    />
  )
}

