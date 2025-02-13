const Chat = require("../models/Chat");

/**
 * Get all existing chats in the database.
 *
 * @returns all chats
 */
async function getAllChats() {
    return Chat.find({}).exec();
}

/**
 * Get all chats of the selected user in the database.
 *
 * @param user_email the user email
 * @returns all chats
 */
async function getAllChatsOfUser(user_email) {
    return Chat.find({
            $or: [
                {user_email1: user_email},
                {user_email2: user_email},
            ]
        }
    ).exec(); // user_mail1 === user_mail OR user_mail2 === user_mail
}

/**
 * Get a chat in the database by its id.
 *
 * @param id the chat id
 * @returns the requested chat
 */
async function getChatById(id) {
    return Chat.findById(id).exec();
}

/**
 * Insert a chat in the database.
 *
 * @param chat the chat to save
 * @returns the saved chat Object
 */
async function addChat(chat) {
    return chat.save();
}

module.exports = {
    getAllChats,
    getAllChatsOfUser,
    getChatById,
    addChat,
}