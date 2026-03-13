'use client'

import { useEffect, useState } from 'react'
import ProductSection from './ProductSection'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.getNewArrivals()
      .then(r => setProducts(r.data?.results || r.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <ProductSection
      title="🆕 Новинки"
      subtitle="Самые свежие поступления"
      viewAllLink="/catalog?new=true"
      products={products}
      loading={loading}
      backgroundColor="bg-white"
    />
  )
}
