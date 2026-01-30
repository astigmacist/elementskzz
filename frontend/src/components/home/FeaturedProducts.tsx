'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function FeaturedProducts() {
  // Mock data - показываем для демонстрации
  const products = mockProducts.filter(p => p.is_featured)
  
  // Дублируем для заполнения
  const displayProducts = [...products, ...products, ...products]

  return (
    <ProductSection
      title="⭐ Популярные товары"
      subtitle="Самые востребованные товары"
      viewAllLink="/catalog?featured=true"
      products={displayProducts}
      backgroundColor="bg-white"
    />
  )
}
