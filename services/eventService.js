const Event = require("../models/Event");

async function getAllEvents(filter = {}) {
    return Event.find(filter).exec();
}

async function getAllSortedEvents(sort_by_date, filter = {}) {
    return Event.find(filter).sort({date: sort_by_date}).exec();
}

async function getEventById(id) {
    return Event.findById(id).exec();
}

module.exports = {
    getAllEvents,
    getAllSortedEvents,
    getEventById,
}
