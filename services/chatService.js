const Chat = require("../models/Chat");

async function getAllChats() {
    return Chat.find({}).exec();
}

async function getAllChatsOfUser(user_email) {
    return Chat.find({
            $or: [
                {user_email1: user_email},
                {user_email2: user_email},
            ]
        }
    ).exec(); // user_mail1 === user_mail OR user_mail2 === user_mail
}

async function getChatById(id) {
    return Chat.findById(id).exec();
}

module.exports = {
    getAllChats,
    getAllChatsOfUser,
    getChatById,
}