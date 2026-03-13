import Link from 'next/link'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaTelegram, FaWhatsapp, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Elements<span className="text-primary-500">.KZ</span>
            </h3>
            <p className="text-sm mb-4">
              Интернет-магазин электроники и компьютерной техники в Казахстане.
              Качественные товары по доступным ценам.
            </p>
            <div className="flex gap-4">
              <a href="https://t.me/elements_kz" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
                <FaTelegram className="w-6 h-6" />
              </a>
              <a href="https://wa.me/77001234567" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
                <FaWhatsapp className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/elements_kz" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog/computers" className="hover:text-primary-500 transition-colors">Компьютеры</Link></li>
              <li><Link href="/catalog/laptops" className="hover:text-primary-500 transition-colors">Ноутбуки</Link></li>
              <li><Link href="/catalog/monitors" className="hover:text-primary-500 transition-colors">Мониторы</Link></li>
              <li><Link href="/catalog/accessories" className="hover:text-primary-500 transition-colors">Аксессуары</Link></li>
              <li><Link href="/catalog/printers" className="hover:text-primary-500 transition-colors">Принтеры</Link></li>
              <li><Link href="/b2b" className="text-primary-400 hover:text-primary-300 transition-colors font-medium">Юридическим лицам</Link></li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-500 transition-colors">О нас</Link></li>
              <li><Link href="/delivery" className="hover:text-primary-500 transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/warranty" className="hover:text-primary-500 transition-colors">Гарантия</Link></li>
              <li><Link href="/return" className="hover:text-primary-500 transition-colors">Возврат товара</Link></li>
              <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Контакты</Link></li>
              <li><Link href="/b2b" className="hover:text-primary-500 transition-colors">B2B / Оптовые клиенты</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>г. Алматы, ул. Абая 123</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+77001234567" className="hover:text-primary-500 transition-colors">
                  +7 (700) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@elements.kz" className="hover:text-primary-500 transition-colors">
                  info@elements.kz
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-semibold text-white">Режим работы:</p>
              <p className="text-sm">Пн-Пт: 9:00 - 20:00</p>
              <p className="text-sm">Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2024 Elements.KZ. Все права защищены.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary-500 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-primary-500 transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

