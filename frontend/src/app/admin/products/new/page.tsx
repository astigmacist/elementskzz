'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiSave, FiX, FiUpload } from 'react-icons/fi'
import { adminAPI } from '@/lib/api/admin'
import toast from 'react-hot-toast'

export default function NewProductPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [brands, setBrands] = useState<any[]>([])

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        description: '',
        short_description: '',
        price: '',
        old_price: '',
        sku: '',
        stock: '',
        is_active: true,
        is_new: false,
        is_featured: false,
    })

    const [mainImage, setMainImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>('')

    useEffect(() => {
        loadCategories()
        loadBrands()
    }, [])

    const loadCategories = async () => {
        try {
            const data = await adminAPI.getCategories()
            setCategories(data.results || data || [])
        } catch (error) {
            console.error('Error loading categories:', error)
        }
    }

    const loadBrands = async () => {
        try {
            const data = await adminAPI.getBrands()
            setBrands(data.results || data || [])
        } catch (error) {
            console.error('Error loading brands:', error)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setMainImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const data = new FormData()

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value.toString())
            })

            // Add image
            if (mainImage) {
                data.append('main_image', mainImage)
            }

            await adminAPI.createProduct(data)
            toast.success('Товар успешно создан!')
            router.push('/admin/products')
        } catch (error: any) {
            console.error('Error creating product:', error)
            toast.error(error.response?.data?.detail || 'Ошибка при создании товара')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Новый товар</h1>
                <p className="text-gray-600">Добавление нового товара в каталог</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Основная информация
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Название товара *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Категория *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Выберите категорию</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Бренд
                            </label>
                            <select
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Выберите бренд</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Short Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Краткое описание
                            </label>
                            <input
                                type="text"
                                value={formData.short_description}
                                onChange={(e) =>
                                    setFormData({ ...formData, short_description: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                maxLength={500}
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Полное описание *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                rows={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Цены и склад
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Цена *
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Old Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Старая цена
                            </label>
                            <input
                                type="number"
                                value={formData.old_price}
                                onChange={(e) =>
                                    setFormData({ ...formData, old_price: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* SKU */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Артикул (SKU)
                            </label>
                            <input
                                type="text"
                                value={formData.sku}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Количество на складе *
                            </label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Изображение товара
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-full object-contain rounded-lg"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Нажмите для загрузки</span>
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Настройки
                    </h2>

                    <div className="space-y-4">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) =>
                                    setFormData({ ...formData, is_active: e.target.checked })
                                }
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Активен</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.is_new}
                                onChange={(e) =>
                                    setFormData({ ...formData, is_new: e.target.checked })
                                }
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Новинка</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.is_featured}
                                onChange={(e) =>
                                    setFormData({ ...formData, is_featured: e.target.checked })
                                }
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Популярный</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        <FiSave />
                        {loading ? 'Сохранение...' : 'Сохранить товар'}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        <FiX />
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    )
}
