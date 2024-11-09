const eventService = require("../services/eventService");
const Event = require("../models/Event");
const helper = require('../helper/inputValidityHelper');
const path = require('path');
const fs = require('fs');

function getEventsFilters(creator_email = null, date = null, name = null, price_min = null, price_max = null) {
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
    if (price_min) {
        filter["price"] = {"$gte": price_min};
    }
    if (price_max) {
        if (filter.price) {
            filter["price"]["$lte"] = price_max;
        } else {
            filter["price"] = {"$lte": price_max};
        }
    }

    return filter;
}

async function getAllEvents(req, res) {
    try {
        const {
            sort_by_date, // 1 -> ascending order, -1 -> descending order, 0 / null -> no sort
            sort_by_price, // 1 -> ascending order, -1 -> descending order, 0 / null -> no sort
            creator_email,
            date,
            name,
            price_min,
            price_max,
        } = req.query;

        const filter = getEventsFilters(creator_email, date, name, price_min, price_max);
        let events;

        if (sort_by_date === '1' || sort_by_date === '-1') {
            events = await eventService.getAllSortedEvents(sort_by_date, filter, true);
        } else if (sort_by_price === '1' || sort_by_price === '-1') {
            events = await eventService.getAllSortedEvents(sort_by_price, filter, false);
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
        const {theme_code, name, date, price} = req.body;

        if (!theme_code || !name || !date || !price) {
            return res.status(400).json({error: 'Bad request'});
        }

        if (!helper.dateIsValid(date)) {
            return res.status(400).json({error: 'Invalid event date format'});
        }
        if (!helper.priceIsValid(price)) {
            return res.status(400).json({error: 'Invalid event price'});
        }
        if (!await helper.eventThemeWithThisCodeExists(theme_code)) {
            return res.status(400).json({error: 'Event theme with this code does not exist'});
        }

        const eventToAdd = new Event({
            created_by_email: req.userEmail,
            theme_code,
            name,
            date,
            price
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
        const {created_by_email, theme_code, name, date, price} = req.body;
        const {event_id} = req.params;

        if (!event_id) {
            return res.status(404).json({message: 'Error - parameter event_id is undefined'});
        }

        // TODO created by email must be replaced by an user is creator OR admin user check
        if (!theme_code || !name || !date || !price) {
            return res.status(400).json({error: 'Bad request'});
        }

        if (!helper.dateIsValid(date)) {
            return res.status(400).json({error: 'Invalid event date format'});
        }
        if (!helper.priceIsValid(price)) {
            return res.status(400).json({error: 'Invalid event price'});
        }
        if (!await helper.eventThemeWithThisCodeExists(theme_code)) {
            return res.status(400).json({error: 'Event theme with this code does not exist'});
        }

        const event = new Event({
            created_by_email,
            theme_code,
            name,
            date,
            price
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

async function uploadEventImage(req, res) {
    try{
        res.status(200).json({ message: 'Image sent successfully' });
    }
    catch(error){

        res.status(500).json({ error: 'Failed sending image' });
    }
}

async function getImage(req, res) {
    try{
        const event_id = req.params.event_id;

        const eventDir = path.join(__dirname, `../public/event`);
        const defaultPicture = path.join(eventDir, 'default.png');

        const eventPicture = fs.readdirSync(eventDir).find(file => file.startsWith(event_id + '.'));

        if (eventPicture) {
            res.status(200).sendFile(path.join(eventDir, eventPicture));
        } else {
            res.status(200).sendFile(defaultPicture);
        }

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to retrieve event' });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
    uploadEventImage,
    getImage
}
