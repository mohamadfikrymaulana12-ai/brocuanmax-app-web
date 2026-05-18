module.exports = async function handler(req, res) {
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
}
