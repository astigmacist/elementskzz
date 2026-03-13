'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { ordersApi } from '@/lib/api'
import { Order } from '@/types'
import { useRouter } from 'next/navigation'
import {
    FiPackage,
    FiChevronRight,
    FiClock,
    FiTruck,
    FiCheck,
    FiX,
} from 'react-icons/fi'

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: 'Ожидает', color: 'bg-yellow-100 text-yellow-800', icon: FiClock },
    confirmed: { label: 'Подтверждён', color: 'bg-blue-100 text-blue-800', icon: FiCheck },
    processing: { label: 'В обработке', color: 'bg-purple-100 text-purple-800', icon: FiPackage },
    shipped: { label: 'Отправлен', color: 'bg-indigo-100 text-indigo-800', icon: FiTruck },
    delivered: { label: 'Доставлен', color: 'bg-green-100 text-green-800', icon: FiCheck },
    cancelled: { label: 'Отменён', color: 'bg-red-100 text-red-800', icon: FiX },
}

export default function OrdersPage() {
    const { isAuthenticated } = useAuthStore()
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }
        ordersApi.getAll()
            .then((r) => setOrders(r.data.results || r.data))
            .catch(() => setOrders([]))
            .finally(() => setLoading(false))
    }, [isAuthenticated])

    if (loading) {
        return (
            <div className="container-custom py-8">
                <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/3" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Мои заказы</h1>
                    <Link href="/profile" className="text-sm text-primary-600 hover:underline">
                        Личный кабинет
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                        <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">Заказов пока нет</h2>
                        <p className="text-gray-500 mb-6">Начните покупки прямо сейчас</p>
                        <Link href="/" className="btn-primary">
                            Перейти в каталог
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
                            const StatusIcon = status.icon
                            return (
                                <Link
                                    key={order.id}
                                    href={`/orders/${order.id}`}
                                    className="bg-white rounded-xl shadow-sm p-5 block hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-bold text-gray-900">#{order.order_number}</span>
                                                <span className={`badge ${status.color} flex items-center gap-1`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {status.label}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-1">
                                                {new Date(order.created_at).toLocaleDateString('ru-KZ', {
                                                    year: 'numeric', month: 'long', day: 'numeric',
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {order.items?.length || '?'} товара •{' '}
                                                {order.city}, {order.address}
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-bold text-primary-600 text-lg">
                                                {Number(order.total).toLocaleString('ru-KZ')} ₸
                                            </p>
                                            <FiChevronRight className="w-5 h-5 text-gray-400 ml-auto mt-1 group-hover:text-primary-600 transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
