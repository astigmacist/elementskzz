'use client'

import { useEffect, useState } from 'react'
import { FiFilter, FiEye } from 'react-icons/fi'
import { adminAPI } from '@/lib/api/admin'
import toast from 'react-hot-toast'

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-indigo-100 text-indigo-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
}

const statusLabels: Record<string, string> = {
    pending: 'Ожидает',
    confirmed: 'Подтвержден',
    processing: 'В обработке',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    cancelled: 'Отменен',
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState('')

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        try {
            const data = await adminAPI.getOrders()
            setOrders(data.results || data)
        } catch (error) {
            console.error('Error loading orders:', error)
            toast.error('Ошибка загрузки заказов')
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            await adminAPI.updateOrderStatus(orderId, newStatus)
            toast.success('Статус заказа обновлен')
            loadOrders()
        } catch (error) {
            toast.error('Ошибка при обновлении статуса')
        }
    }

    const filteredOrders = statusFilter
        ? orders.filter((order) => order.status === statusFilter)
        : orders

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Заказы</h1>
                <p className="text-gray-600">Управление заказами клиентов</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-4">
                    <FiFilter className="text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Все статусы</option>
                        <option value="pending">Ожидает обработки</option>
                        <option value="confirmed">Подтвержден</option>
                        <option value="processing">В обработке</option>
                        <option value="shipped">Отправлен</option>
                        <option value="delivered">Доставлен</option>
                        <option value="cancelled">Отменен</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Номер заказа
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Клиент
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Дата
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Сумма
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Статус
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Действия
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            Заказы не найдены
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">
                                                    {order.order_number}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {order.first_name} {order.last_name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{order.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(order.created_at).toLocaleDateString('ru-RU')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">
                                                    {order.total} ₸
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(order.id, e.target.value)
                                                    }
                                                    className={`px-3 py-1 text-xs font-medium rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${statusColors[order.status]
                                                        }`}
                                                >
                                                    {Object.entries(statusLabels).map(([value, label]) => (
                                                        <option key={value} value={value}>
                                                            {label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end">
                                                    <button
                                                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Просмотр"
                                                    >
                                                        <FiEye />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Всего заказов</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Ожидают</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {orders.filter((o) => o.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">В обработке</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {orders.filter((o) => o.status === 'processing').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Доставлено</p>
                    <p className="text-2xl font-bold text-green-600">
                        {orders.filter((o) => o.status === 'delivered').length}
                    </p>
                </div>
            </div>
        </div>
    )
}
