'use client'

import Link from 'next/link'
import { FiMonitor, FiPackage, FiPrinter, FiSmartphone } from 'react-icons/fi'

const categories = [
  {
    name: 'Компьютеры',
    slug: 'computers',
    icon: FiMonitor,
    color: 'bg-blue-500',
  },
  {
    name: 'Ноутбуки',
    slug: 'laptops',
    icon: FiPackage,
    color: 'bg-purple-500',
  },
  {
    name: 'Аксессуары',
    slug: 'accessories',
    icon: FiSmartphone,
    color: 'bg-green-500',
  },
  {
    name: 'Принтеры',
    slug: 'printers',
    icon: FiPrinter,
    color: 'bg-orange-500',
  },
]

export default function Categories() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Категории товаров</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link
              key={category.slug}
              href={`/catalog/${category.slug}`}
              className="card p-6 flex flex-col items-center text-center group"
            >
              <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

