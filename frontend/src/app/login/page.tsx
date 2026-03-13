'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi'
import Image from 'next/image'

type Mode = 'login' | 'register'

export default function LoginPage() {
    const [mode, setMode] = useState<Mode>('login')
    const [showPassword, setShowPassword] = useState(false)
    const { login, register, isAuthenticated, loading } = useAuthStore()
    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: '',
        re_password: '',
        first_name: '',
        last_name: '',
        phone: '',
        username: '',
    })

    useEffect(() => {
        if (isAuthenticated) router.push('/profile')
    }, [isAuthenticated])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login(form.email, form.password)
            router.push('/profile')
        } catch { }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (form.password !== form.re_password) {
            return
        }
        try {
            await register({
                email: form.email,
                password: form.password,
                re_password: form.re_password,
                first_name: form.first_name,
                last_name: form.last_name,
                phone: form.phone,
                username: form.username || form.email.split('@')[0],
            })
            router.push('/profile')
        } catch { }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <Image src="/logo.png" alt="Elements KZ" width={44} height={44} className="object-contain" />
                        <span className="text-2xl font-bold">
                            <span className="text-primary-600">Elements</span>
                            <span className="text-gray-900">.KZ</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    {/* Tabs */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                        >
                            Войти
                        </button>
                        <button
                            onClick={() => setMode('register')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'register' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                        >
                            Регистрация
                        </button>
                    </div>

                    {mode === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-field pl-10" placeholder="email@example.com" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm font-medium text-gray-700">Пароль</label>
                                    <Link href="/forgot-password" className="text-xs text-primary-600 hover:underline">Забыли пароль?</Link>
                                </div>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required className="input-field pl-10 pr-10" placeholder="••••••••" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                                {loading ? 'Входим...' : 'Войти'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input name="first_name" value={form.first_name} onChange={handleChange} required className="input-field pl-10" placeholder="Ерлан" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                                    <input name="last_name" value={form.last_name} onChange={handleChange} required className="input-field" placeholder="Садыбеков" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-field pl-10" placeholder="email@example.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="input-field pl-10" placeholder="+7 (777) 000-00-00" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Пароль *</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required minLength={8} className="input-field pl-10 pr-10" placeholder="Минимум 8 символов" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Повторите пароль *</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input name="re_password" type={showPassword ? 'text' : 'password'} value={form.re_password} onChange={handleChange} required className={`input-field pl-10 ${form.re_password && form.password !== form.re_password ? 'border-red-400' : ''}`} placeholder="Повторите пароль" />
                                </div>
                                {form.re_password && form.password !== form.re_password && (
                                    <p className="text-xs text-red-500 mt-1">Пароли не совпадают</p>
                                )}
                            </div>
                            <button type="submit" disabled={loading || (!!form.re_password && form.password !== form.re_password)} className="btn-primary w-full mt-2">
                                {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
                            </button>
                            <p className="text-xs text-gray-400 text-center">
                                Регистрируясь, вы соглашаетесь с{' '}
                                <Link href="/terms" className="text-primary-600 hover:underline">условиями использования</Link>
                            </p>
                        </form>
                    )}
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                    <Link href="/" className="text-primary-600 hover:underline">← Вернуться на главную</Link>
                </p>
            </div>
        </div>
    )
}
