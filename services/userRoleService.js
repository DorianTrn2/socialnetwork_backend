const UserRole = require("../models/UserRole");

async function getAllUserRoles() {
    return UserRole.find({}).exec();
}

module.exports = {
    getAllUserRoles,
}