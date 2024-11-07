const eventService = require("../services/eventService")

function getEventsFilters(creator_email = null, date = null, name = null) {
    const filter = {}

    if (creator_email) {
        filter["created_by_email"] = creator_email;
    }
    if (date) {
        filter["date"] = date;
    }
    if (name) {
        filter["name"] = { "$regex": name, "$options": "i" };
    }

    console.log(filter)

    return filter;
}

async function getAllEvents(res, creator_email = null, date = null, name = null) {
    try {
        const filter = getEventsFilters(creator_email, date, name);

        const events = await eventService.getAllEvents(filter);
        if (events === null) {
            return res.status(404).json({ message: 'Error - received object is null' });
        }
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAllSortedEvents(res, sort_by_date, creator_email = null, date = null, name = null) {
    try {
        const filter = getEventsFilters(creator_email, date, name);

        const events = await eventService.getAllSortedEvents(sort_by_date, filter);
        if (events === null) {
            return res.status(404).json({ message: 'Error - received object is null' });
        }
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllEvents,
    getAllSortedEvents,
}
