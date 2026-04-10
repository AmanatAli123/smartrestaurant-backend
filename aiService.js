const axios = require('axios');
require('dotenv').config();

const AI_BASE_URL = process.env.AI_SERVICE_URL;

async function getChatReply(message, history = []) {
    try {
        const response = await axios.post(`${AI_BASE_URL}/chat`, {
            message,
            history
        });
        return { success: true, reply: response.data.reply };
    } catch (error) {
        return { success: false, reply: 'AI service unavailable.' };
    }
}

async function getRecommendations(itemId) {
    try {
        const response = await axios.post(`${AI_BASE_URL}/recommend`, {
            item_id: itemId
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, data: null };
    }
}

module.exports = { getChatReply, getRecommendations };