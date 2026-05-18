const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Mengaktifkan CORS dan kapasitas payload besar (Anti Error 413)
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Sediakan file statis (index.html)
app.use(express.static(path.join(__dirname)));

// API Route: Generate
app.post('/api/generate', async (req, res) => {
    const { apiKey, image, reference_video } = req.body;

    if (!apiKey || !image || !reference_video) {
        return res.status(400).json({ error: 'Data tidak lengkap.' });
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
        return res.status(magnificRes.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Gagal terhubung ke Magnific: ' + error.message });
    }
});

// API Route: Status
app.get('/api/status', async (req, res) => {
    const taskId = req.query.taskId;
    const apiKey = req.headers['x-magnific-api-key'];

    if (!taskId || !apiKey) {
        return res.status(400).json({ error: 'Task ID atau API Key hilang.' });
    }

    try {
        const magnificRes = await fetch(`https://api.magnific.com/v1/ai/tasks/${taskId}`, {
            method: 'GET',
            headers: { 'x-magnific-api-key': apiKey }
        });

        const data = await magnificRes.json();
        return res.status(magnificRes.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Gagal cek status: ' + error.message });
    }
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});
