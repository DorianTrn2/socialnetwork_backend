const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const {verifyAdminToken, verifyUserHaveAccessToChat} = require("../middleware/authMiddleware");
const messageRouter = require('./message.js');

router.get('', chatController.getAllChatsOfUser);
router.get('/all', verifyAdminToken, chatController.getAllChats);
router.post('/new', chatController.addChat);

// You must be user of chat or admin to go there
router.use('/:chat_id', verifyUserHaveAccessToChat, messageRouter);

module.exports = router;