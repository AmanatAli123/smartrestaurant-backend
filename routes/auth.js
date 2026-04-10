const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = users.find(u => u.email === email);
        if (exists) return res.status(400).json({ error: 'Email already registered' });
        const hashed = await bcrypt.hash(password, 10);
        const user = { id: users.length + 1, name, email, password: hashed };
        users.push(user);
        res.json({ message: 'Registered successfully', user: { id: user.id, name, email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Wrong password' });
        const token = jwt.sign(
            { id: user.id, email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ token, user: { id: user.id, name: user.name, email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;