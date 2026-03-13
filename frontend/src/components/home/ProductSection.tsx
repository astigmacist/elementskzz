'use client'

import { useEffect, useState, useRef } from 'react'
import { Product } from '@/types'
import ProductCard from '@/components/products/ProductCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface ProductSectionProps {
  title: string
  subtitle?: string
  apiEndpoint?: string
  products?: Product[]
  viewAllLink?: string
  backgroundColor?: string
  loading?: boolean
}

export default function ProductSection({
  title,
  subtitle,
  apiEndpoint,
  products: initialProducts,
  viewAllLink,
  backgroundColor = 'bg-white',
  loading: externalLoading,
}: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [internalLoading, setInternalLoading] = useState(!initialProducts && !!apiEndpoint)
  const loading = externalLoading ?? internalLoading
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts)
    }
  }, [initialProducts])

  useEffect(() => {
    if (apiEndpoint) {
      const fetchProducts = async () => {
        try {
          setInternalLoading(true)
          const { default: axios } = await import('axios')
          const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
          const response = await axios.get(`${baseURL}${apiEndpoint}`)
          const data = response.data
          setProducts(data.results || data || [])
        } catch (error) {
          console.error('Error fetching products:', error)
          setProducts([])
        } finally {
          setInternalLoading(false)
        }
      }
      fetchProducts()
    }
  }, [apiEndpoint])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }

  if (loading) {
    return (
      <section className={`${backgroundColor} py-12`}>
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className={`${backgroundColor} py-12`}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Смотреть все
              <FiChevronRight className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Products Carousel */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 -ml-5"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* Products Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <div key={`${product.id}-${index}`} className="flex-shrink-0 w-[240px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 -mr-5"
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

