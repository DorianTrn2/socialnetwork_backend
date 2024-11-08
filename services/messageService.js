const Message = require("../models/Message");

async function getAllMessages() {
    return Message.find({}).exec();
}

/**
 * Get all messages of the given chat, the most recent first.
 *
 * @param chat_id the chat id
 * @returns the messages, sorted by date with the most recent first
 */
async function getAllMessagesByChatId(chat_id) {
    return Message.find({chat_id}).sort({date: -1}).exec();
}

/**
 * Insert a message in the database.
 *
 * @param message the message to save
 * @returns the saved message Object
 */
async function addMessage(message) {
    return message.save();
}

module.exports = {
    getAllMessages,
    getAllMessagesByChatId,
    addMessage,
}