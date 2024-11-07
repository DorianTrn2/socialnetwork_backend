const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get('/events', async (req, res) => {
    const {
        sort_by_date, // 1 -> ascending order, -1 -> descending order, 0 / null -> no sort
        creator_email,
        date,
        name
    } = req.query;

    if (sort_by_date === '1' || sort_by_date === '-1') {
        await eventController.getAllSortedEvents(res, parseInt(sort_by_date), creator_email, date, name);
    }
    else {
        await eventController.getAllEvents(res, creator_email, date, name);
    }
});

module.exports = router;