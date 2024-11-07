const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get('', eventController.getAllEvents);

router.post('/new', eventController.addEvent);

router.get('/:event_id', eventController.getEventById);

module.exports = router;