module.exports = async function (req, res) {
    // 1. Tolak jika bukan metode GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 2. Ambil parameter dari Frontend
    const taskId = req.query.taskId;
    const apiKey = req.headers['x-magnific-api-key'];

    if (!taskId || !apiKey) {
        return res.status(400).json({ error: 'Data tidak lengkap. Task ID atau API Key hilang.' });
    }

    // 3. Cek status ke server Magnific
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
        return res.status(500).json({ error: 'Gagal mengecek status ke Magnific: ' + error.message });
    }
};