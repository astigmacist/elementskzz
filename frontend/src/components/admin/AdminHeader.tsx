'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiUser, FiLogOut, FiBell, FiExternalLink } from 'react-icons/fi'
import { useAuthStore } from '@/store/useAuthStore'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function AdminHeader() {
    const router = useRouter()
    const { user, logout } = useAuthStore()
    const [showUserMenu, setShowUserMenu] = useState(false)

    const handleLogout = () => {
        logout()
        toast.success('Вы вышли из системы')
        router.push('/login')
    }

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Title */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                    Панель управления Elements.KZ
                </h2>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {/* Link to main site */}
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-50"
                >
                    <FiExternalLink className="w-4 h-4" />
                    Сайт
                </Link>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                            {user?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-medium text-gray-800">
                                {user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user?.email || 'Администратор'}
                            </p>
                            <p className="text-xs text-gray-500">Администратор</p>
                        </div>
                    </button>

                    {/* Dropdown */}
                    {showUserMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowUserMenu(false)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <p className="text-xs text-gray-400">Вы вошли как</p>
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <FiUser className="w-4 h-4" />
                                    Профиль
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    Выйти
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
