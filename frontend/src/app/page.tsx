import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import NewArrivals from '@/components/home/NewArrivals'
import Deals from '@/components/home/Deals'
import Advantages from '@/components/home/Advantages'
import SmartphonesSection from '@/components/home/SmartphonesSection'
import LaptopsSection from '@/components/home/LaptopsSection'
import BudgetSection from '@/components/home/BudgetSection'
import AccessoriesSection from '@/components/home/AccessoriesSection'

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Advantages Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="container-custom">
          <Advantages />
        </div>
      </section>

      {/* Categories */}
      <section className="container-custom py-12">
        <Categories />
      </section>

      {/* Лучшие предложения - Deals */}
      <Deals />

      {/* Смартфоны и телефоны */}
      <SmartphonesSection />

      {/* Featured Products - Популярные товары */}
      <section className="bg-white py-12">
        <div className="container-custom">
          <FeaturedProducts />
        </div>
      </section>

      {/* Ноутбуки для работы и игр */}
      <LaptopsSection />

      {/* New Arrivals - Новинки */}
      <section className="container-custom py-12">
        <NewArrivals />
      </section>

      {/* Аксессуары */}
      <AccessoriesSection />

      {/* Дешевле 50,000 ₸ */}
      <BudgetSection />
    </div>
  )
}

