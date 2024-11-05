const mongoose = require('mongoose');

const userLikeEventSchema = new mongoose.Schema({
    user_email: {type: String, required: true},
    event_id: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = {UserLikeEvent: mongoose.model("UserLikeEvent", userLikeEventSchema)};