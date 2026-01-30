'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function FeaturedProducts() {
  // Mock data - показываем популярные товары
  const products = mockProducts.filter(p => p.is_featured)

  return (
    <ProductSection
      title="⭐ Популярные товары"
      subtitle="Самые востребованные товары"
      viewAllLink="/catalog?featured=true"
      products={products}
      backgroundColor="bg-white"
    />
  )
}
