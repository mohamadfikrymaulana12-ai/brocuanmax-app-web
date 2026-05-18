const express = require('express');
const app = express();

// Menangani payload besar
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rute untuk mengecek status (Status API)
app.get('/api/status', async (req, res) => {
    const { taskId } = req.query;
    const apiKey = req.headers['x-magnific-api-key'];

    if (!taskId || !apiKey) {
        return res.status(400).json({ error: 'Missing taskId or API Key' });
    }

    try {
        const magnificRes = await fetch(`https://api.magnific.com/v1/ai/tasks/${taskId}`, {
            method: 'GET',
            headers: {
                'x-magnific-api-key': apiKey
            }
        });

        const data = await magnificRes.json();
        res.status(magnificRes.status).json(data);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error pada Vercel Proxy' });
    }
});

// Rute untuk generate video
app.post('/api/generate', async (req, res) => {
    const { apiKey, image, reference_video } = req.body;

    if (!apiKey || !image || !reference_video) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const magnificRes = await fetch('https://api.magnific.com/v1/ai/image-to-video/motion-control', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-magnific-api-key': apiKey
            },
            body: JSON.stringify({ image, reference_video })
        });

        const data = await magnificRes.json();
        res.status(magnificRes.status).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mengekspor aplikasi Express untuk Vercel
module.exports = app;
