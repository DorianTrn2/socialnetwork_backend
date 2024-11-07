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
        }
        else {
            events = await eventService.getAllEvents(filter);
        }

        if (events === null) {
            return res.status(404).json({ message: 'Error - received object is null' });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getEventById(req, res) {
    try {
        const { event_id } = req.params;

        if (!event_id) {
            return res.status(404).json({ message: 'Error - parameter event_id is undefined' });
        }

        const event = await eventService.getEventById(event_id);

        if (event === null) {
            return res.status(404).json({ message: 'Error - received object is null' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
}
