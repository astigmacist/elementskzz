'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiBarChart2, FiBriefcase } from 'react-icons/fi'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useWishlistStore } from '@/store/useWishlistStore'

export default function Header() {
  const { cart, fetchCart } = useCartStore()
  const { user, isAuthenticated, fetchProfile, logout } = useAuthStore()
  const { wishlist, fetchWishlist } = useWishlistStore()
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
      fetchWishlist()
    }
  }, [isAuthenticated])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <p>Бесплатная доставка при заказе от 50,000 ₸</p>
          <div className="flex items-center gap-4">
            <Link href="/b2b" className="hover:underline flex items-center gap-1 font-medium">
              <FiBriefcase className="w-3.5 h-3.5" />
              Юридическим лицам
            </Link>
            <span className="text-primary-300">|</span>
            <Link href="/about" className="hover:underline">О нас</Link>
            <Link href="/contact" className="hover:underline">Контакты</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Elements KZ"
              width={50}
              height={50}
              priority
              className="object-contain"
            />
            <span className="text-2xl font-bold hidden sm:block">
              <span className="text-primary-600">Elements</span>
              <span className="text-gray-900">.KZ</span>
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск товаров..."
                className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                <FiSearch className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Compare */}
            <Link href="/compare" className="relative hover:text-primary-600 transition-colors hidden md:block" title="Сравнение">
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
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {user?.first_name?.[0] || user?.email[0].toUpperCase()}
                  </div>
                  <span className="text-sm hidden lg:block">{user?.first_name || user?.email}</span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <Link href="/profile" className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
                    Профиль
                  </Link>
                  <Link href="/orders" className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
                    Мои заказы
                  </Link>
                  <Link href="/wishlist" className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors">
                    Избранное
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 text-red-600 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
                <FiUser className="w-6 h-6" />
                <span className="text-sm hidden lg:block">Войти</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
