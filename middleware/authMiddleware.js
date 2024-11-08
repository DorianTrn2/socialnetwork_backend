const jwt = require('jsonwebtoken');
const constant = require('../constant')
const chatService = require("../services/chatService");

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({error: 'Access denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded.userEmail;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
}

function verifyAdminToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({error: 'Access denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.userRole || `${decoded.userRole}` !== constant.ADMIN_ROLE_ID) {
            return res.status(401).json({error: 'Access denied'});
        }

        req.userEmail = decoded.userEmail;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
}

async function verifyUserHaveAccessToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({error: 'Access denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const {chat_id} = req.params;

        if (!chat_id) {
            return res.status(404).json({message: 'Error - parameter chat_id is undefined'});
        }

        const chat = await chatService.getChatById(chat_id);

        if (chat === null) {
            return res.status(404).json({message: 'Error - chat does not exist in database'});
        }

        if (decoded.userRole && `${decoded.userRole}` === constant.ADMIN_ROLE_ID) {
            // Admin is allowed to see the chats of all users
            req.userEmail = decoded.userEmail;
            next();
        } else if (chat.user_email1 === decoded.userEmail || chat.user_email2 === decoded.userEmail) {
            // User of the chat is allowed to see this chat
            req.userEmail = decoded.userEmail;
            next();
        } else {
            return res.status(401).json({error: 'Access denied'});
        }
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
}

module.exports = {verifyToken, verifyAdminToken, verifyUserHaveAccessToken};