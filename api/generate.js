// Konfigurasi khusus Vercel: Mengizinkan payload hingga 4.5MB (Batas maksimal Hobby Tier)
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4.5mb',
        },
    },
};

export default async function handler(req, res) {
    // Hanya izinkan method POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { apiKey, image, reference_video } = req.body;

    if (!apiKey || !image || !reference_video) {
        return res.status(400).json({ error: 'Missing apiKey, image, or reference_video' });
    }

    try {
        // Tembak server asli Magnific
        const magnificRes = await fetch('https://api.magnific.com/v1/ai/image-to-video/motion-control', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-magnific-api-key': apiKey // Menggunakan kunci milik pengguna
            },
            body: JSON.stringify({
                image: image,
                reference_video: reference_video
            })
        });

        // Parse respons dari Magnific
        const data = await magnificRes.json();

        // Jika Magnific menolak (misal API key salah atau habis limit)
        if (!magnificRes.ok) {
            return res.status(magnificRes.status).json({ error: data.detail || 'Terjadi kesalahan pada Magnific API' });
        }

        // Kembalikan Task ID ke Frontend
        res.status(200).json(data);

    } catch (error) {
        console.error('Error saat menghubungi Magnific:', error);
        res.status(500).json({ error: 'Internal Server Error (Vercel)' });
    }
}