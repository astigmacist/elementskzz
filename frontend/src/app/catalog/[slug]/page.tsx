'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Product, PaginatedResponse } from '@/types'
import ProductCard from '@/components/products/ProductCard'
import { productsApi } from '@/lib/api'
import {
  FiChevronDown,
  FiGrid,
  FiList,
  FiSliders,
  FiChevronRight,
  FiX,
} from 'react-icons/fi'

const SORT_OPTIONS = [
  { value: '-created_at', label: 'Новинки' },
  { value: 'price', label: 'Цена: по возрастанию' },
  { value: '-price', label: 'Цена: по убыванию' },
  { value: '-rating', label: 'По рейтингу' },
  { value: '-views_count', label: 'По популярности' },
]

const CATALOG_NAMES: Record<string, string> = {
  laptops: 'Ноутбуки',
  computers: 'Компьютеры',
  monitors: 'Мониторы',
  printers: 'Принтеры',
  keyboards: 'Клавиатуры',
  mice: 'Мышки',
  ram: 'Оперативная память',
  ssd: 'SSD накопители',
  hdd: 'HDD диски',
  accessories: 'Аксессуары',
  headphones: 'Наушники',
  routers: 'Роутеры',
  tablets: 'Планшеты',
  smartphones: 'Смартфоны',
  'gaming-laptops': 'Игровые ноутбуки',
  'gaming-computers': 'Игровые компьютеры',
  speakers: 'Колонки',
  webcams: 'Веб-камеры',
  'external-hdd': 'Внешние HDD',
  'external-ssd': 'Внешние SSD',
  'usb-flash': 'USB флешки',
}

export default function CatalogPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = params.slug as string

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Filter states
  const [priceFrom, setPriceFrom] = useState(searchParams.get('price_from') || '')
  const [priceTo, setPriceTo] = useState(searchParams.get('price_to') || '')
  const [inStock, setInStock] = useState(searchParams.get('in_stock') === 'true')
  const [onSale, setOnSale] = useState(searchParams.get('on_sale') === 'true')
  const [sort, setSort] = useState(searchParams.get('ordering') || '-created_at')
  const [page, setPage] = useState(Number(searchParams.get('page') || 1))

  const categoryName = CATALOG_NAMES[slug] || slug

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params: any = {
        category__slug: slug,
        ordering: sort,
        page,
      }
      if (priceFrom) params.price_min = priceFrom
      if (priceTo) params.price_max = priceTo
      if (inStock) params.is_available = true
      if (onSale) params.discount_percentage__gt = 0

      const response = await productsApi.getAll(params)
      const data: PaginatedResponse<Product> = response.data
      setProducts(data.results || [])
      setTotal(data.count || 0)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [slug, sort, page, priceFrom, priceTo, inStock, onSale])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const applyFilters = () => {
    setPage(1)
    fetchProducts()
    setShowMobileFilters(false)
  }

  const clearFilters = () => {
    setPriceFrom('')
    setPriceTo('')
    setInStock(false)
    setOnSale(false)
    setPage(1)
  }

  const totalPages = Math.ceil(total / 20)

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Цена (₸)</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="от"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
          <input
            type="number"
            placeholder="до"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        {/* Quick price buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          {[50000, 100000, 200000, 500000].map((price) => (
            <button
              key={price}
              onClick={() => setPriceTo(String(price))}
              className="text-xs border border-gray-200 rounded px-2 py-1 hover:border-primary-500 hover:text-primary-600 transition-colors"
            >
              до {(price / 1000).toFixed(0)}k ₸
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Наличие</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded"
          />
          <span className="text-sm text-gray-700">Только в наличии</span>
        </label>
      </div>

      {/* Promotions */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Акции</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) => setOnSale(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded"
          />
          <span className="text-sm text-gray-700">Товары со скидкой</span>
        </label>
      </div>

      <button onClick={applyFilters} className="btn-primary w-full">
        Применить
      </button>
      <button
        onClick={clearFilters}
        className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Главная
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <Link href="/catalog" className="hover:text-primary-600 transition-colors">
            Каталог
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{categoryName}</span>
        </nav>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Фильтры</h2>
                <FiSliders className="w-4 h-4 text-gray-500" />
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header: Title + Sort + View */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
                {!loading && (
                  <p className="text-sm text-gray-500 mt-1">
                    {total > 0 ? `${total} товаров` : 'Товары не найдены'}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filters Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm hover:border-primary-500 transition-colors"
                >
                  <FiSliders className="w-4 h-4" />
                  Фильтры
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm bg-white cursor-pointer hover:border-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                    : 'flex flex-col gap-4'
                }
              >
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4" />
                    <div className="bg-gray-200 h-4 rounded mb-2" />
                    <div className="bg-gray-200 h-4 rounded w-2/3 mb-2" />
                    <div className="bg-gray-200 h-8 rounded" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl p-16 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Товары не найдены</h3>
                <p className="text-gray-500 mb-6">
                  Попробуйте изменить фильтры или поищите в другой категории
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                      : 'flex flex-col gap-4'
                  }
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40 hover:border-primary-500 transition-colors"
                    >
                      ← Назад
                    </button>
                    {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                      const p = i + 1
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            page === p
                              ? 'bg-primary-600 text-white'
                              : 'border border-gray-300 hover:border-primary-500'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    })}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40 hover:border-primary-500 transition-colors"
                    >
                      Вперёд →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Фильтры</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  )
}
