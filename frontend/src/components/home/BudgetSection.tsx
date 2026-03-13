'use client'

import { useEffect, useState } from 'react'
import ProductSection from './ProductSection'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'

export default function BudgetSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.getAll({ price_max: 50000, ordering: 'price', page_size: 12 })
      .then(r => setProducts(r.data?.results || r.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <ProductSection
      title="💰 Дешевле 50 000 ₸"
      subtitle="Качественные товары по доступным ценам"
      viewAllLink="/catalog?price_max=50000"
      products={products}
      loading={loading}
      backgroundColor="bg-primary-50"
    />
  )
}
