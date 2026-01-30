'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiMenu, FiMonitor, FiPackage, FiPrinter, FiCpu, FiHardDrive, FiWifi, FiHeadphones, FiTablet } from 'react-icons/fi'

// Структура каталога
const catalogData = [
  {
    id: 'computers',
    name: 'Компьютерная техника',
    icon: FiMonitor,
    subcategories: [
      { name: 'Ноутбуки', href: '/catalog/laptops' },
      { name: 'Компьютеры', href: '/catalog/computers' },
      { name: 'Мониторы', href: '/catalog/monitors' },
      { name: 'Игровые ноутбуки', href: '/catalog/gaming-laptops' },
      { name: 'Ультрабуки', href: '/catalog/ultrabooks' },
      { name: 'Игровые компьютеры', href: '/catalog/gaming-computers' },
      { name: 'Моноблоки', href: '/catalog/monoblocks' },
      { name: 'Готовые серверы', href: '/catalog/servers' },
    ],
  },
  {
    id: 'components',
    name: 'Комплектующие',
    icon: FiCpu,
    subcategories: [
      { name: 'ОЗУ (Оперативная память)', href: '/catalog/ram' },
      { name: 'SSD накопители', href: '/catalog/ssd' },
      { name: 'HDD диски', href: '/catalog/hdd' },
      { name: 'Процессоры', href: '/catalog/processors' },
      { name: 'Материнские платы', href: '/catalog/motherboards' },
      { name: 'Видеокарты', href: '/catalog/video-cards' },
      { name: 'Блоки питания', href: '/catalog/power-supply' },
      { name: 'Корпуса для ПК', href: '/catalog/cases' },
    ],
  },
  {
    id: 'peripherals',
    name: 'Устройства ввода',
    icon: FiPackage,
    subcategories: [
      { name: 'Мышки', href: '/catalog/mice' },
      { name: 'Игровые мышки', href: '/catalog/gaming-mice' },
      { name: 'Клавиатуры', href: '/catalog/keyboards' },
      { name: 'Игровые клавиатуры', href: '/catalog/gaming-keyboards' },
      { name: 'Комплекты клавиатура и мышь', href: '/catalog/combo' },
      { name: 'Коврики для мыши', href: '/catalog/mouse-pads' },
    ],
  },
  {
    id: 'devices',
    name: 'Периферия',
    icon: FiPrinter,
    subcategories: [
      { name: 'Принтеры', href: '/catalog/printers' },
      { name: 'Сканеры', href: '/catalog/scanners' },
      { name: 'МФУ', href: '/catalog/mfu' },
      { name: 'Веб-камеры', href: '/catalog/webcams' },
      { name: 'Микрофоны', href: '/catalog/microphones' },
    ],
  },
  {
    id: 'audio',
    name: 'Аудиотехника',
    icon: FiHeadphones,
    subcategories: [
      { name: 'Наушники', href: '/catalog/headphones' },
      { name: 'Игровые наушники', href: '/catalog/gaming-headsets' },
      { name: 'Беспроводные наушники', href: '/catalog/wireless-headphones' },
      { name: 'TWS наушники', href: '/catalog/tws' },
      { name: 'Колонки', href: '/catalog/speakers' },
    ],
  },
  {
    id: 'storage',
    name: 'Накопители',
    icon: FiHardDrive,
    subcategories: [
      { name: 'Внешние HDD', href: '/catalog/external-hdd' },
      { name: 'Внешние SSD', href: '/catalog/external-ssd' },
      { name: 'USB флешки', href: '/catalog/usb-flash' },
      { name: 'Карты памяти', href: '/catalog/memory-cards' },
      { name: 'Карман для HDD и SSD', href: '/catalog/hdd-cases' },
    ],
  },
  {
    id: 'network',
    name: 'Сетевое оборудование',
    icon: FiWifi,
    subcategories: [
      { name: 'Роутеры', href: '/catalog/routers' },
      { name: 'Свитчи', href: '/catalog/switches' },
      { name: 'Wi-Fi адаптеры', href: '/catalog/wifi-adapters' },
      { name: 'Сетевые кабели', href: '/catalog/network-cables' },
      { name: 'Powerline адаптеры', href: '/catalog/powerline' },
    ],
  },
  {
    id: 'tablets',
    name: 'Планшеты',
    icon: FiTablet,
    subcategories: [
      { name: 'Планшеты Apple iPad', href: '/catalog/ipad' },
      { name: 'Планшеты Samsung', href: '/catalog/samsung-tablets' },
      { name: 'Планшеты Xiaomi', href: '/catalog/xiaomi-tablets' },
      { name: 'Графические планшеты', href: '/catalog/graphic-tablets' },
      { name: 'Аксессуары для планшетов', href: '/catalog/tablet-accessories' },
    ],
  },
]

