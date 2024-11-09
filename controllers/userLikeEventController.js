const userLikeEventService = require('../services/userLikeEventService');
const userService = require('../services/userService');

/**
 * Like the selected event. Send http status `200` if request is successful, `400` if the event is already liked or
 * `500` on internal server error.
 *
 * @param req
 * @param res
 */
async function likeEvent(req, res) {
    try {
        const user_email = req.userEmail;
        const {event_id} = req.params;

        const likedEvents = await userLikeEventService.getLikedEvents(user_email);

        if (likedEvents.some((likedEvent) => `${likedEvent.event_id}` === `${event_id}`)) {
            return res.status(400).json({message: 'Selected event is already liked'});
        }

        await userLikeEventService.likeEvent(user_email, event_id);
        res.status(200).json({message: 'Event liked'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

/**
 * Unlike the selected event. Send http status `200` if request is successful or `500` on internal server error.
 *
 * @param req
 * @param res
 */
async function unlikeEvent(req, res) {
    try {
        const user_email = req.userEmail;
        const {event_id} = req.params;
        await userLikeEventService.unlikeEvent(user_email, event_id);
        res.status(200).json({message: 'Event unliked'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

/**
 * Get the connected user liked events. Send http status `200` if request is successful or `500` on internal server error.
 *
 * @param req
 * @param res
 */
async function getLikedEvents(req, res) {
    try {
        const user_email = req.userEmail;
        const likedEvents = await userLikeEventService.getLikedEvents(user_email);
        res.status(200).json(likedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

/**
 * Get the users who like the selected event. Send http status `200` if request is successful or `500` on internal server error.
 *
 * @param req
 * @param res
 */
async function getUsersWhoLikedEvent(req, res) {
    try {
        const {event_id} = req.params;
        const users_mails = await userLikeEventService.getUsersWhoLikedEvent(event_id);
        const users = [];
        for (let i = 0; i < users_mails.length; i++) {
            users.push(await userService.getUserByEmail(users_mails[i]));
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    likeEvent,
    unlikeEvent,
    getLikedEvents,
    getUsersWhoLikedEvent
};