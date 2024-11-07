const eventService = require("../services/eventService")
const Event = require("../models/Event")

function getEventsFilters(creator_email = null, date = null, name = null) {
    const filter = {}

    if (creator_email) {
        filter["created_by_email"] = creator_email;
    }
    if (date) {
        filter["date"] = date;
    }
    if (name) {
        filter["name"] = {"$regex": name, "$options": "i"};
    }

    return filter;
}

async function getAllEvents(req, res) {
    try {
        const {
            sort_by_date, // 1 -> ascending order, -1 -> descending order, 0 / null -> no sort
            creator_email,
            date,
            name
        } = req.query;

        const filter = getEventsFilters(creator_email, date, name);
        let events;

        if (sort_by_date === '1' || sort_by_date === '-1') {
            events = await eventService.getAllSortedEvents(sort_by_date, filter);
        } else {
            events = await eventService.getAllEvents(filter);
        }

        if (events === null) {
            return res.status(404).json({message: 'Error - received object is null'});
        }

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function getEventById(req, res) {
    try {
        const {event_id} = req.params;

        if (!event_id) {
            return res.status(404).json({message: 'Error - parameter event_id is undefined'});
        }

        const event = await eventService.getEventById(event_id);

        if (event === null) {
            return res.status(404).json({message: 'Error - received object is null'});
        }

        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function addEvent(req, res) {
    try {
        const {created_by_email, theme_code, name, date} = req.body;

        const eventToAdd = new Event({
            created_by_email,
            theme_code,
            name,
            date
        });

        const event = await eventService.addEvent(eventToAdd);

        if (event === null) {
            return res.status(404).json({message: 'Error - received object is null => not inserted'});
        }

        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function updateEvent(req, res) {
    try {
        const {created_by_email, theme_code, name, date} = req.body;
        const {event_id} = req.params;

        if (!event_id) {
            return res.status(404).json({message: 'Error - parameter event_id is undefined'});
        }

        const event = new Event({
            created_by_email,
            theme_code,
            name,
            date
        });

        const result = await eventService.updateEvent(event, event_id);

        if (result === null) {
            return res.status(404).json({message: 'Error - received object is null => not updated'});
        }

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function deleteEvent(req, res) {
    try {
        const {event_id} = req.params;

        if (!event_id) {
            return res.status(404).json({message: 'Error - parameter event_id is undefined'});
        }

        const result = await eventService.deleteEvent(event_id);

        if (result === null) {
            return res.status(404).json({message: 'Error - received object is null => not deleted'});
        }

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
}
