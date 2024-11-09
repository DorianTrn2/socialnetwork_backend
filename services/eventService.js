const Event = require("../models/Event");

/**
 * Get all existing events in the database according to the input filters.
 *
 * @param filter the query filters object
 * @returns all filtered events
 */
async function getAllEvents(filter = {}) {
    return Event.find(filter).exec();
}

/**
 * Get all existing events in the database according to the input filters and sorted by date or by price.
 *
 * @param sortValue `1` for ascending order, `-1` for descending order
 * @param filter the query filters object
 * @param isSortedByDate `true` if the result must be sorted by date, `false` if it must be sorted by price
 * @returns all filtered and sorted events
 */
async function getAllSortedEvents(sortValue, filter = {}, isSortedByDate = true) {
    const sort = isSortedByDate ? {date: sortValue} : {price: sortValue}
    return Event.find(filter).sort(sort).exec();
}

/**
 * Get an event in the database by its id.
 *
 * @param id the event id
 * @returns the requested event
 */
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
        price: event.price,
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

/**
 * Get all events created by a user in the database.
 *
 * @param email the creator user email
 * @returns the events created by the selected user
 */
async function getEventCreatedBy(email) {
    return Event.find({created_by_email: email}).exec();
}

module.exports = {
    getAllEvents,
    getAllSortedEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventCreatedBy,
}
