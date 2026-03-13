'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ProductDetail, Review } from '@/types'
import { productsApi, reviewsApi } from '@/lib/api'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useAuthStore } from '@/store/useAuthStore'
import {
    FiStar,
    FiShoppingCart,
    FiHeart,
    FiShare2,
    FiChevronRight,
    FiPackage,
    FiShield,
    FiRefreshCw,
    FiTruck,
    FiCheck,
    FiMinus,
    FiPlus,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

type TabType = 'specs' | 'description' | 'reviews' | 'delivery'

export default function ProductPage() {
    const params = useParams()
    const slug = params.slug as string

    const [product, setProduct] = useState<ProductDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState<TabType>('specs')

    const { addToCart } = useCartStore()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
    const { isAuthenticated } = useAuthStore()

    const inWishlist = product ? isInWishlist(product.id) : false

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try {
                const response = await productsApi.getBySlug(slug)
                setProduct(response.data)
            } catch (error) {
                console.error('Error fetching product:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [slug])

    const handleAddToCart = () => {
        if (!product) return
        addToCart(product.id, quantity)
    }

    const handleToggleWishlist = () => {
        if (!product) return
        if (inWishlist) {
            removeFromWishlist(product.id)
        } else {
            addToWishlist(product.id)
        }
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success('Ссылка скопирована')
    }

    if (loading) {
        return (
            <div className="container-custom py-8">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-64 mb-8" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="bg-gray-200 rounded-2xl h-96" />
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                            <div className="h-10 bg-gray-200 rounded w-1/3" />
                            <div className="h-12 bg-gray-200 rounded" />
                            <div className="h-12 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container-custom py-16 text-center">
                <div className="text-6xl mb-4">😔</div>
                <h1 className="text-2xl font-bold mb-2">Товар не найден</h1>
                <p className="text-gray-500 mb-6">Возможно, он был удалён или перемещён</p>
                <Link href="/" className="btn-primary">
                    На главную
                </Link>
            </div>
        )
    }

    const allImages = [product.main_image, ...(product.images || []).map((i) => i.image)].filter(
        Boolean
    )
    const kaspiMonthly = Math.ceil(Number(product.price) / 24)

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container-custom py-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap">
                    <Link href="/" className="hover:text-primary-600 transition-colors">
                        Главная
                    </Link>
                    <FiChevronRight className="w-4 h-4" />
                    <Link href="/catalog" className="hover:text-primary-600 transition-colors">
                        Каталог
                    </Link>
                    {product.category_name && (
                        <>
                            <FiChevronRight className="w-4 h-4" />
                            <Link
                                href={`/catalog/${product.category}`}
                                className="hover:text-primary-600 transition-colors"
                            >
                                {product.category_name}
                            </Link>
                        </>
                    )}
                    <FiChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
                </nav>

                {/* Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Left: Image Gallery */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        {/* Main Image */}
                        <div className="relative h-80 sm:h-96 mb-4 rounded-xl overflow-hidden bg-gray-50">
                            <Image
                                src={allImages[selectedImage] || '/placeholder.png'}
                                alt={product.name}
                                fill
                                className="object-contain p-4"
                                priority
                            />
                            {product.discount_percentage > 0 && (
                                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                                    -{product.discount_percentage}%
                                </span>
                            )}
                        </div>
                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {allImages.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary-500' : 'border-gray-200'
                                            }`}
                                    >
                                        <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-contain p-1" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-5">
                        {/* Title & Badges */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {product.brand_name && (
                                    <span className="badge bg-gray-100 text-gray-700">{product.brand_name}</span>
                                )}
                                {product.is_new && <span className="badge-new">Новинка</span>}
                                {product.is_featured && (
                                    <span className="badge bg-orange-100 text-orange-700">🔥 Хит продаж</span>
                                )}
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                                {product.name}
                            </h1>
                            {product.sku && (
                                <p className="text-sm text-gray-400 mt-1">Арт. {product.sku}</p>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FiStar
                                        key={star}
                                        className={`w-4 h-4 ${star <= Math.round(Number(product.rating))
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="font-semibold">{Number(product.rating).toFixed(1)}</span>
                            <button
                                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
                                onClick={() => setActiveTab('reviews')}
                            >
                                {product.reviews_count} отзывов
                            </button>
                        </div>

                        {/* Price */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-end gap-3">
                                {product.old_price && (
                                    <span className="text-lg text-gray-400 line-through">
                                        {Number(product.old_price).toLocaleString('ru-KZ')} ₸
                                    </span>
                                )}
                                <span className="text-3xl font-bold text-primary-600">
                                    {Number(product.price).toLocaleString('ru-KZ')} ₸
                                </span>
                            </div>
                            {/* Kaspi Red */}
                            <div className="flex items-center gap-2 mt-2">
                                <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                    Kaspi Red
                                </div>
                                <span className="text-sm text-gray-600">
                                    {kaspiMonthly.toLocaleString('ru-KZ')} ₸/мес × 24 мес
                                </span>
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-2.5 h-2.5 rounded-full ${product.is_available ? 'bg-green-500' : 'bg-red-400'}`}
                            />
                            <span
                                className={`font-medium text-sm ${product.is_available ? 'text-green-700' : 'text-red-600'}`}
                            >
                                {product.is_available ? 'Есть в наличии' : 'Нет в наличии'}
                            </span>
                        </div>

                        {/* Quantity + Add to Cart */}
                        <div className="flex gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="px-3 py-3 hover:bg-gray-100 transition-colors"
                                >
                                    <FiMinus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-3 font-medium min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                                    className="px-3 py-3 hover:bg-gray-100 transition-colors"
                                >
                                    <FiPlus className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.is_available}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${product.is_available
                                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <FiShoppingCart className="w-5 h-5" />
                                В корзину
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleToggleWishlist}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-medium text-sm transition-colors ${inWishlist
                                        ? 'border-red-300 text-red-500 bg-red-50'
                                        : 'border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500'
                                    }`}
                            >
                                <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                                {inWishlist ? 'В избранном' : 'В избранное'}
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-400 font-medium text-sm transition-colors"
                            >
                                <FiShare2 className="w-4 h-4" />
                                Поделиться
                            </button>
                        </div>

                        {/* Advantages */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            {[
                                { icon: FiTruck, text: 'Доставка по Алматы' },
                                { icon: FiShield, text: 'Официальная гарантия' },
                                { icon: FiRefreshCw, text: 'Возврат 14 дней' },
                                { icon: FiPackage, text: 'Оригинальный товар' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
                                    <Icon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex border-b border-gray-200 overflow-x-auto">
                        {(
                            [
                                { key: 'specs', label: 'Характеристики' },
                                { key: 'description', label: 'Описание' },
                                { key: 'reviews', label: `Отзывы (${product.reviews_count})` },
                                { key: 'delivery', label: 'Доставка и оплата' },
                            ] as { key: TabType; label: string }[]
                        ).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.key
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {/* Specs Tab */}
                        {activeTab === 'specs' && (
                            <div>
                                {product.specifications && product.specifications.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {product.specifications.map((spec) => (
                                            <div key={spec.id} className="flex py-3 gap-4">
                                                <span className="text-sm text-gray-500 w-1/2 flex-shrink-0">
                                                    {spec.name}
                                                </span>
                                                <span className="text-sm text-gray-900 font-medium">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">Характеристики не указаны</p>
                                )}
                            </div>
                        )}

                        {/* Description Tab */}
                        {activeTab === 'description' && (
                            <div className="prose prose-sm max-w-none text-gray-700">
                                {product.description ? (
                                    <p className="whitespace-pre-wrap leading-relaxed">{product.description}</p>
                                ) : (
                                    <p className="text-gray-500">Описание не добавлено</p>
                                )}
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <ReviewsSection product={product} isAuthenticated={isAuthenticated} />
                        )}

                        {/* Delivery Tab */}
                        {activeTab === 'delivery' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <FiTruck className="text-primary-600" />
                                        Доставка
                                    </h3>
                                    <div className="space-y-2 text-sm text-gray-700">
                                        <div className="flex items-start gap-2">
                                            <FiCheck className="text-green-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Доставка по Алматы</p>
                                                <p className="text-gray-500">1-2 рабочих дня. Бесплатно от 50 000 ₸</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <FiCheck className="text-green-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Доставка по Казахстану</p>
                                                <p className="text-gray-500">3-7 рабочих дней через Казпочту</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <FiCheck className="text-green-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Самовывоз</p>
                                                <p className="text-gray-500">г. Алматы, ул. Абая 123</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <FiShield className="text-primary-600" />
                                        Оплата
                                    </h3>
                                    <div className="space-y-2 text-sm text-gray-700">
                                        {[
                                            'Kaspi Pay (QR-код)',
                                            `Kaspi Red — рассрочка 0-0-24 (${kaspiMonthly.toLocaleString('ru-KZ')} ₸/мес)`,
                                            'Банковская карта (Visa / Mastercard)',
                                            'Наличными при получении',
                                            'Безналичный расчёт для юридических лиц',
                                        ].map((method) => (
                                            <div key={method} className="flex items-center gap-2">
                                                <FiCheck className="text-green-500 flex-shrink-0" />
                                                <span>{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ReviewsSection({
    product,
    isAuthenticated,
}: {
    product: ProductDetail
    isAuthenticated: boolean
}) {
    const [showForm, setShowForm] = useState(false)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [advantages, setAdvantages] = useState('')
    const [disadvantages, setDisadvantages] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!comment.trim()) return
        setSubmitting(true)
        try {
            await reviewsApi.create({
                product: product.id,
                rating,
                comment,
                advantages,
                disadvantages,
            })
            toast.success('Отзыв отправлен на модерацию')
            setShowForm(false)
            setComment('')
        } catch {
            toast.error('Ошибка при отправке отзыва')
        } finally {
            setSubmitting(false)
        }
    }

    const reviews: Review[] = product.reviews || []

    return (
        <div>
            {/* Rating Summary */}
            <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">
                        {Number(product.rating).toFixed(1)}
                    </div>
                    <div className="flex justify-center gap-0.5 my-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <FiStar
                                key={s}
                                className={`w-4 h-4 ${s <= Math.round(Number(product.rating)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <div className="text-sm text-gray-500">{product.reviews_count} отзывов</div>
                </div>
                <div className="flex-1">
                    {!isAuthenticated ? (
                        <p className="text-sm text-gray-500">
                            <Link href="/login" className="text-primary-600 hover:underline">
                                Войдите
                            </Link>{' '}
                            чтобы оставить отзыв
                        </p>
                    ) : (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="btn-primary text-sm"
                        >
                            Написать отзыв
                        </button>
                    )}
                </div>
            </div>

            {/* Review Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-200 rounded-xl space-y-4">
                    <h3 className="font-semibold">Ваш отзыв</h3>
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Оценка</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setRating(s)}
                                    className="text-2xl transition-transform hover:scale-110"
                                >
                                    <FiStar
                                        className={`w-7 h-7 ${s <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Достоинства</label>
                        <textarea
                            value={advantages}
                            onChange={(e) => setAdvantages(e.target.value)}
                            className="input-field resize-none"
                            rows={2}
                            placeholder="Что понравилось?"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Недостатки</label>
                        <textarea
                            value={disadvantages}
                            onChange={(e) => setDisadvantages(e.target.value)}
                            className="input-field resize-none"
                            rows={2}
                            placeholder="Что не понравилось?"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Комментарий *</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="input-field resize-none"
                            rows={3}
                            placeholder="Напишите ваш отзыв..."
                            required
                        />
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" disabled={submitting} className="btn-primary">
                            {submitting ? 'Отправка...' : 'Отправить'}
                        </button>
                        <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                            Отмена
                        </button>
                    </div>
                </form>
            )}

            {/* Review List */}
            {reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">💬</div>
                    <p>Пока нет отзывов. Будьте первым!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="border border-gray-100 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="font-medium text-gray-900">{review.user_name}</p>
                                    <div className="flex gap-0.5 mt-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <FiStar
                                                key={s}
                                                className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(review.created_at).toLocaleDateString('ru-KZ')}
                                </span>
                            </div>
                            {review.advantages && (
                                <p className="text-sm text-green-700 mb-1">
                                    <span className="font-medium">+ </span>
                                    {review.advantages}
                                </p>
                            )}
                            {review.disadvantages && (
                                <p className="text-sm text-red-600 mb-1">
                                    <span className="font-medium">- </span>
                                    {review.disadvantages}
                                </p>
                            )}
                            <p className="text-sm text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
