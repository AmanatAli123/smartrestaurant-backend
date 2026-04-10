const express = require('express');
const router = express.Router();

const menu = [
    { id: 1, name: 'Chicken Biryani', category: 'rice', price: 450, tags: 'spicy' },
    { id: 2, name: 'Beef Karahi', category: 'curry', price: 650, tags: 'spicy' },
    { id: 3, name: 'Veggie Burger', category: 'fastfood', price: 280, tags: 'mild' },
    { id: 4, name: 'Mango Lassi', category: 'drink', price: 150, tags: 'sweet' },
    { id: 5, name: 'Garlic Naan', category: 'bread', price: 80, tags: 'mild' },
    { id: 6, name: 'Seekh Kebab', category: 'starter', price: 350, tags: 'spicy' },
    { id: 7, name: 'Chicken Tikka', category: 'starter', price: 400, tags: 'spicy' },
    { id: 8, name: 'Raita', category: 'side', price: 60, tags: 'mild' },
    { id: 9, name: 'Gulab Jamun', category: 'dessert', price: 120, tags: 'sweet' },
    { id: 10, name: 'Mutton Karahi', category: 'curry', price: 850, tags: 'spicy' },
    { id: 11, name: 'French Fries', category: 'fastfood', price: 150, tags: 'mild' },
    { id: 12, name: 'Strawberry Milkshake', category: 'drink', price: 180, tags: 'sweet' }
];

router.get('/', (req, res) => {
    res.json({ success: true, total: menu.length, menu });
});

router.get('/:id', (req, res) => {
    const item = menu.find(m => m.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ success: true, item });
});

module.exports = router;