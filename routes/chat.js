const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const {verifyAdminToken, verifyUserHaveAccessToken} = require("../middleware/authMiddleware");

router.get('', chatController.getAllChatsOfUser);
router.get('/all', verifyAdminToken, chatController.getAllChats);
router.get('/:chat_id', verifyUserHaveAccessToken, chatController.getChatById);

module.exports = router;