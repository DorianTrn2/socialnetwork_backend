const userlikeeventService = require('../services/userlikeeventService');
const userService = require('../services/userService');

async function likeEvent(req, res) {
    try {
        const user_email = req.userEmail;
        const {event_id} = req.params;
        await userlikeeventService.likeEvent({user_email, event_id});
        res.status(200).json({message: 'Event liked'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function unlikeEvent(req, res) {
    try {
        const user_email = req.userEmail;
        const {event_id} = req.params;
        await userlikeeventService.unlikeEvent({user_email, event_id});
        res.status(200).json({message: 'Event unliked'});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function getLikedEvents(req, res) {
    try {
        const user_email = req.userEmail;
        const likedEvents = await userlikeeventService.getLikedEvents(user_email);
        res.status(200).json(likedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function getUsersWhoLikedEvent(req, res) {
    try {
        const {event_id} = req.params;
        const users_mails = await userlikeeventService.getUsersWhoLikedEvent(event_id);
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