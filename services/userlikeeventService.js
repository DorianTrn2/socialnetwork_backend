const UserLikeEvent = require("../models/UserLikeEvent");

async function likeEvent({user_email, event_id}) {
    const userLikeEvent = new UserLikeEvent({user_email, event_id});
    return userLikeEvent.save();
}

async function unlikeEvent({user_email, event_id}) {
    return UserLikeEvent.deleteOne({user_email, event_id});
}

async function getLikedEvents(user_email) {
    return UserLikeEvent.find({user_email}).exec();
}

async function getUsersWhoLikedEvent(event_id) {
    const likes = await UserLikeEvent.find({event_id}).exec();
    const users = [];
    for (let i = 0; i < likes.length; i++) {
        users.push(likes[i].user_email);
    }
    return users;
}

module.exports = {
    likeEvent,
    unlikeEvent,
    getLikedEvents,
    getUsersWhoLikedEvent
};