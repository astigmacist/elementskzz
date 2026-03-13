'use client'

import { useEffect, useState } from 'react'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'
import { adminAPI } from '@/lib/api/admin'
import toast from 'react-hot-toast'

export default function BrandsPage() {
    const [brands, setBrands] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadBrands()
    }, [])

    const loadBrands = async () => {
        try {
            const data = await adminAPI.getBrands()
            setBrands(data.results || data || [])
        } catch (error) {
            console.error('Error loading brands:', error)
            toast.error('Ошибка загрузки брендов')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Бренды</h1>
                    <p className="text-gray-600">Управление брендами товаров</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <FiPlus />
                    Добавить бренд
                </button>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
                    </div>
                ) : brands.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        Бренды не найдены
                    </div>
                ) : (
                    brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col items-center text-center"
                        >
                            {brand.logo && (
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="w-20 h-20 object-contain mb-4"
                                />
                            )}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {brand.name}
                            </h3>
                            {brand.description && (
                                <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                            )}
                            <div className="flex items-center gap-2 w-full mt-auto">
                                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                    <FiEdit className="text-sm" />
                                </button>
                                <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                    <FiTrash2 className="text-sm" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
