# 🚀 Инструкция по установке Elements KZ

Пошаговое руководство по установке и запуску проекта.

---

## 📋 Требования

Убедитесь, что у вас установлены:

- **Node.js** 18+ и npm/yarn
- **Python** 3.11+
- **PostgreSQL** 14+
- **Git**

---

## 1️⃣ Backend (Django)

### Шаг 1: Переход в папку backend

```bash
cd backend
```

### Шаг 2: Создание виртуального окружения

```bash
# Создаем виртуальное окружение
python3 -m venv venv

# Активируем (macOS/Linux)
source venv/bin/activate

# Активируем (Windows)
venv\Scripts\activate
```

### Шаг 3: Установка зависимостей

```bash
pip install -r requirements.txt
```

### Шаг 4: Настройка PostgreSQL

Войдите в PostgreSQL:

```bash
psql postgres
```

Создайте базу данных:

```sql
CREATE DATABASE elementskz;
CREATE USER elementskz_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE elementskz TO elementskz_user;
\q
```

### Шаг 5: Настройка переменных окружения

Создайте файл `.env` в папке `backend/`:

```bash
# Django Settings
SECRET_KEY=your-very-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=elementskz
DB_USER=elementskz_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# JWT
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440
```

### Шаг 6: Применение миграций

```bash
python manage.py migrate
```

### Шаг 7: Создание суперпользователя

```bash
python manage.py createsuperuser
```

Следуйте инструкциям на экране.

### Шаг 8: Запуск Django сервера

```bash
python manage.py runserver
```

✅ **Backend запущен на:** http://localhost:8000

🔐 **Admin панель:** http://localhost:8000/admin

---

## 2️⃣ Frontend (Next.js)

### Шаг 1: Переход в папку frontend

Откройте новый терминал и перейдите в папку frontend:

```bash
cd frontend
```

### Шаг 2: Установка зависимостей

```bash
npm install
# или
yarn install
```

### Шаг 3: Настройка переменных окружения

Создайте файл `.env.local` в папке `frontend/`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Шаг 4: Запуск Next.js сервера

```bash
npm run dev
# или
yarn dev
```

✅ **Frontend запущен на:** http://localhost:3000

---

## 3️⃣ Первоначальная настройка

### Добавление тестовых данных

1. Войдите в админ панель: http://localhost:8000/admin
2. Используйте созданный суперпользователь
3. Добавьте:
   - Категории товаров
   - Бренды
   - Товары с изображениями

### Тестирование API

Перейдите на: http://localhost:8000/api/

Вы должны увидеть API endpoints:
- `/api/products/`
- `/api/categories/`
- `/api/cart/`
- `/api/orders/`

---

## 4️⃣ Проверка работы

### Backend работает?

Откройте: http://localhost:8000/api/products/

Вы должны увидеть JSON ответ (пустой массив, если нет товаров).

### Frontend работает?

Откройте: http://localhost:3000

Вы должны увидеть главную страницу магазина.

---

## 🐛 Возможные проблемы

### Ошибка подключения к PostgreSQL

```bash
# Проверьте, что PostgreSQL запущен
sudo service postgresql status

# Запустите PostgreSQL (если не запущен)
sudo service postgresql start
```

### Ошибка миграций Django

```bash
# Удалите все миграции и пересоздайте
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
python manage.py makemigrations
python manage.py migrate
```

### Ошибка CORS

Убедитесь, что в `backend/.env` файле указан правильный CORS:

```
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Node modules ошибка

```bash
# Удалите node_modules и переустановите
cd frontend
rm -rf node_modules
npm install
```

---

## 📚 Полезные команды

### Backend

```bash
# Создать миграции
python manage.py makemigrations

# Применить миграции
python manage.py migrate

# Создать суперпользователя
python manage.py createsuperuser

# Запустить тесты
python manage.py test

# Собрать статику
python manage.py collectstatic
```

### Frontend

```bash
# Development
npm run dev

# Production build
npm run build

# Start production
npm run start

# Lint
npm run lint
```

---

## ✅ Готово!

Теперь у вас запущен полноценный интернет-магазин:

- 🎨 **Frontend:** http://localhost:3000
- 🔧 **Backend API:** http://localhost:8000/api
- 👨‍💼 **Admin:** http://localhost:8000/admin

Начните с добавления товаров через админ панель!

