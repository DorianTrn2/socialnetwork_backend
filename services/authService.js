const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Create a user in the database.
 *
 * @param email user email (unique)
 * @param login username (unique)
 * @param password user clear password (that will be hashed)
 * @param role_id user role id
 * @param firstname user firstname
 * @param lastname user lastname
 * @param birthday user birthdate
 * @returns the newly created user
 */
async function registerUser(email, login, password, role_id, firstname, lastname, birthday) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password_hash: hashedPassword,
        username: login,
        role_id,
        firstname,
        lastname,
        birthday: new Date(birthday)
    });
    return user.save();
}

/**
 * Authenticate a user if the login and the password matches.
 *
 * @param username the username
 * @param password the user password
 * @returns a JWT token
 */
async function authenticateUser(username, password) {
    const user = await User.findOne({username});
    if (!user) return null;
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) return null;

    const token = jwt.sign({userEmail: user.email, userRole: user.role_id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return {token};
}

module.exports = {
    registerUser,
    authenticateUser
};
