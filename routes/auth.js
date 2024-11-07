const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { login, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username: login, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.get('/login', (req, res) =>
    res.render( "login.pug", {title: "Sign up !"}));

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch || !user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.post('/logout', async(req, res) => {
    try{
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
        res.redirect('/');
    }
    catch (error) {
        res.status(500).json({ error: 'Logout failed' });
    }
});

module.exports = router;