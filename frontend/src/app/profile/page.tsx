'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiPackage, FiHeart, FiLogOut } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ProfilePage() {
    const { user, isAuthenticated, logout, updateProfile, loading } = useAuthStore()
    const router = useRouter()
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        city: '',
        address: '',
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (user) {
            setForm({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                phone: user.phone || '',
                city: user.city || '',
                address: user.address || '',
            })
        }
    }, [user])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateProfile(form)
            setEditing(false)
        } catch { }
    }

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    if (!user) return null

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">Личный кабинет</h1>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-5">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                                {user.first_name?.[0] || user.email[0].toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    {user.first_name} {user.last_name}
                                </h2>
                                <p className="text-primary-100 text-sm">{user.email}</p>
                                <p className="text-primary-200 text-xs mt-0.5">
                                    Клиент с {new Date(user.created_at).toLocaleDateString('ru-KZ', { year: 'numeric', month: 'long' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    {!editing ? (
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: FiUser, label: 'Имя', value: `${user.first_name || '—'} ${user.last_name || ''}` },
                                    { icon: FiMail, label: 'Email', value: user.email },
                                    { icon: FiPhone, label: 'Телефон', value: user.phone || '—' },
                                    { icon: FiMapPin, label: 'Город', value: user.city || '—' },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <Icon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-400">{label}</p>
                                            <p className="text-sm font-medium text-gray-900">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {user.address && (
                                <div className="flex items-start gap-3">
                                    <FiMapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-400">Адрес доставки</p>
                                        <p className="text-sm font-medium text-gray-900">{user.address}</p>
                                    </div>
                                </div>
                            )}
                            <button onClick={() => setEditing(true)} className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors mt-2">
                                <FiEdit2 className="w-4 h-4" />
                                Редактировать профиль
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                                    <input value={form.first_name} onChange={(e) => setForm(p => ({ ...p, first_name: e.target.value }))} className="input-field" placeholder="Ваше имя" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                                    <input value={form.last_name} onChange={(e) => setForm(p => ({ ...p, last_name: e.target.value }))} className="input-field" placeholder="Ваша фамилия" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                                    <input value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field" placeholder="+7 (777) 000-00-00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                                    <input value={form.city} onChange={(e) => setForm(p => ({ ...p, city: e.target.value }))} className="input-field" placeholder="Алматы" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Адрес доставки</label>
                                <input value={form.address} onChange={(e) => setForm(p => ({ ...p, address: e.target.value }))} className="input-field" placeholder="Улица, дом, квартира" />
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Сохраняем...' : 'Сохранить'}</button>
                                <button type="button" onClick={() => setEditing(false)} className="btn-secondary">Отмена</button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    {[
                        { href: '/orders', icon: FiPackage, label: 'Мои заказы', desc: 'История покупок' },
                        { href: '/wishlist', icon: FiHeart, label: 'Избранное', desc: 'Сохранённые товары' },
                    ].map(({ href, icon: Icon, label, desc }) => (
                        <Link key={href} href={href} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                                <Icon className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{label}</p>
                                <p className="text-xs text-gray-500">{desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Logout */}
                <button onClick={handleLogout} className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors group">
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Выйти из аккаунта</span>
                </button>
            </div>
        </div>
    )
}
