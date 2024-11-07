const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password_hash: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    role_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    birthday: {type: Date, required: true}
});

module.exports = mongoose.model("User", userSchema);