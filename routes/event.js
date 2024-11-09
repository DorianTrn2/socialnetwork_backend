const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const userLikeEventController = require("../controllers/userLikeEventController");
const upload = require("../middleware/uploadMiddleware");
const {verifyToken, verifyUserIsEventCreator} = require("../middleware/authMiddleware");

router.get('', eventController.getAllEvents);

router.post('/new', verifyToken, eventController.addEvent);

router.put('/:event_id/update', verifyUserIsEventCreator, eventController.updateEvent);

router.delete('/:event_id/delete', verifyUserIsEventCreator, eventController.deleteEvent);

// TODO to delete once angular application is created
router.get('/:event_id/send_image', verifyUserIsEventCreator, (req, res) => {
    res.render('send_image.pug')
});

router.post('/:event_id/send_image', verifyUserIsEventCreator, upload.single('image'), eventController.uploadEventImage);

router.get('/:event_id/get_image', eventController.getImage);

router.post('/:event_id/like', verifyToken, userLikeEventController.likeEvent);

router.post('/:event_id/unlike', verifyToken, userLikeEventController.unlikeEvent);

router.get('/:event_id/likes', verifyToken, userLikeEventController.getUsersWhoLikedEvent);

router.get('/:event_id', eventController.getEventById);

module.exports = router;