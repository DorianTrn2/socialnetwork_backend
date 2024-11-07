const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    created_by_email: {type: String, required: true},
    theme_code: {type: String, required: true},
    name: {type: String, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model("Event", eventSchema);