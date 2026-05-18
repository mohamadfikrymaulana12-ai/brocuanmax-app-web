// Menggunakan Vercel Serverless API Murni (Tanpa Express, Tanpa Dependencies)
// Ini menghindari error 500 akibat module 'express' yang tidak ditemukan.

module.exports = async function (req, res) {
    // 1. Rute untuk mengecek status (Status API)
    if (req.method === 'GET' && req.url.includes('/api/status')) {
        const taskId = req.query.taskId; // Vercel otomatis membaca query
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
            return res.status(magnificRes.status).json(data);

        } catch (error) {
            return res.status(500).json({ error: 'Gagal menghubungi server Magnific (Status)' });
        }
    }

    // 2. Rute untuk generate video (Generate API)
    if (req.method === 'POST' && req.url.includes('/api/generate')) {
        const { apiKey, image, reference_video } = req.body; // Vercel otomatis membaca JSON body

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
            return res.status(magnificRes.status).json(data);

        } catch (error) {
            return res.status(500).json({ error: 'Gagal menghubungi server Magnific (Generate)' });
        }
    }

    // 3. Jika rute salah
    return res.status(404).json({ error: 'Route API tidak ditemukan' });
};

// Konfigurasi khusus Vercel agar menerima payload hingga maksimal batas gratisnya
module.exports.config = {
    api: {
        bodyParser: {
            sizeLimit: '4.5mb',
        },
    },
};
