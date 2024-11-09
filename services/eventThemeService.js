const EventTheme = require("../models/EventTheme");

/**
 * Get all existing event themes in the database.
 *
 * @returns all event themes
 */
async function getAllEventThemes() {
    return EventTheme.find({}).exec();
}

module.exports = {
    getAllEventThemes,
}