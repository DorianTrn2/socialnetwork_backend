const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    role: {type: String, required: true}
});

module.exports = {UserRole: mongoose.model("UserRole", userRoleSchema)};