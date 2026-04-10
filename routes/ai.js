const express = require('express');
const router = express.Router();
const { getChatReply, getRecommendations } = require('../aiService');

router.post('/chat', async (req, res) => {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const result = await getChatReply(message, history || []);
    res.json(result);
});

router.post('/recommend', async (req, res) => {
    const { item_id } = req.body;
    if (!item_id) return res.status(400).json({ error: 'item_id is required' });
    const result = await getRecommendations(item_id);
    res.json(result);
});

module.exports = router;