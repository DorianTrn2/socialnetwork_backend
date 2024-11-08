const userlikeeventService = require('../services/userlikeeventService');

async function likeEvent(req, res) {
    try {
        const {user_email, event_id} = req.body;
        await userlikeeventService.likeEvent({user_email, event_id});
        res.status(200).json({message: 'Event liked'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function unlikeEvent(req, res) {
    try {
        const {user_email, event_id} = req.body;
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
        const {user_email} = req.params;
        const likedEvents = await userlikeeventService.getLikedEvents(user_email);
        res.status(200).json(likedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    likeEvent,
    unlikeEvent,
    getLikedEvents
};