export default function CatalogBar() {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>('computers')

  return (
    <>
      {/* Horizontal Catalog - NOT sticky, scrolls with content */}
      <nav className="bg-gray-50 border-t border-gray-200 overflow-x-auto">
        <div className="container-custom">
          <ul className="flex items-center gap-6 py-3 text-sm font-medium whitespace-nowrap">
            <li className="relative">
              <button 
                onClick={() => setCatalogOpen(!catalogOpen)}
                className="hover:text-primary-600 transition-colors flex items-center gap-1"
              >
                {catalogOpen ? <span className="text-lg">✕</span> : <FiMenu className="w-4 h-4" />}
                Каталог
              </button>
            </li>
            <li className="text-gray-300">|</li>
            <li>
              <Link href="/catalog/laptops" className="hover:text-primary-600 transition-colors">
                Ноутбуки
              </Link>
            </li>
            <li>
              <Link href="/catalog/computers" className="hover:text-primary-600 transition-colors">
                Компьютеры
              </Link>
            </li>
            <li>
              <Link href="/catalog/monitors" className="hover:text-primary-600 transition-colors">
                Мониторы
              </Link>
            </li>
            <li>
              <Link href="/catalog/printers" className="hover:text-primary-600 transition-colors">
                Принтеры
              </Link>
            </li>
            <li>
              <Link href="/catalog/keyboards" className="hover:text-primary-600 transition-colors">
                Клавиатуры
              </Link>
            </li>
            <li>
              <Link href="/catalog/mice" className="hover:text-primary-600 transition-colors">
                Мышки
              </Link>
            </li>
            <li>
              <Link href="/catalog/ram" className="hover:text-primary-600 transition-colors">
                ОЗУ
              </Link>
            </li>
            <li>
              <Link href="/catalog/ssd" className="hover:text-primary-600 transition-colors">
                SSD
              </Link>
            </li>
            <li>
              <Link href="/catalog/hdd" className="hover:text-primary-600 transition-colors">
                HDD
              </Link>
            </li>
            <li>
              <Link href="/catalog/accessories" className="hover:text-primary-600 transition-colors">
                Аксессуары
              </Link>
            </li>
            <li className="text-gray-300">|</li>
            <li>
              <Link href="/deals" className="text-red-600 hover:text-red-700 transition-colors font-semibold">
                🔥 Акции
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Catalog Dropdown Menu with Animation */}
      <div
        className={`bg-white border-t border-gray-200 shadow-lg relative z-40 overflow-hidden transition-all duration-300 ease-in-out ${
          catalogOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-custom">
          <div className="flex">
            {/* Left sidebar - Categories Tree */}
            <div className="w-80 border-r border-gray-200 py-4">
              <nav className="space-y-1">
                {catalogData.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onMouseEnter={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      style={{
                        animation: catalogOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none',
                      }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{category.name}</span>
                      <svg
                        className={`w-4 h-4 ml-auto transition-transform ${
                          activeCategory === category.id ? 'rotate-0' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Right content - Subcategories */}
            <div className="flex-1 py-6 px-8">
              {catalogData.map((category) => (
                <div
                  key={category.id}
                  className={`transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4 absolute pointer-events-none'
                  }`}
                >
                  <h3 className="text-xl font-bold text-primary-600 mb-6">{category.name}</h3>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                    {category.subcategories.map((sub, index) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="text-sm text-gray-700 hover:text-primary-600 hover:translate-x-1 transition-all duration-200"
                        style={{
                          animation:
                            activeCategory === category.id
                              ? `fadeInUp 0.3s ease-out ${index * 0.03}s both`
                              : 'none',
                        }}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

