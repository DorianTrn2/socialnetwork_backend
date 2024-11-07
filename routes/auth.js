const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.get('/login', (req, res) => res.render("login.pug", { title: "Sign up !" }));
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
