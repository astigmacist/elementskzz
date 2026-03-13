'use client'

import { ReactNode } from 'react'

interface StatsCardProps {
    title: string
    value: string | number
    icon: ReactNode
    change?: string
    changeType?: 'positive' | 'negative'
    color?: 'blue' | 'green' | 'purple' | 'orange'
}

const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
}

export default function StatsCard({
    title,
    value,
    icon,
    change,
    changeType = 'positive',
    color = 'blue',
}: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
                    {change && (
                        <p
                            className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {change}
                        </p>
                    )}
                </div>
                <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white shadow-lg`}
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}
