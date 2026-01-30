# 👥 Инструкция для команды Elements KZ

## 📥 Как скачать проект первый раз

### 1. Установить необходимые программы

**macOS:**
```bash
# Установить Homebrew (если нет)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Установить Node.js и npm
brew install node

# Установить Python 3
brew install python@3.11

# Установить PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# Установить Git (обычно уже установлен)
git --version
```

### 2. Клонировать репозиторий

```bash
# Перейти в папку где хотите сохранить проект
cd ~/Desktop

# Клонировать проект (ЗАМЕНИТЕ URL на ваш GitHub URL!)
git clone https://github.com/ВАШ-USERNAME/elementskz.git

# Перейти в папку проекта
cd elementskz
```

---

## 🔧 Настройка Backend (Django)

```bash
# 1. Перейти в папку backend
cd backend

# 2. Создать виртуальное окружение
python3 -m venv venv

# 3. Активировать виртуальное окружение
source venv/bin/activate

# 4. Установить зависимости
pip install -r requirements.txt

# 5. Создать базу данных
createdb elementskz

# 6. Применить миграции
python manage.py migrate

# 7. Создать суперпользователя (для админки)
python manage.py createsuperuser --username admin --email admin@elementskz.com
# Пароль: admin123 (или свой)

# 8. Запустить сервер
python manage.py runserver
```

Backend будет работать на: **http://localhost:8000**  
Админка: **http://localhost:8000/admin/**

---

## 🎨 Настройка Frontend (Next.js)

```bash
# 1. Открыть НОВЫЙ терминал и перейти в папку frontend
cd frontend

# 2. Установить зависимости
npm install

# 3. Запустить development сервер
npm run dev
```

Frontend будет работать на: **http://localhost:3000**

---

## 🔄 Ежедневная работа с Git

### Утро - Скачать изменения от команды

```bash
# Перейти в папку проекта
cd ~/Desktop/elementskz

# Скачать все изменения
git pull

# Установить новые зависимости (если были изменения)
cd backend && source venv/bin/activate && pip install -r requirements.txt
cd ../frontend && npm install
```

### Работа над кодом

```bash
# 1. Посмотреть что изменилось
git status

# 2. Добавить изменения
git add .

# 3. Сделать commit (с описанием что сделали)
git commit -m "Добавил страницу каталога товаров"

# 4. Отправить на GitHub
git push
```

### Конфликты (если вы оба меняли один файл)

```bash
# Если при git pull возникли конфликты:

# 1. Посмотреть конфликтующие файлы
git status

# 2. Открыть файлы и исправить конфликты вручную
# Найдите строки с <<<<<<< HEAD

# 3. После исправления:
git add .
git commit -m "Решил конфликты"
git push
```

---

## 🌿 Работа с ветками (рекомендуется)

**Лучше работать в отдельных ветках, чтобы не мешать друг другу!**

```bash
# Создать свою ветку для новой фичи
git checkout -b feature/корзина

# Работать в своей ветке
# ... делаете изменения ...

# Сохранить и отправить
git add .
git commit -m "Добавил функцию добавления в корзину"
git push -u origin feature/корзина

# Когда готово - вернуться в main и объединить
git checkout main
git merge feature/корзина
git push
```

---

## 📋 Распределение задач

### Предлагаемое разделение:

**Разработчик 1:**
- Frontend: Главная страница, каталог, карточка товара
- UI/UX компоненты

**Разработчик 2:**
- Backend: API, модели, админка
- Интеграция frontend с backend

**Или работайте по фичам:**
- Один делает корзину (frontend + backend)
- Другой делает авторизацию (frontend + backend)

---

## ⚠️ Важные правила

### ❌ НИКОГДА не коммитить:
- `node_modules/` (слишком большие, устанавливаются через npm install)
- `venv/` (виртуальное окружение, создается локально)
- `.env` файлы (могут содержать пароли)
- `media/` с изображениями (лучше на CDN)

### ✅ Всегда коммитить:
- Исходный код (`.py`, `.tsx`, `.ts`)
- Конфиги (`package.json`, `requirements.txt`)
- README и документацию
- `.gitignore`

### 📞 Коммуникация:
- Договоритесь кто над чем работает (чтобы не менять одни файлы)
- Делайте `git pull` перед началом работы
- Делайте `git push` после каждой законченной задачи
- Пишите понятные commit-сообщения

---

## 🆘 Если что-то сломалось

### Backend не запускается:
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```

### Frontend не запускается:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### База данных не работает:
```bash
# Проверить запущен ли PostgreSQL
brew services list

# Перезапустить
brew services restart postgresql@15

# Пересоздать базу
dropdb elementskz
createdb elementskz
cd backend && python manage.py migrate
```

---

## 📞 Контакты команды

**Erbol:** admin@elementskz.com  
**Teammate:** teammate@elementskz.com

**Админка:**
- Email: `admin@elementskz.com`
- Пароль: `admin123`

---

## 🚀 Полезные ссылки

- [Django документация](https://docs.djangoproject.com/)
- [Next.js документация](https://nextjs.org/docs)
- [Git туториал](https://git-scm.com/book/ru/v2)
- [GitHub Desktop](https://desktop.github.com/) - GUI для Git (если не любите терминал)

---

**Удачи команде! 🎉**
