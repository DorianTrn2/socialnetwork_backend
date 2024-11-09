const UserRole = require("../models/UserRole");

/**
 * Get all existing user roles in the database.
 *
 * @returns all user roles
 */
async function getAllUserRoles() {
    return UserRole.find({}).exec();
}

module.exports = {
    getAllUserRoles,
}