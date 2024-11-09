const authService = require('../services/authService');
const helper = require('../helper/inputValidityHelper');
const {USER_ROLE_ID} = require('../constant');

/**
 * Register new user. Send http status `201` if request is successful, `400` if bad request format or `500` on
 * internal server error.
 *
 * @param req
 * @param res
 */
async function register(req, res) {
    try {
        const {email, login, password, firstname, lastname, birthday} = req.body;

        if (!email || !login || !password || !firstname || !lastname || !birthday) {
            return res.status(400).json({error: 'Bad request'});
        }

        if (!helper.emailIsValid(email)) {
            return res.status(400).json({error: 'Invalid email format'});
        }
        if (!helper.nameIsValid(firstname)) {
            return res.status(400).json({error: 'Invalid firstname format'});
        }
        if (!helper.nameIsValid(lastname)) {
            return res.status(400).json({error: 'Invalid lastname format'});
        }
        if (!helper.usernameIsValid(login)) {
            return res.status(400).json({error: 'Invalid username format'});
        }
        if (!helper.dateIsValid(birthday)) {
            return res.status(400).json({error: 'Invalid birthday format'});
        } else if (new Date() < new Date(birthday)) {
            return res.status(400).json({error: 'Invalid birthday (date in the future)'});
        }
        if (await helper.emailOrUsernameAreAlreadyUsed(login, email)) {
            return res.status(400).json({error: 'Email or username is already used'});
        }

        await authService.registerUser(email, login, password, USER_ROLE_ID, firstname, lastname, birthday);
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({error: 'Registration failed'});
    }
}

/**
 * Log in by creating an authentication token cookie. Send http status `200` if request is successful, `401` if login
 * and password do not match or `500` on internal server error.
 *
 * @param req
 * @param res
 */
async function login(req, res) {
    try {
        const {login, password} = req.body;
        const result = await authService.authenticateUser(login, password);
        if (!result) {
            return res.status(401).json({error: 'Authentication failed'});
        }
        res.cookie('token', result.token, {httpOnly: true, maxAge: 3600000});
        res.status(200).json({message: 'Login successful'});
    } catch (error) {
        res.status(500).json({error: 'Login failed'});
    }
}

/**
 * Log out by clearing the authentication token cookie. Send http status `200` if request is successful or `500` on
 * internal server error.
 *
 * @param req
 * @param res
 */
async function logout(req, res) {
    try {
        res.clearCookie('token');
        res.status(200).json({message: 'Logout successful'});
    } catch (error) {
        res.status(500).json({error: 'Logout failed'});
    }
}

module.exports = {
    register,
    login,
    logout
};
