const jwt = require('jsonwebtoken');
const constant = require('../constant')

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({error: 'Access denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
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

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
}

module.exports = {verifyToken, verifyAdminToken};