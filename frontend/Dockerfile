FROM node:18-alpine

WORKDIR /app

# Копирование package files
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование кода
COPY . .

# Порт
EXPOSE 3000

# Команда по умолчанию
CMD ["npm", "run", "dev"]

