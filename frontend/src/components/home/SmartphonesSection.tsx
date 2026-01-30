'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function SmartphonesSection() {
  // Mock data - показываем для демонстрации
  const products = mockProducts.filter(p => p.category_name === 'Смартфоны' || p.id === 2)
  
  // Дублируем для заполнения
  const displayProducts = [...products, ...products, ...products, ...products]

  return (
    <ProductSection
      title="Смартфоны и телефоны"
      subtitle="Последние модели от ведущих производителей"
      viewAllLink="/catalog/smartphones"
      products={displayProducts}
      backgroundColor="bg-white"
    />
  )
}

