# 🍎 Установка для MacBook - Пошаговая инструкция

## ✅ Что УЖЕ установлено на вашем Mac:

- ✅ **Python 3.14.0** - Отлично!
- ✅ **Node.js v22.17.0** - Отлично!
- ✅ **npm 10.9.2** - Отлично!

## 📦 Что нужно установить:

1. **Homebrew** - Менеджер пакетов для macOS
2. **PostgreSQL** - База данных

---

## Шаг 1: Установка Homebrew

Homebrew - это менеджер пакетов для macOS, который упрощает установку программ.

**Откройте Терминал** (Terminal) и выполните:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

⚠️ **Вас попросят ввести пароль администратора** - это нормально, введите пароль от вашего Mac.

После установки, выполните команды которые покажет установщик (обычно это):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Проверьте установку:**

```bash
brew --version
```

Вы должны увидеть версию Homebrew (например, `Homebrew 4.x.x`)

---

## Шаг 2: Установка PostgreSQL

Теперь установим PostgreSQL через Homebrew:

```bash
brew install postgresql@15
```

**Запустите PostgreSQL:**

```bash
brew services start postgresql@15
```

**Добавьте PostgreSQL в PATH:**

```bash
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zprofile
source ~/.zprofile
```

**Проверьте установку:**

```bash
psql --version
```

Вы должны увидеть: `psql (PostgreSQL) 15.x`

---

## Шаг 3: Создание базы данных

Теперь создадим базу данных для проекта:

```bash
# Подключаемся к PostgreSQL
psql postgres

# Выполните эти команды в psql:
CREATE DATABASE elementskz;
CREATE USER elementskz_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE elementskz TO elementskz_user;

# Для PostgreSQL 15+ нужна дополнительная команда:
\c elementskz
GRANT ALL ON SCHEMA public TO elementskz_user;

# Выход из psql
\q
```

✅ База данных создана!

---

## Шаг 4: Настройка Backend (Django)

Перейдите в папку проекта:

```bash
cd /Users/erbolsadibekov/Desktop/elementskz/backend
```

**Создайте виртуальное окружение Python:**

```bash
python3 -m venv venv
```

**Активируйте виртуальное окружение:**

```bash
source venv/bin/activate
```

Теперь в начале строки терминала должно появиться `(venv)` - это значит окружение активировано.

**Установите Python зависимости:**

```bash
pip install -r requirements.txt
```

Это займет несколько минут.

**Создайте файл `.env` с настройками:**

```bash
cat > .env << 'EOF'
SECRET_KEY=django-insecure-your-secret-key-change-in-production-123456789
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=elementskz
DB_USER=elementskz_user
DB_PASSWORD=password123
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440
EOF
```

**Примените миграции базы данных:**

```bash
python manage.py migrate
```

**Создайте суперпользователя для админ панели:**

```bash
python manage.py createsuperuser
```

Вам нужно будет ввести:
- Email: ваш email (например, admin@example.com)
- Username: имя пользователя (например, admin)
- Password: пароль (минимум 8 символов)
- Password (again): повторите пароль

**Запустите Django сервер:**

```bash
python manage.py runserver
```

✅ **Backend запущен!** Откройте в браузере:
- API: http://localhost:8000/api
- Admin: http://localhost:8000/admin

Войдите в админку с созданным суперпользователем.

---

## Шаг 5: Настройка Frontend (Next.js)

**Откройте НОВЫЙ терминал** (не закрывайте предыдущий с Django!)

Перейдите в папку frontend:

```bash
cd /Users/erbolsadibekov/Desktop/elementskz/frontend
```

**Установите Node.js зависимости:**

```bash
npm install
```

Это займет несколько минут.

**Создайте файл `.env.local` с настройками:**

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
```

**Запустите Next.js сервер:**

```bash
npm run dev
```

✅ **Frontend запущен!** Откройте в браузере:
- Главная страница: http://localhost:3000

---

## 🎉 Готово! Проверьте работу:

### У вас должны работать 2 терминала:

**Терминал 1 - Django Backend:**
```bash
cd /Users/erbolsadibekov/Desktop/elementskz/backend
source venv/bin/activate
python manage.py runserver
```

**Терминал 2 - Next.js Frontend:**
```bash
cd /Users/erbolsadibekov/Desktop/elementskz/frontend
npm run dev
```

### Откройте в браузере:

1. **Frontend**: http://localhost:3000 - главная страница магазина
2. **Admin панель**: http://localhost:8000/admin - управление товарами
3. **API**: http://localhost:8000/api - REST API

---

## 📝 Добавление товаров

1. Зайдите в админ панель: http://localhost:8000/admin
2. Войдите с созданным суперпользователем
3. Добавьте:
   - **Категории** (Categories)
   - **Бренды** (Brands)
   - **Товары** (Products) с изображениями

После добавления товаров, они появятся на главной странице!

---

## ⚠️ Частые проблемы:

### PostgreSQL не запускается?

```bash
brew services restart postgresql@15
```

### Забыли активировать venv?

```bash
cd backend
source venv/bin/activate
```

### Ошибка при миграциях?

```bash
python manage.py makemigrations
python manage.py migrate
```

### Порт занят?

Закройте другие запущенные серверы или измените порт:

```bash
# Django на другом порту
python manage.py runserver 8001

# Next.js на другом порту
npm run dev -- -p 3001
```

---

## 🔄 Как запустить проект в следующий раз:

**Терминал 1 - Backend:**
```bash
cd /Users/erbolsadibekov/Desktop/elementskz/backend
source venv/bin/activate
python manage.py runserver
```

**Терминал 2 - Frontend:**
```bash
cd /Users/erbolsadibekov/Desktop/elementskz/frontend
npm run dev
```

---

## 🎯 Что дальше?

1. ✅ Добавьте товары через админ панель
2. ✅ Создайте категории и бренды
3. ✅ Загрузите изображения товаров
4. ✅ Протестируйте регистрацию пользователей
5. ✅ Проверьте добавление в корзину

**Готово! Ваш интернет-магазин работает!** 🚀

