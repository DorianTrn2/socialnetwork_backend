const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * Get all existing users in the database according to the input filters.
 *
 * @param filter the query filters object
 * @returns all filtered users, without the passwords
 */
async function getAllUsers(filter = {}) {
    let users = await User.find(filter).exec();
    for (let i = 0; i < users.length; i++) {
        users[i].password_hash = undefined;
    }
    return users;
}

/**
 * Get a user by its email in the database.
 *
 * @param email the requested user email
 * @returns the requested user, without his password
 */
async function getUserByEmail(email) {
    let user = await User.findOne({email}).exec();
    user.password_hash = undefined;
    return user;
}

/**
 * Get a user by its username in the database.
 *
 * @param username the requested username
 * @returns the requested user, without his password
 */
async function getUserByUsername(username) {
    let user = await User.findOne({username}).exec();
    user.password_hash = undefined;
    return user;
}

/**
 * Update a user in the database.
 *
 * @param email email of the user to update
 * @param login username (unique)
 * @param password user clear password (that will be hashed)
 * @param role_id user role id
 * @param firstname user firstname
 * @param lastname user lastname
 * @param birthday user birthdate
 * @returns the update result object
 */
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

/**
 * Get a user by its email in the database.
 *
 * @param email the requested user email
 * @returns the requested user
 */
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