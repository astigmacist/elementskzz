'use client'

import ProductSection from './ProductSection'
import { mockProducts } from '@/lib/mockData'

export default function AccessoriesSection() {
  // Mock data - показываем аксессуары
  const products = mockProducts.filter(p => p.category_name === 'Аксессуары')

  return (
    <ProductSection
      title="Аксессуары"
      subtitle="Мышки, клавиатуры, наушники и многое другое"
      viewAllLink="/catalog/accessories"
      products={products}
      backgroundColor="bg-gradient-to-r from-blue-50 to-purple-50"
    />
  )
}

