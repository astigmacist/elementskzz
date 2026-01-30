'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function SmartphonesSection() {
  // Mock data - показываем смартфоны
  const products = mockProducts.filter(p => p.category_name === 'Смартфоны')

  return (
    <ProductSection
      title="Смартфоны и телефоны"
      subtitle="Последние модели от ведущих производителей"
      viewAllLink="/catalog/smartphones"
      products={products}
      backgroundColor="bg-white"
    />
  )
}

