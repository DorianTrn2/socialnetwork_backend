const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user_email1: {type: String, required: true},
    user_email2: {type: String, required: true}
});

module.exports = {Chat: mongoose.model("Chat", chatSchema)};