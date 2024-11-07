const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender_email: {type: String, required: true},
    date: {type: Date, required: true},
    chat_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    message: {type: String, required: true}
});

module.exports = mongoose.model("Message", messageSchema);