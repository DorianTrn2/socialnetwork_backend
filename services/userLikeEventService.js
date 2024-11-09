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

module.exports = {
    likeEvent,
    unlikeEvent,
    getLikedEvents
};