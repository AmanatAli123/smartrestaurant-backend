const express = require('express');
const router  = express.Router();
const { getChatReply, getRecommendations, getRestaurantMenu } = require('../aiService');

// ══════════════════════════════════════════════════════════
// POST /api/ai/chat
// Flutter sends: { message, history, restaurant_id, menu }
// ══════════════════════════════════════════════════════════
router.post('/chat', async (req, res) => {
    try {
        const {
            message,
            history       = [],
            restaurant_id = 'rest_001',
            menu          = []          // Flutter sends menu dynamically
        } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required' });
        }

        const result = await getChatReply(message, history, restaurant_id, menu);

        if (!result.success) {
            return res.status(503).json({
                error: 'AI service unavailable',
                reply: result.reply
            });
        }

        return res.json({
            success:       true,
            reply:         result.reply,
            restaurant_id: restaurant_id
        });

    } catch (error) {
        console.error('[routes/ai] /chat error:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

// ══════════════════════════════════════════════════════════
// POST /api/ai/recommend
// Flutter sends: { item_id, restaurant_id, menu }
// ══════════════════════════════════════════════════════════
router.post('/recommend', async (req, res) => {
    try {
        const {
            item_id,
            restaurant_id = 'rest_001',
            menu          = []
        } = req.body;

        if (!item_id) {
            return res.status(400).json({ error: 'item_id is required' });
        }

        const result = await getRecommendations(item_id, restaurant_id, menu);

        if (!result.success) {
            return res.status(503).json({ error: 'Recommendation service unavailable' });
        }

        return res.json({ success: true, ...result.data });

    } catch (error) {
        console.error('[routes/ai] /recommend error:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

// ══════════════════════════════════════════════════════════
// GET /api/ai/menu/:restaurantId
// Returns menu for a restaurant from the AI service
// ══════════════════════════════════════════════════════════
router.get('/menu/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const result = await getRestaurantMenu(restaurantId);

        if (!result.success) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        return res.json({ success: true, ...result.data });

    } catch (error) {
        console.error('[routes/ai] /menu error:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
