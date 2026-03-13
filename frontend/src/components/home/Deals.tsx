'use client'

import { useEffect, useState } from 'react'
import ProductSection from './ProductSection'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'

export default function Deals() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.getDeals()
      .then(r => setProducts(r.data?.results || r.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <ProductSection
      title="🔥 Лучшие предложения"
      subtitle="Акции и скидки на популярные товары"
      viewAllLink="/catalog?sale=true"
      products={products}
      loading={loading}
      backgroundColor="bg-gradient-to-r from-red-50 to-orange-50"
    />
  )
}
