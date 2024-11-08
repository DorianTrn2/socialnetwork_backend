const userService = require("../services/userService");
const eventService = require("../services/eventService");
const userlikeeventService = require("../services/userlikeeventService");
const path = require('path');
const fs = require('fs');

async function getAllUsers(req, res) {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
}

async function getUserByEmail(req, res) {
    try{
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
}

async function getUserByUsername(req, res) {
    try{
        const username = req.params.username;
        const user = await userService.getUserByUsername(username);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
}

async function updateUser(req, res) {
    try{
        const user = req.body;
        const user_email = req.params.email;
        await userService.updateUser(user, user_email);
        res.status(201).json({ message: 'User updated successfully' });
    }catch(error){
        res.status(500).json({ error: 'Failed to update user' });
    }
}

async function myProfile(req, res) {
    try{
        email = req.userEmail;
        const user = await userService.getUserByEmail(email);
        
        const likedevents_obj = await userlikeeventService.getLikedEvents(email);
        let likedevents_ids = [];
        for(let i = 0; i < likedevents_obj.length; i++){
            likedevents_ids.push(likedevents_obj[i].event_id);
        }
        let likedevents = [];
        for(let i = 0; i < likedevents_ids.length; i++){
            likedevents.push(await eventService.getEventById(likedevents_ids[i]));
        }
        
        let createdEvents = await eventService.getAllEvents({created_by_email: email});

        res.status(200).json({user: user, likedevents: likedevents, createdEvents: createdEvents});
    }catch(error){
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
}

async function getImage(req, res) {
    try{
        const username = req.params.user_id;

        const ppDir = path.join(__dirname, `../public/pp`);
        const defaultPicture = path.join(ppDir, 'default.png');

        const profilePicture = fs.readdirSync(ppDir).find(file => file.startsWith(username + '.'));

        if (profilePicture) {
            res.status(200).sendFile(path.join(ppDir, profilePicture));
        } else {
            res.status(200).sendFile(defaultPicture);
        }
                
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
}

async function sendImage(req, res) {
    try{
        res.status(200).json({ message: 'Image sent successfully' });
    }
    catch(error){
        
        res.status(500).json({ error: 'Failed sending image' });
    }
}


module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
    updateUser,
    myProfile,
    getImage,
    sendImage
};

