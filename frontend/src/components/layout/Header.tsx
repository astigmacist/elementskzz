'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiBarChart2 } from 'react-icons/fi'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useWishlistStore } from '@/store/useWishlistStore'

export default function Header() {
  const { cart, fetchCart } = useCartStore()
  const { user, isAuthenticated, fetchProfile, logout } = useAuthStore()
  const { wishlist, fetchWishlist } = useWishlistStore()

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
      fetchWishlist()
    }
  }, [isAuthenticated])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <p>Бесплатная доставка при заказе от 50,000 ₸</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">О нас</Link>
            <Link href="/contact" className="hover:underline">Контакты</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Elements KZ" 
              width={50} 
              height={50}
              priority
              className="object-contain"
            />
            <span className="text-2xl font-bold">
              <span className="text-primary-600">Elements</span>
              <span className="text-gray-900">.KZ</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700">
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {/* Compare */}
            <Link href="/compare" className="relative hover:text-primary-600 transition-colors" title="Сравнение">
              <FiBarChart2 className="w-6 h-6" />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative hover:text-primary-600 transition-colors" title="Избранное">
              <FiHeart className="w-6 h-6" />
              {wishlist && wishlist.products.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.products.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative hover:text-primary-600 transition-colors" title="Корзина">
              <FiShoppingCart className="w-6 h-6" />
              {cart && cart.total_items > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.total_items}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                  <FiUser className="w-6 h-6" />
                  <span className="text-sm">{user?.first_name || user?.email}</span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Профиль
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
                    Мои заказы
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                <FiUser className="w-6 h-6" />
                <span className="text-sm">Войти</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
