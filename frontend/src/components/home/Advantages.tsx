import { FiTruck, FiClock, FiHeadphones, FiGift } from 'react-icons/fi'

export default function Advantages() {
  const advantages = [
    {
      icon: FiTruck,
      title: 'Быстрая доставка',
      description: 'Быстро и аккуратно доставим заказы по всему Казахстану',
    },
    {
      icon: FiClock,
      title: 'Работаем с 2024',
      description: 'Надежный магазин с проверенным качеством товаров',
    },
    {
      icon: FiHeadphones,
      title: 'Забота и поддержка',
      description: 'Информируем на каждом этапе и помогаем при любых вопросах',
    },
    {
      icon: FiGift,
      title: 'Бонусы за покупки',
      description: 'Начисляем до 2% с каждой покупки и возвращаем их на ваш счёт',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {advantages.map((item, index) => {
        const Icon = item.icon
        return (
          <div
            key={index}
            className="card p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}

