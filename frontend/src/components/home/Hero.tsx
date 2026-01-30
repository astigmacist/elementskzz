import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container-custom py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">
            Электроника и техника <br />
            для дома и офиса
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Широкий ассортимент компьютеров, ноутбуков, аксессуаров и принтеров 
            с доставкой по всему Казахстану
          </p>
          <div className="flex gap-4">
            <Link href="/catalog" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Перейти в каталог
            </Link>
            <Link href="/deals" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Акции и скидки
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

