# Elements KZ - Интернет-магазин электроники

Онлайн магазин для продажи техники, компьютеров, аксессуаров, принтеров и других электронных товаров.

## 🛠 Технологический стек

### Frontend
- **Next.js 14** (React 18)
- **TypeScript**
- **Tailwind CSS**
- **Axios** для API запросов
- **Zustand** для state management

### Backend
- **Django 5.0**
- **Django REST Framework**
- **PostgreSQL**
- **JWT Authentication**
- **Pillow** для работы с изображениями

## 📁 Структура проекта

```
elementskz/
├── frontend/           # Next.js приложение
│   ├── src/
│   │   ├── app/       # App Router (Next.js 14)
│   │   ├── components/
│   │   ├── lib/
│   │   ├── types/
│   │   └── store/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/           # Django приложение
│   ├── config/       # Настройки Django
│   ├── products/     # Модели товаров
│   ├── orders/       # Модели заказов
│   ├── users/        # Модели пользователей
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

## 🚀 Установка и запуск

### Требования
- Node.js 18+ и npm/yarn
- Python 3.11+
- PostgreSQL 14+

### 1. Клонирование репозитория
```bash
cd elementskz
```

### 2. Настройка Backend (Django)

```bash
# Переходим в папку backend
cd backend

# Создаем виртуальное окружение
python3 -m venv venv

# Активируем виртуальное окружение
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# Устанавливаем зависимости
pip install -r requirements.txt

# Создаем базу данных PostgreSQL
# Сначала зайдите в PostgreSQL:
# psql postgres
# CREATE DATABASE elementskz;
# CREATE USER elementskz_user WITH PASSWORD 'your_password';
# GRANT ALL PRIVILEGES ON DATABASE elementskz TO elementskz_user;
# \q

# Копируем .env файл
cp .env.example .env
# Отредактируйте .env файл с вашими настройками

# Применяем миграции
python manage.py migrate

# Создаем суперпользователя
python manage.py createsuperuser

# Загружаем начальные данные (опционально)
python manage.py loaddata initial_data.json

# Запускаем сервер
python manage.py runserver
```

Backend будет доступен на: http://localhost:8000
Admin панель: http://localhost:8000/admin

### 3. Настройка Frontend (Next.js)

```bash
# Переходим в папку frontend (из корня проекта)
cd frontend

# Устанавливаем зависимости
npm install
# или
yarn install

# Копируем .env файл
cp .env.example .env.local
# Отредактируйте .env.local файл

# Запускаем development сервер
npm run dev
# или
yarn dev
```

Frontend будет доступен на: http://localhost:3000

## 📱 Основные страницы

- `/` - Главная страница
- `/catalog` - Каталог товаров
- `/catalog/[category]` - Категория товаров
- `/product/[id]` - Карточка товара
- `/cart` - Корзина
- `/checkout` - Оформление заказа
- `/profile` - Личный кабинет
- `/admin` - Админ панель (Django)

## 🔑 API Endpoints

### Товары
- `GET /api/products/` - Список товаров
- `GET /api/products/{id}/` - Детали товара
- `GET /api/categories/` - Список категорий

### Корзина
- `GET /api/cart/` - Получить корзину
- `POST /api/cart/add/` - Добавить в корзину
- `DELETE /api/cart/remove/{id}/` - Удалить из корзины

### Заказы
- `GET /api/orders/` - История заказов
- `POST /api/orders/create/` - Создать заказ

### Пользователи
- `POST /api/auth/register/` - Регистрация
- `POST /api/auth/login/` - Вход
- `GET /api/auth/profile/` - Профиль пользователя

## 🐳 Docker (опционально)

```bash
# Запуск всего проекта через Docker
docker-compose up -d
```

## 📝 Полезные команды

### Backend
```bash
# Создать новое приложение Django
python manage.py startapp app_name

# Создать миграции
python manage.py makemigrations

# Применить миграции
python manage.py migrate

# Создать суперпользователя
python manage.py createsuperuser

# Запустить тесты
python manage.py test
```

### Frontend
```bash
# Сборка production версии
npm run build

# Запуск production сервера
npm run start

# Проверка кода
npm run lint
```

## 📄 Лицензия

MIT

## 👥 Команда

Elements KZ Team

