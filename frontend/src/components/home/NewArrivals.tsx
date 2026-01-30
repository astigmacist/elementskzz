'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function NewArrivals() {
  // Mock data - показываем новинки
  const products = mockProducts.filter(p => p.is_new)

  return (
    <ProductSection
      title="🆕 Новинки"
      subtitle="Только что поступили в продажу"
      viewAllLink="/catalog?new=true"
      products={products}
      backgroundColor="bg-white"
    />
  )
}
