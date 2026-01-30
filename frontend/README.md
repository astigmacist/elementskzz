# Elements KZ - Frontend

Next.js приложение для интернет-магазина Elements KZ.

## Технологии

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (State Management)
- **Axios** (HTTP Client)
- **React Icons**
- **React Hot Toast** (Notifications)

## Установка

```bash
# Установить зависимости
npm install
# или
yarn install

# Создать .env.local файл
cp .env.local.example .env.local

# Запустить development сервер
npm run dev
# или
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React компоненты
│   │   ├── layout/       # Header, Footer
│   │   ├── home/         # Компоненты главной страницы
│   │   └── products/     # Компоненты товаров
│   ├── lib/              # Утилиты
│   │   └── api.ts        # API клиент
│   ├── store/            # Zustand stores
│   │   ├── useCartStore.ts
│   │   ├── useAuthStore.ts
│   │   └── useWishlistStore.ts
│   └── types/            # TypeScript типы
│       └── index.ts
├── public/               # Статические файлы
└── package.json
```

## Основные страницы

- `/` - Главная страница
- `/catalog` - Каталог товаров
- `/product/[slug]` - Страница товара
- `/cart` - Корзина
- `/checkout` - Оформление заказа
- `/profile` - Профиль пользователя
- `/orders` - История заказов
- `/wishlist` - Избранное

## Команды

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

## API Integration

Frontend подключается к Django API через Axios. Конфигурация в `src/lib/api.ts`.

Все запросы к API используют JWT токены для аутентификации.

