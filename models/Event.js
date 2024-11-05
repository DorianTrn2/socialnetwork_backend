const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    created_by_email: {type: String, required: true},
    theme_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    date: {type: Date, required: true}
});

module.exports = {Event: mongoose.model("Event", eventSchema)};