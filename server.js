const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/menu', require('./routes/menu'));

app.get('/health', (req, res) => {
    res.json({
        status: 'running',
        message: 'SmartRestaurant Backend is live',
        endpoints: [
            'POST /api/auth/register',
            'POST /api/auth/login',
            'POST /api/ai/chat',
            'POST /api/ai/recommend',
            'GET  /api/menu',
            'GET  /api/menu/:id'
        ]
    });
});

// ─── Keep Render AI service awake ─────────────────────────
setInterval(async () => {
    try {
        await axios.get('https://smartrestaurant-ai.onrender.com/health');
        console.log('✓ AI service kept awake');
    } catch (e) {
        console.log('✗ AI service ping failed');
    }
}, 14 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});