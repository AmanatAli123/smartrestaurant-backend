const axios = require('axios');
require('dotenv').config();

const AI_BASE_URL = process.env.AI_SERVICE_URL || 'https://smartrestaurant-ai.onrender.com';

// ─── Chat with AI chatbot ──────────────────────────────────
// Now passes restaurant_id and menu so AI knows which restaurant
async function getChatReply(message, history = [], restaurantId = 'rest_001', menu = []) {
    try {
        const response = await axios.post(`${AI_BASE_URL}/chat`, {
            message,
            history,
            restaurant_id: restaurantId,
            menu           // dynamic menu from Flutter/database
        }, {
            timeout: 15000  // 15 second timeout
        });
        return { success: true, reply: response.data.reply };
    } catch (error) {
        console.error('[aiService] getChatReply error:', error.message);
        return { success: false, reply: 'AI service unavailable. Please try again.' };
    }
}

// ─── Get food recommendations ──────────────────────────────
// Now passes restaurant_id and menu so recommendations are restaurant-specific
async function getRecommendations(itemId, restaurantId = 'rest_001', menu = []) {
    try {
        const response = await axios.post(`${AI_BASE_URL}/recommend`, {
            item_id:       itemId,
            restaurant_id: restaurantId,
            menu           // dynamic menu
        }, {
            timeout: 10000
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('[aiService] getRecommendations error:', error.message);
        return { success: false, data: null };
    }
}

// ─── Get full menu for a restaurant ───────────────────────
async function getRestaurantMenu(restaurantId) {
    try {
        const response = await axios.get(`${AI_BASE_URL}/menu/${restaurantId}`, {
            timeout: 10000
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('[aiService] getRestaurantMenu error:', error.message);
        return { success: false, data: null };
    }
}

module.exports = { getChatReply, getRecommendations, getRestaurantMenu };
