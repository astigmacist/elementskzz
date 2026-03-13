'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { FiHeart, FiShoppingCart, FiStar, FiEye, FiBarChart2 } from 'react-icons/fi'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product.id)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  // Kaspi Red installment: price / 24 months
  const kaspiMonthly = Math.ceil(product.price / 24)

  if (viewMode === 'list') {
    return (
      <Link
        href={`/product/${product.slug}`}
        className="card p-4 flex gap-5 group"
      >
        {/* Image */}
        <div className="relative w-36 h-36 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden">
          <Image
            src={!imageError && product.main_image ? product.main_image : '/placeholder.png'}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          {product.discount_percentage > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount_percentage}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex gap-2 mb-1">
              {product.is_new && (
                <span className="badge-new">Новинка</span>
              )}
              {product.is_featured && (
                <span className="badge bg-blue-100 text-blue-800">🔥 Хит</span>
              )}
            </div>
            <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <FiStar className="text-yellow-500 fill-current w-3.5 h-3.5" />
              <span>{Number(product.rating || 0).toFixed(1)}</span>
              <span>({product.reviews_count} отзывов)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-end gap-2">
                {product.old_price && (
                  <span className="text-sm text-gray-400 line-through">
                    {Number(product.old_price).toLocaleString('ru-KZ')} ₸
                  </span>
                )}
                <span className="text-xl font-bold text-primary-600">
                  {Number(product.price).toLocaleString('ru-KZ')} ₸
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Рассрочка от {kaspiMonthly.toLocaleString('ru-KZ')} ₸/мес × 24
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-lg border transition-colors ${inWishlist
                  ? 'border-red-200 text-red-500 bg-red-50'
                  : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500'
                  }`}
              >
                <FiHeart className={inWishlist ? 'fill-current' : ''} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!product.is_available}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${product.is_available
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <FiShoppingCart className="w-4 h-4" />
                {product.is_available ? 'В корзину' : 'Нет в наличии'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid mode
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card p-4 group relative flex flex-col"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        {product.discount_percentage > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount_percentage}%
          </span>
        )}
        {product.is_new && (
          <span className="badge-new">Новинка</span>
        )}
        {product.is_featured && (
          <span className="badge bg-orange-100 text-orange-700">🔥 Хит</span>
        )}
      </div>

      {/* Wishlist button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-all ${inWishlist ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
          }`}
      >
        <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
      </button>

      {/* Image */}
      <div className="relative h-48 mb-3 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={!imageError && product.main_image ? product.main_image : '/placeholder.png'}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Product info */}
      <div className="flex flex-col flex-1 space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <FiStar className="text-yellow-400 fill-current w-3.5 h-3.5" />
          <span className="font-medium text-gray-700">{Number(product.rating || 0).toFixed(1)}</span>
          <span>({product.reviews_count})</span>
        </div>

        {/* Stock status */}
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${product.is_available ? 'bg-green-500' : 'bg-red-400'}`}
          />
          <span className="text-xs text-gray-500">
            {product.is_available ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto space-y-1">
          <div className="flex items-end gap-2">
            {product.old_price && (
              <span className="text-xs text-gray-400 line-through">
                {Number(product.old_price).toLocaleString('ru-KZ')} ₸
              </span>
            )}
            <span className="text-lg font-bold text-primary-600">
              {Number(product.price).toLocaleString('ru-KZ')} ₸
            </span>
          </div>

          {/* Kaspi Red installment */}
          <p className="text-xs text-gray-400">
            от {kaspiMonthly.toLocaleString('ru-KZ')} ₸/мес × 24
          </p>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.is_available}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-colors mt-2 ${product.is_available
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          <FiShoppingCart className="w-4 h-4" />
          {product.is_available ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </Link>
  )
}
