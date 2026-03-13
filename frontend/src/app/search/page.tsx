'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'
import ProductCard from '@/components/products/ProductCard'
import { FiSearch } from 'react-icons/fi'

function SearchResults() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (!query.trim()) return
        setLoading(true)
        productsApi.getAll({ search: query, page_size: 24 })
            .then((r) => {
                const data = r.data
                setProducts(data.results || data || [])
                setTotal(data.count || (data.results || data)?.length || 0)
            })
            .catch(() => setProducts([]))
            .finally(() => setLoading(false))
    }, [query])

    if (!query) {
        return (
            <div className="text-center py-16">
                <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Введите запрос для поиска</h2>
                <p className="text-gray-500">Поиск по названию, бренду или описанию товара</p>
            </div>
        )
    }

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Поиск: <span className="text-primary-600">«{query}»</span>
                </h1>
                {!loading && (
                    <p className="text-sm text-gray-500 mt-1">
                        {total > 0 ? `Найдено ${total} товаров` : 'Ничего не найдено'}
                    </p>
                )}
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                            <div className="bg-gray-200 h-48 rounded-lg mb-3" />
                            <div className="bg-gray-200 h-4 rounded mb-2" />
                            <div className="bg-gray-200 h-4 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-xl font-bold mb-2">По запросу «{query}» ничего не найдено</h2>
                    <p className="text-gray-500 mb-6">Попробуйте другое слово или просмотрите каталог</p>
                    <Link href="/" className="btn-primary">
                        В каталог
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </>
    )
}

export default function SearchPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <Suspense fallback={<div className="animate-pulse h-8 w-48 bg-gray-200 rounded mb-6" />}>
                    <SearchResults />
                </Suspense>
            </div>
        </div>
    )
}
