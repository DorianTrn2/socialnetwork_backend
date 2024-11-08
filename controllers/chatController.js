const chatService = require("../services/chatService")
const messageService = require("../services/messageService")
const userService = require("../services/userService");

async function getAllChats(req, res) {
    try {
        const chats = await chatService.getAllChats();

        if (chats === null) {
            return res.status(404).json({message: 'Error - received object is null'});
        }

        // Append users to chat
        for (let i = 0; i < chats.length; i++) {
            chats[i] = {
                _id: chats[i]._id,
                user_email1: chats[i].user_email1,
                user_email2: chats[i].user_email2,
                user1: await userService.getUserByEmail(chats[i].user_email1),
                user2: await userService.getUserByEmail(chats[i].user_email2),
            };
        }

        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function getAllChatsOfUser(req, res) {
    try {
        const userEmail = req.userEmail;

        if (!userEmail) {
            return res.status(404).json({message: 'Error - no user email provided, please authenticate'});
        }

        const chats = await chatService.getAllChatsOfUser(userEmail);

        if (chats === null) {
            return res.status(404).json({message: 'Error - received object is null'});
        }

        // Append users to chat
        for (let i = 0; i < chats.length; i++) {
            chats[i] = {
                _id: chats[i]._id,
                user_email1: chats[i].user_email1,
                user_email2: chats[i].user_email2,
                user1: await userService.getUserByEmail(chats[i].user_email1),
                user2: await userService.getUserByEmail(chats[i].user_email2),
            };
        }

        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function getChatById(req, res) {
    try {
        const {chat_id} = req;

        if (!chat_id) {
            return res.status(404).json({message: 'Error - parameter chat_id is undefined'});
        }

        const chat = await chatService.getChatById(chat_id);

        if (chat === null) {
            return res.status(404).json({message: 'Error - received object is null'});
        }

        const messages = await messageService.getAllMessagesByChatId(chat_id);

        if (messages === null) {
            return res.status(404).json({message: 'Error - received object is null'});
        }

        res.status(200).json({
            _id: chat._id,
            user_email1: chat.user_email1,
            user_email2: chat.user_email2,
            user1: await userService.getUserByEmail(chat.user_email1),
            user2: await userService.getUserByEmail(chat.user_email2),
            messages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    getAllChats,
    getAllChatsOfUser,
    getChatById,
}
