'use client'

import { useEffect, useState } from 'react'
import ProductSection from './ProductSection'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'

export default function LaptopsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.getAll({ category__slug: 'laptops', page_size: 12 })
      .then(r => setProducts(r.data?.results || r.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <ProductSection
      title="Ноутбуки для работы и игр"
      subtitle="Мощные ноутбуки для любых задач"
      viewAllLink="/catalog/laptops"
      products={products}
      loading={loading}
      backgroundColor="bg-gray-50"
    />
  )
}
