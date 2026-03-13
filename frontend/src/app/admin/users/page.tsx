'use client'

import { useEffect, useState } from 'react'
import { FiSearch, FiUserCheck, FiUserX } from 'react-icons/fi'
import { adminAPI } from '@/lib/api/admin'
import toast from 'react-hot-toast'

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const data = await adminAPI.getUsers()
            setUsers(data.results || data)
        } catch (error) {
            console.error('Error loading users:', error)
            toast.error('Ошибка загрузки пользователей')
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Пользователи</h1>
                <p className="text-gray-600">Управление пользователями магазина</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск пользователей..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Пользователь
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Телефон
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Дата регистрации
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Роль
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            Пользователи не найдены
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                        {user.username?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <p className="font-medium text-gray-900">
                                                        {user.username || 'N/A'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {user.phone || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {user.created_at
                                                    ? new Date(user.created_at).toLocaleDateString('ru-RU')
                                                    : '—'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.is_staff || user.is_superuser ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                                                        <FiUserCheck />
                                                        Администратор
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                                                        <FiUserX />
                                                        Пользователь
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Всего пользователей</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Администраторы</p>
                    <p className="text-2xl font-bold text-purple-600">
                        {users.filter((u) => u.is_staff || u.is_superuser).length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-1">Клиенты</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {users.filter((u) => !u.is_staff && !u.is_superuser).length}
                    </p>
                </div>
            </div>
        </div>
    )
}
