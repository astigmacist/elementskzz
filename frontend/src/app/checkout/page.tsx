'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { ordersApi } from '@/lib/api'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'

const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Актобе', 'Тараз', 'Павлодар', 'Усть-Каменогорск', 'Атырау', 'Костанай', 'Уральск', 'Актау', 'Темиртау']

type PaymentMethod = 'kaspi' | 'card' | 'cash'

export default function CheckoutPage() {
    const router = useRouter()
    const { cart, fetchCart, clearCart } = useCartStore()
    const { user, isAuthenticated } = useAuthStore()
    const [submitting, setSubmitting] = useState(false)
    const [step, setStep] = useState<'form' | 'success'>('form')
    const [orderNumber, setOrderNumber] = useState('')

    const [form, setForm] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        city: user?.city || 'Алматы',
        address: user?.address || '',
        payment_method: 'kaspi' as PaymentMethod,
        notes: '',
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }
        if (!cart?.items.length) {
            router.push('/cart')
            return
        }
    }, [isAuthenticated, cart])

    useEffect(() => {
        if (user) {
            setForm((prev) => ({
                ...prev,
                first_name: user.first_name || prev.first_name,
                last_name: user.last_name || prev.last_name,
                email: user.email || prev.email,
                phone: user.phone || prev.phone,
                city: user.city || prev.city,
                address: user.address || prev.address,
            }))
        }
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!cart) return
        setSubmitting(true)
        try {
            const response = await ordersApi.create({
                ...form,
                subtotal: cart.total_price,
                delivery_cost: cart.total_price >= 50000 ? 0 : 1500,
                total: cart.total_price >= 50000 ? cart.total_price : cart.total_price + 1500,
            })
            setOrderNumber(response.data.order_number)
            setStep('success')
        } catch (error: any) {
            const msg = error.response?.data?.detail || 'Ошибка при оформлении заказа'
            toast.error(msg)
        } finally {
            setSubmitting(false)
        }
    }

    const deliveryCost = cart && cart.total_price >= 50000 ? 0 : 1500
    const total = cart ? Number(cart.total_price) + deliveryCost : 0
    const kaspiMonthly = Math.ceil(total / 24)

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheck className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Заказ оформлен!</h1>
                    <p className="text-gray-500 mb-4">
                        Ваш заказ <strong className="text-gray-900">#{orderNumber}</strong> успешно создан. Мы свяжемся с вами в ближайшее время.
                    </p>
                    <p className="text-sm text-gray-400 mb-8">
                        Информация отправлена на {form.email}
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/orders" className="btn-primary text-center">
                            Мои заказы
                        </Link>
                        <Link href="/" className="btn-secondary text-center">
                            Продолжить покупки
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom max-w-4xl">
                <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors">
                    <FiArrowLeft className="w-4 h-4" />
                    Назад в корзину
                </Link>

                <h1 className="text-2xl font-bold mb-6">Оформление заказа</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-5">
                            {/* Contact Info */}
                            <div className="bg-white rounded-xl shadow-sm p-5">
                                <h2 className="font-bold mb-4">Контактная информация</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                                        <input name="first_name" value={form.first_name} onChange={handleChange} required className="input-field" placeholder="Ерлан" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия *</label>
                                        <input name="last_name" value={form.last_name} onChange={handleChange} required className="input-field" placeholder="Садыбеков" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                                        <input name="phone" value={form.phone} onChange={handleChange} required type="tel" className="input-field" placeholder="+7 (777) 000-00-00" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input name="email" value={form.email} onChange={handleChange} required type="email" className="input-field" placeholder="email@example.com" />
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-white rounded-xl shadow-sm p-5">
                                <h2 className="font-bold mb-4">Адрес доставки</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Город *</label>
                                        <select name="city" value={form.city} onChange={handleChange} required className="input-field">
                                            {CITIES.map((c) => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Адрес *</label>
                                        <input name="address" value={form.address} onChange={handleChange} required className="input-field" placeholder="Улица, дом, квартира" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий к заказу</label>
                                        <textarea name="notes" value={form.notes} onChange={handleChange} className="input-field resize-none" rows={3} placeholder="Дополнительные пожелания..." />
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white rounded-xl shadow-sm p-5">
                                <h2 className="font-bold mb-4">Способ оплаты</h2>
                                <div className="space-y-3">
                                    {[
                                        { value: 'kaspi', label: 'Kaspi Pay', desc: 'Оплата через приложение Kaspi', badge: 'Популярно' },
                                        { value: 'card', label: 'Банковская карта', desc: 'Visa / Mastercard', badge: '' },
                                        { value: 'cash', label: 'Наличными при получении', desc: '', badge: '' },
                                    ].map((method) => (
                                        <label key={method.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${form.payment_method === method.value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input type="radio" name="payment_method" value={method.value} checked={form.payment_method === method.value} onChange={handleChange} className="ml-1 accent-primary-600" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-sm">{method.label}</span>
                                                    {method.badge && <span className="badge bg-green-100 text-green-700 text-xs">{method.badge}</span>}
                                                </div>
                                                {method.desc && <p className="text-xs text-gray-500 mt-0.5">{method.desc}</p>}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div>
                            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
                                <h2 className="font-bold mb-4">Ваш заказ</h2>
                                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                                    {cart?.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 text-sm">
                                            <span className="text-gray-500 flex-shrink-0">{item.quantity}×</span>
                                            <span className="flex-1 line-clamp-1 text-gray-700">{item.product.name}</span>
                                            <span className="font-medium flex-shrink-0">{Number(item.total_price).toLocaleString('ru-KZ')} ₸</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t pt-3 space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Товары</span>
                                        <span>{cart ? Number(cart.total_price).toLocaleString('ru-KZ') : 0} ₸</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Доставка</span>
                                        <span className={deliveryCost === 0 ? 'text-green-600 font-medium' : ''}>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString('ru-KZ')} ₸`}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                                        <span>Итого</span>
                                        <span className="text-primary-600">{total.toLocaleString('ru-KZ')} ₸</span>
                                    </div>
                                    <p className="text-xs text-gray-400">Рассрочка от {kaspiMonthly.toLocaleString('ru-KZ')} ₸/мес</p>
                                </div>
                                <button type="submit" disabled={submitting} className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
                                    {submitting ? 'Оформляем...' : 'Оформить заказ'}
                                </button>
                                <p className="text-xs text-gray-400 text-center mt-3">
                                    Нажимая кнопку, вы соглашаетесь с{' '}
                                    <Link href="/terms" className="text-primary-600 hover:underline">условиями</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
