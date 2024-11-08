const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const messageController = require("../controllers/messageController");
const path = require("path");

router.get('', chatController.getChatById);
router.post('/new', messageController.addMessage);

// TODO this url is here for back end tests purposes. To remove when creating front end
router.get('/test', (req, res) => res.render(
    "chat.pug",
    {
        userEmail: req.userEmail,
        chatId: req.chat_id,
    }
));

module.exports = router;