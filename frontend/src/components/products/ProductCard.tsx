'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)
  const [showQuickView, setShowQuickView] = useState(false)

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

  return (
    <Link 
      href={`/product/${product.slug}`} 
      className="card p-4 group relative"
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
    >
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {product.is_featured && <span className="badge bg-blue-100 text-blue-800">🔥 Хит</span>}
        {product.is_new && <span className="badge-new">Новинка</span>}
        {product.discount_percentage > 0 && (
          <span className="badge-sale">-{product.discount_percentage}%</span>
        )}
        {!product.is_available && <span className="badge bg-gray-100 text-gray-800">Нет в наличии</span>}
      </div>

      {/* Wishlist button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-6 right-6 z-10 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform ${
          inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
      >
        <FiHeart className={inWishlist ? 'fill-current' : ''} />
      </button>

      {/* Image */}
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.main_image || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick View Button */}
        {showQuickView && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.preventDefault()
                // Quick view modal will be implemented later
                window.location.href = `/product/${product.slug}`
              }}
              className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-600 hover:text-white transition-colors flex items-center gap-2"
            >
              <FiEye className="w-5 h-5" />
              Быстрый просмотр
            </button>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <FiStar className="text-yellow-500 fill-current w-4 h-4" />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-gray-500">({product.reviews_count})</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          {product.old_price && (
            <span className="text-sm text-gray-400 line-through">
              {product.old_price.toLocaleString('ru-KZ')} ₸
            </span>
          )}
          <span className="text-lg font-bold text-primary-600">
            {product.price.toLocaleString('ru-KZ')} ₸
          </span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.is_available}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors ${
            product.is_available
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FiShoppingCart />
          {product.is_available ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </Link>
  )
}

