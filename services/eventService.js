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

/**
 * Insert an event in the database.
 *
 * @param event the event to save
 * @returns the saved event Object
 */
async function addEvent(event) {
    return event.save();
}

/**
 * Update the selected event in the database.
 *
 * @param event the updated event
 * @param event_id the id of the event to update
 * @returns the updated event Object
 */
async function updateEvent(event, event_id) {
    return Event.updateOne({_id: event_id}, {
        name: event.name,
        theme_code: event.theme_code,
        date: event.date,
        created_by_email: event.created_by_email,
    });
}

/**
 * Delete the selected event in the database.
 *
 * @param event_id the id of the event to delete
 * @returns the updated event Object
 */
async function deleteEvent(event_id) {
    return Event.deleteOne({_id: event_id});
}

module.exports = {
    getAllEvents,
    getAllSortedEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
}
