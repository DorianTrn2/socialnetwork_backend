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


module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
    updateUser
}; 