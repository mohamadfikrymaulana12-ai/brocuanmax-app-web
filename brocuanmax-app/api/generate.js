module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Hanya menerima metode POST' });
    }

    const { apiKey, image, reference_video } = req.body;

    if (!apiKey || !image || !reference_video) {
        return res.status(400).json({ error: 'Data tidak lengkap. API Key, Gambar, dan Video wajib ada.' });
    }

    try {
        const magnificRes = await fetch('https://api.magnific.com/v1/ai/image-to-video/motion-control', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-magnific-api-key': apiKey
            },
            body: JSON.stringify({
                image: image,
                reference_video: reference_video
            })
        });

        const data = await magnificRes.json();
        res.status(magnificRes.status).json(data);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error pada Vercel Proxy' });
    }
}
