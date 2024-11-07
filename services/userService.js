const User = require("../models/User");

async function getAllUsers(filter = {}) {
    return User.find(filter).exec();
}

async function getUserByEmail(email) {
    return User.findOne({email}).exec();
}

async function getUserByUsername(username) {
    return User.findOne({username}).exec();
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
}