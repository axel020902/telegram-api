# API для сайта УютСтрой72 (Telegram + Бронирования + Отзывы)

Serverless функции на Vercel для работы сайта:
- 📧 Отправка сообщений в Telegram
- 📅 Управление бронированиями
- ⭐ Управление отзывами

## 🚀 Деплой на Vercel

### Способ 1: Через GitHub (рекомендуется)

1. Создайте новый репозиторий на GitHub: `telegram-api`
2. Загрузите все файлы из этой папки
3. Зайдите на [vercel.com](https://vercel.com)
4. Нажмите "New Project"
5. Импортируйте репозиторий `telegram-api`
6. Deploy!

### Способ 2: Через Vercel CLI

```bash
npm install -g vercel
cd telegram-api-vercel
vercel
```

## 📡 После деплоя

Вы получите URL вида: `https://your-project.vercel.app`

### API Endpoints:
```
POST   /api/telegram  - Отправка в Telegram
GET    /api/bookings  - Получить бронирования
POST   /api/bookings  - Создать бронирование
DELETE /api/bookings  - Удалить бронирование
GET    /api/reviews   - Получить отзывы
POST   /api/reviews   - Создать отзыв
DELETE /api/reviews   - Удалить отзыв
```

### Примеры запросов:

**Отправка в Telegram:**
```javascript
fetch('https://your-project.vercel.app/api/telegram', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Текст сообщения' })
})
```

**Получить бронирования:**
```javascript
fetch('https://your-project.vercel.app/api/bookings')
```

**Создать бронирование:**
```javascript
fetch('https://your-project.vercel.app/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Иван Иванов',
    phone: '+79001234567',
    date: '2025-11-01'
  })
})
```

## 🔧 Использование на сайте (reg.ru)

В вашем HTML на reg.ru измените URL API:

**Было:**
```javascript
await fetch('/api/telegram', { ... })
```

**Стало:**
```javascript
await fetch('https://your-project.vercel.app/api/telegram', { ... })
```

## ✅ Преимущества

- ✅ Работает из России (Vercel не блокируется)
- ✅ Поддержка UTF-8 (русский текст)
- ✅ Бесплатно (Vercel free tier)
- ✅ Быстро и надежно
- ✅ Не нужен отдельный прокси-сервер

## 🆔 Настройка Telegram

Добавьте в настройках окружения Vercel переменные `TELEGRAM_BOT_TOKEN` и
`TELEGRAM_CHAT_ID`. Не храните эти значения в исходном коде или документации.

## 📝 После деплоя

Замените в вашем сайте на reg.ru:
1. В `index.html`, `manage_bookings.html`, `manage_reviews.html` найдите все `/api/telegram`, `/api/bookings`, `/api/reviews`
2. Замените на `https://ВАШ-ПРОЕКТ.vercel.app/api/...`
3. Загрузите обновленные файлы на reg.ru
4. Готово! ✅

## 💾 Хранение данных

- **Без Vercel KV**: Данные хранятся в памяти (сбрасываются при перезапуске функции)
- **С Vercel KV** (опционально): Постоянное хранилище
  
Для бесплатного использования достаточно хранения в памяти!
