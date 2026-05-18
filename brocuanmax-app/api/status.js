export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { taskId } = req.query;
    // Mengambil API Key dari header yang dikirim Frontend
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

        if (!magnificRes.ok) {
            return res.status(magnificRes.status).json({ error: data.detail || 'Gagal mengecek status' });
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error (Vercel)' });
    }
}