'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
    FiHome, FiPackage, FiShoppingCart, FiUsers,
    FiStar, FiGrid, FiTag, FiChevronLeft, FiChevronRight
} from 'react-icons/fi'

const menuItems = [
    { icon: FiHome, label: 'Дашборд', href: '/admin/dashboard' },
    { icon: FiPackage, label: 'Товары', href: '/admin/products' },
    { icon: FiGrid, label: 'Категории', href: '/admin/categories' },
    { icon: FiTag, label: 'Бренды', href: '/admin/brands' },
    { icon: FiShoppingCart, label: 'Заказы', href: '/admin/orders' },
    { icon: FiUsers, label: 'Пользователи', href: '/admin/users' },
    { icon: FiStar, label: 'Отзывы', href: '/admin/reviews' },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                {!collapsed && (
                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                        Elements KZ
                    </h1>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors ml-auto"
                >
                    {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-white/20 shadow-lg shadow-indigo-500/50'
                                    : 'hover:bg-white/10'
                                }`}
                        >
                            <Icon className={`text-xl flex-shrink-0 ${isActive ? 'text-white' : 'text-indigo-200'}`} />
                            {!collapsed && (
                                <span className={`font-medium ${isActive ? 'text-white' : 'text-indigo-100'}`}>
                                    {item.label}
                                </span>
                            )}
                            {isActive && !collapsed && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                {!collapsed && (
                    <div className="text-xs text-indigo-200 text-center">
                        <p>Admin Panel v1.0</p>
                        <p className="mt-1 text-indigo-300">© 2026 Elements KZ</p>
                    </div>
                )}
            </div>
        </aside>
    )
}
