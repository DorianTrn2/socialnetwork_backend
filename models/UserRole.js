const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    role: {type: String, required: true}
});

module.exports = mongoose.model("UserRole", userRoleSchema);