'use client'

import { useEffect, useState } from 'react'
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'
import { adminAPI } from '@/lib/api/admin'
import toast from 'react-hot-toast'

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingCategory, setEditingCategory] = useState<any>(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parent: '',
        is_active: true,
    })

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        try {
            const data = await adminAPI.getCategories()
            // Handle both paginated {results: [...]} and plain array responses
            setCategories(data.results || data || [])
        } catch (error) {
            console.error('Error loading categories:', error)
            toast.error('Ошибка загрузки категорий')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (editingCategory) {
                await adminAPI.updateCategory(editingCategory.id, formData)
                toast.success('Категория обновлена')
            } else {
                await adminAPI.createCategory(formData)
                toast.success('Категория создана')
            }

            setShowModal(false)
            setEditingCategory(null)
            setFormData({ name: '', description: '', parent: '', is_active: true })
            loadCategories()
        } catch (error) {
            toast.error('Ошибка при сохранении категории')
        }
    }

    const handleEdit = (category: any) => {
        setEditingCategory(category)
        setFormData({
            name: category.name,
            description: category.description || '',
            parent: category.parent || '',
            is_active: category.is_active,
        })
        setShowModal(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return

        try {
            await adminAPI.deleteCategory(id)
            toast.success('Категория удалена')
            loadCategories()
        } catch (error) {
            toast.error('Ошибка при удалении категории')
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Категории</h1>
                    <p className="text-gray-600">Управление категориями товаров</p>
                </div>
                <button
                    onClick={() => {
                        setEditingCategory(null)
                        setFormData({ name: '', description: '', parent: '', is_active: true })
                        setShowModal(true)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <FiPlus />
                    Добавить категорию
                </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        Категории не найдены
                    </div>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {category.name}
                                    </h3>
                                    {category.description && (
                                        <p className="text-sm text-gray-600">{category.description}</p>
                                    )}
                                </div>
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${category.is_active
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {category.is_active ? 'Активна' : 'Неактивна'}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <FiEdit className="text-sm" />
                                    Изменить
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <FiTrash2 className="text-sm" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {editingCategory ? 'Изменить категорию' : 'Новая категория'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Название *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Описание
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) =>
                                            setFormData({ ...formData, is_active: e.target.checked })
                                        }
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Активна</span>
                                </label>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
