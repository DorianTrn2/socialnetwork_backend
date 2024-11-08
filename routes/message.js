const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const messageController = require("../controllers/messageController");

router.get('', chatController.getChatById);
router.post('/new', messageController.addMessage);

module.exports = router;