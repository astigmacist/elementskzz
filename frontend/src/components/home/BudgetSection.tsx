'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function BudgetSection() {
  // Mock data - показываем товары дешевле 50,000₸
  const products = mockProducts.filter(p => p.price < 50000)

  return (
    <ProductSection
      title="Дешевле 50,000 ₸"
      subtitle="Доступные цены на качественные товары"
      viewAllLink="/catalog?max_price=50000"
      products={products}
      backgroundColor="bg-white"
    />
  )
}

