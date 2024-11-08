const User = require("../models/User");
const UserLikeEvent = require("../models/UserLikeEvent");

async function getAllUsers(filter = {}) {
    return User.find(filter).exec();
}

async function getUserByEmail(email) {
    return User.findOne({email}).exec();
}

async function getUserByUsername(username) {
    return User.findOne({username}).exec();
}

async function updateUser(user, user_email) {
    return User.updateOne({email: user_email}, {
        email: user_email,
        password_hash: user.password_hash,
        username: user.username,
        role_id: user.role_id,
        firstname: user.firstname,
        lastname: user.lastname,
        birthday: user.birthday
    });
}

async function getLikedEvents(user_mail) {
    return UserLikeEvent.find({user_email: user_mail}).exec();
}


module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
    updateUser,
    getLikedEvents
}; 