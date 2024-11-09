const EventTheme = require("../models/EventTheme");

async function getAllEventThemes() {
    return EventTheme.find({}).exec();
}

module.exports = {
    getAllEventThemes,
}