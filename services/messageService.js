const Message = require("../models/Message");

async function getAllMessages() {
    return Message.find({}).exec();
}

async function getAllMessagesByChatId(chat_id) {
    return Message.find({chat_id}).exec();
}

module.exports = {
    getAllMessages,
    getAllMessagesByChatId,
}