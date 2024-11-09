const mongoose = require('mongoose');

const eventThemeSchema = new mongoose.Schema({
    theme: {type: String, required: true},
    code: {type: String, unique: true, required: true}
});

module.exports = mongoose.model("EventTheme", eventThemeSchema);