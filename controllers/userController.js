const userService = require("../services/userService");
const eventService = require("../services/eventService");
const path = require('path');
const fs = require('fs');
const userLikeEventService = require("../services/userLikeEventService");
const helper = require("../helper/inputValidityHelper");
const {USER_ROLE_ID} = require("../constant");

/**
 * Get all existing users. Send http status `200` if request is successful or `500` on internal server error.
 *
 * @param req
 * @param res
 * @returns all existing users on success
 */
async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve users'});
    }
}

/**
 * Update the connected user. Send http status `201` if event edition is successful, `400` on bad request (wrong
 * inputs) or `500` on internal server error.
 *
 * @param req
 * @param res
 * @returns the update request status on success
 */
async function updateUser(req, res) {
    try {
        const {firstname, lastname, birthday} = req.body;
        const user_email = req.userEmail;

        if (!user_email || !firstname || !lastname || !birthday) {
            return res.status(400).json({error: 'Bad request'});
        }

        const user = await userService.getUserByEmail(user_email);

        if (!helper.nameIsValid(firstname)) {
            return res.status(400).json({error: 'Invalid firstname format'});
        }
        if (!helper.nameIsValid(lastname)) {
            return res.status(400).json({error: 'Invalid lastname format'});
        }
        // if (!helper.usernameIsValid(login)) {
        //     return res.status(400).json({error: 'Invalid username format'});
        // }
        if (!helper.dateIsValid(birthday)) {
            return res.status(400).json({error: 'Invalid birthday format'});
        } else if (new Date() < new Date(birthday)) {
            return res.status(400).json({error: 'Invalid birthday (date in the future)'});
        }
        // if (user.username !== login) {
        //     if (await helper.emailOrUsernameAreAlreadyUsed(login)) {
        //         return res.status(400).json({error: 'Username is already used'});
        //     }
        // }

        await userService.updateUser(user_email, USER_ROLE_ID, firstname, lastname, birthday);
        res.status(201).json({message: 'User updated successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to update user'});
    }
}

/**
 * Get the connected user profile. Send http status `200` if request is successful or `500` on internal server error.
 *
 * @param req
 * @param res
 * @returns the user profile, liked events and created events on success
 */
async function myProfile(req, res) {
    try {
        const email = req.userEmail;
        const user = await userService.getProfile(email);

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

/**
 * Get the connected user profile image. Send http status `200` if request is successful or `500` on internal server error.
 *
 * @param req
 * @param res
 * @returns the user profile image
 */
async function getImage(req, res) {
    try {
        const username = req.params.user_username;

        const ppDir = path.join(__dirname, `../public/pp`);
        const defaultPicture = path.join(ppDir, '_default.png');

        const profilePicture = fs.readdirSync(ppDir).find(file => file.startsWith(username + '.'));

        if (profilePicture) {
            res.status(200).sendFile(path.join(ppDir, profilePicture));
        } else {
            res.status(200).sendFile(defaultPicture);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to retrieve user'});
    }
}

/**
 * Upload the connected user profile image. Send http status `201` if request is successful or `500` on internal server error.
 *
 * @param req
 * @param res
 */
async function sendImage(req, res) {
    try {
        res.status(201).json({message: 'Image sent successfully'});
    } catch (error) {

        res.status(500).json({error: 'Failed sending image'});
    }
}


module.exports = {
    getAllUsers,
    updateUser,
    myProfile,
    getImage,
    sendImage
};

