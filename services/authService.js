const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
