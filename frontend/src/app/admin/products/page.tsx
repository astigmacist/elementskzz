'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import { adminAPI } from '@/lib/api/admin'
import toast from 'react-hot-toast'

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            const data = await adminAPI.getProducts()
            setProducts(data.results || data)
        } catch (error) {
            console.error('Error loading products:', error)
            toast.error('Ошибка загрузки товаров')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Вы уверены, что хотите удалить этот товар?')) return

        try {
            await adminAPI.deleteProduct(id)
            toast.success('Товар удален')
            loadProducts()
        } catch (error) {
            toast.error('Ошибка при удалении товара')
        }
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Товары</h1>
                    <p className="text-gray-600">Управление каталогом товаров</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <FiPlus />
                    Добавить товар
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск товаров..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Products Table */}
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
                                        Товар
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Категория
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Цена
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Склад
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
                                {filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            Товары не найдены
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.main_image || '/placeholder.png'}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {product.category_name || 'Без категории'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {product.price} ₸
                                                    </p>
                                                    {product.old_price && (
                                                        <p className="text-xs text-gray-500 line-through">
                                                            {product.old_price} ₸
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${product.stock > 0
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    {product.stock} шт
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${product.is_active
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                >
                                                    {product.is_active ? 'Активен' : 'Неактивен'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Просмотр"
                                                    >
                                                        <FiEye />
                                                    </button>
                                                    <Link
                                                        href={`/admin/products/${product.id}`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Редактировать"
                                                    >
                                                        <FiEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Удалить"
                                                    >
                                                        <FiTrash2 />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Всего товаров</p>
                    <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Активные</p>
                    <p className="text-2xl font-bold text-green-600">
                        {products.filter((p) => p.is_active).length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Нет на складе</p>
                    <p className="text-2xl font-bold text-red-600">
                        {products.filter((p) => p.stock === 0).length}
                    </p>
                </div>
            </div>
        </div>
    )
}
