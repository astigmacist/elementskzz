'use client'

import { useEffect, useState } from 'react'
import ProductSection from './ProductSection'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'

export default function SmartphonesSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.getAll({ category__slug: 'smartphones', page_size: 12 })
      .then(r => setProducts(r.data?.results || r.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <ProductSection
      title="Смартфоны и телефоны"
      subtitle="Последние модели от ведущих производителей"
      viewAllLink="/catalog/smartphones"
      products={products}
      loading={loading}
      backgroundColor="bg-white"
    />
  )
}
