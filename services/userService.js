const User = require("../models/User");

async function getAllUsers(filter = {}) {
    let users = await User.find(filter).exec();
    for (let i = 0; i < users.length; i++) {
        users[i].password_hash = undefined;
    }
    return users;
}

async function getUserByEmail(email) {
    let user = await User.findOne({email}).exec();
    user.password_hash = undefined;
    return user;
}

async function getUserByUsername(username) {
    let user = await User.findOne({username}).exec();
    user.password_hash = undefined;
    return user;
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

async function getProfile(email) {
    return User.findOne({email}).exec();
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
    updateUser,
    getProfile
}; 