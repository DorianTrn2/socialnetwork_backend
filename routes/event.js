const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const {verifyToken} = require("../middleware/authMiddleware");

router.get('', eventController.getAllEvents);

router.post('/new', verifyToken, eventController.addEvent);

// TODO verify user is creator
router.put('/update/:event_id', verifyToken, eventController.updateEvent);

router.delete('/delete/:event_id', verifyToken, eventController.deleteEvent);

router.get('/:event_id', eventController.getEventById);

module.exports = router;