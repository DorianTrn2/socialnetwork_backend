const Event = require("../models/Event");

async function getAllEvents(filter = {}) {
    return Event.find(filter).exec();
}

async function getAllSortedEvents(sort_by_date, filter = {}) {
    return Event.find(filter).sort({date: sort_by_date}).exec();
}

module.exports = {
    getAllEvents,
    getAllSortedEvents,
}
