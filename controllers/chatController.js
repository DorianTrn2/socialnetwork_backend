const chatService = require("../services/chatService")
const messageService = require("../services/messageService")
const userService = require("../services/userService");
const Chat = require("../models/Chat");

/**
 * Get all existing chats. Send http status `200` if request is successful, `400` on bad request or `500` on
 * internal server error.
 *
 * @param req
 * @param res
 * @returns all existing chats on success
 */
async function getAllChats(req, res) {
    try {
        const chats = await chatService.getAllChats();

        if (chats === null) {
            return res.status(400).json({message: 'Error - received object is null'});
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

/**
 * Get all chats of a given user. Send http status `200` if request is successful, `400` on bad request or
 * `500` on internal server error.
 *
 * @param req
 * @param res
 * @returns all user chats on success
 */
async function getAllChatsOfUser(req, res) {
    try {
        const userEmail = req.userEmail;

        if (!userEmail) {
            return res.status(400).json({message: 'Error - no user email provided, please authenticate'});
        }

        const chats = await chatService.getAllChatsOfUser(userEmail);

        if (chats === null) {
            return res.status(400).json({message: 'Error - received object is null'});
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

/**
 * Get a chat and its messages by its id. Send http status `200` if request is successful, `400` on bad request or
 * `500` on internal server error.
 *
 * @param req
 * @param res
 * @returns the expected chat and its messages history on success
 */
async function getChatById(req, res) {
    try {
        const {chat_id} = req;

        if (!chat_id) {
            return res.status(400).json({message: 'Error - parameter chat_id is undefined'});
        }

        const chat = await chatService.getChatById(chat_id);

        if (chat === null) {
            return res.status(400).json({message: 'Error - received object is null'});
        }

        const messages = await messageService.getAllMessagesByChatId(chat_id);

        if (messages === null) {
            return res.status(400).json({message: 'Error - received object is null'});
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

/**
 * Add a chat in the database. Verify if the emails of user 1 (the connected user) and user 2 exist, are not the same
 * and do not already have a chat between each other. Send http status `201` if request is successful, `400` on bad
 * request or `500` on internal server error.
 *
 * @param req
 * @param res
 * @returns the newly created chat
 */
async function addChat(req, res) {
    try {
        const {user_email} = req.body;
        const {userEmail} = req; // Connected user

        const user2 = await userService.getUserByEmail(user_email);

        if (!user2) {
            return res.status(400).json({message: 'Error - user_email does not exist'});
        }

        const chatsOfUser = await chatService.getAllChatsOfUser(userEmail);

        // Verify that no chats already exists between these two users
        if (chatsOfUser.some((chat) => chat.user_email1 === user_email || chat.user_email2 === user_email)) {
            return res.status(400).json({message: 'Error - a chat between these two users already exist'});
        }

        const newChat = await chatService.addChat(new Chat({
            user_email1: userEmail,
            user_email2: user_email
        }));

        if (newChat === null) {
            return res.status(400).json({message: 'Error - received object is null => not inserted'});
        }

        res.status(201).json(newChat);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    getAllChats,
    getAllChatsOfUser,
    getChatById,
    addChat,
}
