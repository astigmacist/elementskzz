'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { useAdminStore } from '@/store/useAdminStore'
import { adminAPI } from '@/lib/api/admin'
import toast from 'react-hot-toast'

export default function AdminLogin() {
    const router = useRouter()
    const login = useAdminStore((state) => state.login)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Login and get tokens
            const tokens = await adminAPI.login(email, password)

            // Get user data
            const userData = await adminAPI.getCurrentUser()

            // Check if user is staff/admin
            if (!userData.is_staff && !userData.is_superuser) {
                toast.error('У вас нет прав доступа к админ-панели')
                setLoading(false)
                return
            }

            // Save to store
            login(tokens, {
                id: userData.id,
                email: userData.email,
                username: userData.username,
                isStaff: userData.is_staff,
                isSuperuser: userData.is_superuser,
            })

            toast.success('Добро пожаловать!')
            router.push('/admin/dashboard')
        } catch (error: any) {
            console.error('Login error:', error)
            toast.error(error.response?.data?.detail || 'Неверный email или пароль')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Elements KZ
                        </h1>
                        <p className="text-indigo-200">Админ Панель</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                    placeholder="admin@elementskz.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Пароль
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-white text-indigo-900 rounded-lg font-semibold hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                'Вход...'
                            ) : (
                                <>
                                    <FiLogIn />
                                    Войти
                                </>
                            )}
                        </button>
                    </form>

                    {/* Info */}
                    <div className="mt-6 text-center text-sm text-indigo-200">
                        <p>Только для администраторов</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
