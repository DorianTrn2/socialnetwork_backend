const User = require("../models/User");
const bcrypt = require("bcrypt");

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

async function updateUser(email, login, password, role_id, firstname, lastname, birthday) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.updateOne({email: email}, {
        email,
        password_hash: hashedPassword,
        username: login,
        role_id,
        firstname,
        lastname,
        birthday: new Date(birthday)
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