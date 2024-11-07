const mongoose = require('mongoose');

const eventThemeSchema = new mongoose.Schema({
    theme: String
});

module.exports = mongoose.model("EventTheme", eventThemeSchema);