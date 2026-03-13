'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function WishlistPage() {
    const { wishlist, fetchWishlist, removeFromWishlist, loading } = useWishlistStore()
    const { addToCart } = useCartStore()
    const { isAuthenticated } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }
        fetchWishlist()
    }, [isAuthenticated])

    if (!isAuthenticated) return null

    const products = wishlist?.products || []

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        Избранное{' '}
                        <span className="text-gray-400 font-normal text-lg">({products.length})</span>
                    </h1>
                    <Link href="/profile" className="text-sm text-primary-600 hover:underline">
                        Личный кабинет
                    </Link>
                </div>

                {loading && !wishlist ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                                <div className="bg-gray-200 h-48 rounded-lg mb-3" />
                                <div className="bg-gray-200 h-4 rounded mb-2" />
                                <div className="bg-gray-200 h-4 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                        <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">Избранное пусто</h2>
                        <p className="text-gray-500 mb-6">
                            Добавляйте товары в избранное, чтобы не потерять их
                        </p>
                        <Link href="/" className="btn-primary">
                            Перейти в каталог
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {products.map((product) => {
                            const kaspiMonthly = Math.ceil(Number(product.price) / 24)
                            return (
                                <div key={product.id} className="card p-4 flex flex-col group">
                                    <Link href={`/product/${product.slug}`} className="block flex-1">
                                        <div className="relative h-44 mb-3 rounded-lg bg-gray-50 overflow-hidden">
                                            <Image
                                                src={product.main_image || '/placeholder.png'}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-105 transition-transform"
                                            />
                                            {product.discount_percentage > 0 && (
                                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                                    -{product.discount_percentage}%
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto">
                                            <p className="font-bold text-primary-600">
                                                {Number(product.price).toLocaleString('ru-KZ')} ₸
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                от {kaspiMonthly.toLocaleString('ru-KZ')} ₸/мес × 24
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => addToCart(product.id)}
                                            disabled={!product.is_available}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${product.is_available
                                                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            <FiShoppingCart className="w-3.5 h-3.5" />
                                            В корзину
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 transition-colors"
                                        >
                                            <FiTrash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
