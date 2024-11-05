const mongoose = require('mongoose');

const eventThemeSchema = new mongoose.Schema({
    theme: String
});

module.exports = {EventTheme: mongoose.model("EventTheme", eventThemeSchema)};