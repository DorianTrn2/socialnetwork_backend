const userService = require("../services/userService");
const eventService = require("../services/eventService");
const userLikeEventService = require("../services/userLikeEventService");

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve users'});
    }
}

async function getUserByEmail(req, res) {
    try {
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve user'});
    }
}

async function getUserByUsername(req, res) {
    try {
        const username = req.params.username;
        const user = await userService.getUserByUsername(username);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve user'});
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body;
        const user_email = req.userEmail;
        await userService.updateUser(user, user_email);
        res.status(201).json({message: 'User updated successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to update user'});
    }
}

async function myProfile(req, res) {
    try {
        const email = req.userEmail;
        const user = await userService.getUserByEmail(email);

        const likedEvents_obj = await userLikeEventService.getLikedEvents(email);
        let likedEvents_ids = [];
        for (let i = 0; i < likedEvents_obj.length; i++) {
            likedEvents_ids.push(likedEvents_obj[i].event_id);
        }
        let likedEvents = [];
        for (let i = 0; i < likedEvents_ids.length; i++) {
            likedEvents.push(await eventService.getEventById(likedEvents_ids[i]));
        }

        let createdEvents = await eventService.getAllEvents({created_by_email: email});

        res.status(200).json({user: user, likedEvents: likedEvents, createdEvents: createdEvents});
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve user'});
    }
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
    updateUser,
    myProfile
};

