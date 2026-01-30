'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function BudgetSection() {
  // Mock data - показываем для демонстрации
  const products = mockProducts.filter(p => p.price < 50000)
  
  // Дублируем для заполнения
  const displayProducts = [...products, ...products, ...products]

  return (
    <ProductSection
      title="Дешевле 50,000 ₸"
      subtitle="Доступные цены на качественные товары"
      viewAllLink="/catalog?max_price=50000"
      products={displayProducts}
      backgroundColor="bg-white"
    />
  )
}

