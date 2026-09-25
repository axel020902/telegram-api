// Vercel Serverless Function для отправки в Telegram
// Использует прямую отправку в Telegram API с поддержкой UTF-8

export default async function handler(req, res) {
    // CORS headers для доступа с любого домена
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        return res.status(503).json({
            success: false,
            error: 'Telegram integration is not configured'
        });
    }

    try {
        // Отправка напрямую в Telegram API с UTF-8
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        // Определяем, содержит ли сообщение HTML теги
        const hasHtmlTags = /<[^>]+>/.test(message);
        
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            signal: controller.signal,
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                // Используем HTML режим только если есть HTML теги
                ...(hasHtmlTags && { parse_mode: 'HTML' })
            })
        });

        clearTimeout(timeout);
        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({ 
                success: true, 
                message_id: data.result?.message_id 
            });
        } else {
            return res.status(500).json({ 
                success: false, 
                error: data.description || 'Telegram API error'
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.name === 'AbortError'
                ? 'Telegram service did not respond in time'
                : (error.message || 'Internal server error')
        });
    }
}
