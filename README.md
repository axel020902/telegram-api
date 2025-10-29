# Telegram API для сайта УютСтрой72

Serverless функция на Vercel для отправки сообщений в Telegram.

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

### API Endpoint:
```
POST https://your-project.vercel.app/api/telegram
```

### Пример запроса:
```javascript
fetch('https://your-project.vercel.app/api/telegram', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Текст сообщения'
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

## 🆔 Данные бота

- **Bot Token:** 8050200832:AAH5ScyG__5FCxX9_nEDdU0QrRCGvXlIU58
- **Chat ID:** -1003143740246

## 📝 После деплоя

Замените в вашем сайте на reg.ru:
1. В `index.html` найдите все `await fetch('/api/telegram'`
2. Замените на `await fetch('https://ВАШ-ПРОЕКТ.vercel.app/api/telegram'`
3. Загрузите обновленный HTML на reg.ru
4. Готово! ✅

