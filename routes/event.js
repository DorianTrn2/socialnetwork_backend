const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");

router.get('', eventController.getAllEvents);

router.post('/new', eventController.addEvent);

router.put('/update/:event_id', eventController.updateEvent);

router.delete('/delete/:event_id', eventController.deleteEvent);

router.get('/:event_id', eventController.getEventById);

router.get('/:event_id/send_image', (req, res) => {res.render('send_image.pug')});

router.post('/:event_id/send_image', upload.single('image'), eventController.uploadEventImage);

router.get('/:event_id/get_image', eventController.getImage);

module.exports = router;