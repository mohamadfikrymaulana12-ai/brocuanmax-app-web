module.exports = async function (req, res) {
    // 1. Tolak jika bukan metode POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. Ambil data dari Frontend
    const { apiKey, image, reference_video } = req.body || {};

    if (!apiKey || !image || !reference_video) {
        return res.status(400).json({ error: 'Data tidak lengkap. Pastikan API Key, Gambar, dan Video tersedia.' });
    }

    // 3. Teruskan ke server Magnific
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
};

// Konfigurasi mutlak Vercel untuk membatasi ukuran payload (Batas maksimal akun gratis Vercel)
module.exports.config = {
    api: {
        bodyParser: {
            sizeLimit: '4.5mb',
        },
    },
};