const Event = require("../models/Event");
const User = require("../models/User");

async function getAllEvents(filter = {}) {
    return Event.find(filter).exec();
}

async function getAllSortedEvents(sort_by_date, filter = {}) {
    return Event.find(filter).sort({date: sort_by_date}).exec();
}

async function getEventById(id) {
    return Event.findById(id).exec();
}

/**
 * Insert an event in the database.
 *
 * @param event the event to save
 * @returns the saved event Object
 */
async function addEvent(event) {
    return event.save();
}

module.exports = {
    getAllEvents,
    getAllSortedEvents,
    getEventById,
    addEvent,
}
