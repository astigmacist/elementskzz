'use client'

import { useEffect, useState } from 'react'
import { FiPackage, FiShoppingCart, FiDollarSign, FiUsers, FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import StatsCard from '@/components/admin/StatsCard'
import { adminAPI } from '@/lib/api/admin'

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0,
        salesData: [],
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            const data = await adminAPI.getDashboardStats()
            setStats(data)
        } catch (error) {
            console.error('Error loading stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Дашборд</h1>
                <p className="text-gray-600">Обзор статистики и активности магазина</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Всего товаров"
                    value={stats.totalProducts}
                    icon={<FiPackage className="text-2xl" />}
                    change="+12 за месяц"
                    changeType="positive"
                    color="blue"
                />
                <StatsCard
                    title="Заказы"
                    value={stats.totalOrders}
                    icon={<FiShoppingCart className="text-2xl" />}
                    change="+8 за неделю"
                    changeType="positive"
                    color="green"
                />
                <StatsCard
                    title="Выручка"
                    value={`${stats.totalRevenue.toLocaleString('ru-RU')} ₸`}
                    icon={<FiDollarSign className="text-2xl" />}
                    change="+15% за месяц"
                    changeType="positive"
                    color="purple"
                />
                <StatsCard
                    title="Пользователи"
                    value={stats.totalUsers}
                    icon={<FiUsers className="text-2xl" />}
                    change="+23 за неделю"
                    changeType="positive"
                    color="orange"
                />
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Продажи по месяцам
                        </h2>
                        <FiTrendingUp className="text-green-600 text-xl" />
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="space-y-4">
                        {stats.salesData.map((item: any, index: number) => (
                            <div key={index}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-600">{item.name}</span>
                                    <span className="font-semibold text-gray-900">
                                        {item.sales.toLocaleString('ru-RU')} ₸
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(item.sales / 1000000) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Быстрые действия
                    </h2>
                    <div className="space-y-3">
                        <Link
                            href="/admin/products/new"
                            className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                        >
                            <span className="font-medium text-gray-700 group-hover:text-indigo-600">
                                Добавить товар
                            </span>
                            <FiArrowRight className="text-gray-400 group-hover:text-indigo-600" />
                        </Link>
                        <Link
                            href="/admin/categories"
                            className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                        >
                            <span className="font-medium text-gray-700 group-hover:text-indigo-600">
                                Управление категориями
                            </span>
                            <FiArrowRight className="text-gray-400 group-hover:text-indigo-600" />
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                        >
                            <span className="font-medium text-gray-700 group-hover:text-indigo-600">
                                Просмотреть заказы
                            </span>
                            <FiArrowRight className="text-gray-400 group-hover:text-indigo-600" />
                        </Link>
                        <Link
                            href="/admin/reviews"
                            className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                        >
                            <span className="font-medium text-gray-700 group-hover:text-indigo-600">
                                Модерировать отзывы
                            </span>
                            <FiArrowRight className="text-gray-400 group-hover:text-indigo-600" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Недавняя активность
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <FiShoppingCart className="text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Новый заказ</p>
                            <p className="text-xs text-gray-500">5 минут назад</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiPackage className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Товар добавлен</p>
                            <p className="text-xs text-gray-500">2 часа назад</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <FiUsers className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Новый пользователь</p>
                            <p className="text-xs text-gray-500">3 часа назад</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
