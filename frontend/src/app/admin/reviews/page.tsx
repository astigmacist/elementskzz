'use client'

import { useEffect, useState } from 'react'
import { FiCheck, FiX, FiStar } from 'react-icons/fi'
import { adminAPI } from '@/lib/api/admin'
import toast from 'react-hot-toast'

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadReviews()
    }, [])

    const loadReviews = async () => {
        try {
            const data = await adminAPI.getReviews()
            setReviews(data.results || data)
        } catch (error) {
            console.error('Error loading reviews:', error)
            // Mock data for now
            setReviews([])
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (id: number) => {
        try {
            await adminAPI.approveReview(id)
            toast.success('Отзыв одобрен')
            loadReviews()
        } catch (error) {
            toast.error('Ошибка при одобрении отзыва')
        }
    }

    const handleReject = async (id: number) => {
        if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) return

        try {
            await adminAPI.rejectReview(id)
            toast.success('Отзыв удален')
            loadReviews()
        } catch (error) {
            toast.error('Ошибка при удалении отзыва')
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Отзывы</h1>
                <p className="text-gray-600">Модерация отзывов на товары</p>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
                        Отзывы не найдены
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-gray-900">
                                            {review.user_name || 'Пользователь'}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`text-sm ${i < review.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Товар: <span className="font-medium">{review.product_name}</span>
                                    </p>
                                    <p className="text-gray-700">{review.comment}</p>

                                    {review.advantages && (
                                        <div className="mt-3">
                                            <p className="text-sm font-medium text-green-700">Достоинства:</p>
                                            <p className="text-sm text-gray-600">{review.advantages}</p>
                                        </div>
                                    )}

                                    {review.disadvantages && (
                                        <div className="mt-2">
                                            <p className="text-sm font-medium text-red-700">Недостатки:</p>
                                            <p className="text-sm text-gray-600">{review.disadvantages}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    {!review.is_approved && (
                                        <button
                                            onClick={() => handleApprove(review.id)}
                                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                            title="Одобрить"
                                        >
                                            <FiCheck />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleReject(review.id)}
                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        title="Удалить"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{new Date(review.created_at).toLocaleDateString('ru-RU')}</span>
                                <span
                                    className={`px-2 py-1 rounded-full ${review.is_approved
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                >
                                    {review.is_approved ? 'Одобрен' : 'На модерации'}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
