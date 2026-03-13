'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiArrowRight } from 'react-icons/fi'

export default function CartPage() {
    const { cart, fetchCart, updateQuantity, removeFromCart, clearCart, loading } = useCartStore()
    const { isAuthenticated } = useAuthStore()

    useEffect(() => {
        if (isAuthenticated) fetchCart()
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return (
            <div className="container-custom py-16 text-center">
                <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Войдите в аккаунт</h1>
                <p className="text-gray-500 mb-6">Чтобы увидеть корзину, войдите в аккаунт</p>
                <Link href="/login" className="btn-primary">
                    Войти
                </Link>
            </div>
        )
    }

    if (loading && !cart) {
        return (
            <div className="container-custom py-8">
                <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 flex gap-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                                <div className="h-4 bg-gray-200 rounded w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container-custom py-16 text-center">
                <div className="text-7xl mb-4">🛒</div>
                <h1 className="text-2xl font-bold mb-2">Корзина пуста</h1>
                <p className="text-gray-500 mb-6">Добавьте товары из каталога</p>
                <Link href="/" className="btn-primary">
                    Перейти в каталог
                </Link>
            </div>
        )
    }

    const freeDeliveryThreshold = 50000
    const remaining = Math.max(0, freeDeliveryThreshold - cart.total_price)

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        Корзина{' '}
                        <span className="text-gray-400 font-normal text-lg">({cart.total_items} товара)</span>
                    </h1>
                    <button
                        onClick={clearCart}
                        className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                    >
                        <FiTrash2 className="w-4 h-4" />
                        Очистить
                    </button>
                </div>

                {/* Free Delivery Banner */}
                {remaining > 0 && (
                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6 text-sm text-primary-700">
                        До бесплатной доставки{' '}
                        <strong>{remaining.toLocaleString('ru-KZ')} ₸</strong>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-3">
                        {cart.items.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm">
                                <Link href={`/product/${item.product.slug}`} className="flex-shrink-0">
                                    <div className="relative w-20 h-20 rounded-lg bg-gray-100 overflow-hidden">
                                        <Image
                                            src={item.product.main_image || '/placeholder.png'}
                                            alt={item.product.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                </Link>

                                <div className="flex-1 min-w-0">
                                    <Link
                                        href={`/product/${item.product.slug}`}
                                        className="font-medium text-sm text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 block"
                                    >
                                        {item.product.name}
                                    </Link>
                                    <p className="text-xs text-gray-400 mt-0.5">Арт. {item.product.sku}</p>

                                    <div className="flex items-center justify-between mt-3">
                                        {/* Quantity */}
                                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() =>
                                                    item.quantity > 1
                                                        ? updateQuantity(item.id, item.quantity - 1)
                                                        : removeFromCart(item.id)
                                                }
                                                className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                                            >
                                                <FiMinus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="px-3 py-1.5 text-sm font-medium min-w-[2rem] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1.5 hover:bg-gray-100 transition-colors"
                                            >
                                                <FiPlus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            <p className="font-bold text-primary-600">
                                                {Number(item.total_price).toLocaleString('ru-KZ')} ₸
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-xs text-gray-400">
                                                    {Number(item.product.price).toLocaleString('ru-KZ')} ₸ × {item.quantity}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
                            <h2 className="font-bold text-lg mb-4">Итого</h2>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Товары ({cart.total_items} шт.)
                                    </span>
                                    <span>{Number(cart.total_price).toLocaleString('ru-KZ')} ₸</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Доставка</span>
                                    <span className={remaining === 0 ? 'text-green-600 font-medium' : ''}>
                                        {remaining === 0 ? 'Бесплатно' : 'По тарифу'}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-5">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Итого:</span>
                                    <span className="text-primary-600">
                                        {Number(cart.total_price).toLocaleString('ru-KZ')} ₸
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    Рассрочка от {Math.ceil(Number(cart.total_price) / 24).toLocaleString('ru-KZ')}{' '}
                                    ₸/мес × 24
                                </p>
                            </div>

                            <Link
                                href="/checkout"
                                className="btn-primary w-full flex items-center justify-center gap-2 text-center"
                            >
                                Оформить заказ
                                <FiArrowRight className="w-5 h-5" />
                            </Link>

                            <div className="mt-4 space-y-2">
                                {['Kaspi Pay', 'Kaspi Red (рассрочка 0-0-24)', 'Банковская карта', 'Наличными'].map(
                                    (method) => (
                                        <div key={method} className="flex items-center gap-2 text-xs text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            {method}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
