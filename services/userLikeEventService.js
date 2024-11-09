const UserLikeEvent = require("../models/UserLikeEvent");

/**
 * Like an event by inserting a UserLikeEvent in the database.
 *
 * @param user_email the email of the user who likes the event
 * @param event_id the event id
 * @returns the newly created UserLikeEvent object
 */
async function likeEvent(user_email, event_id) {
    const userLikeEvent = new UserLikeEvent({user_email, event_id});
    return userLikeEvent.save();
}

/**
 * Unlike an event by deleting a UserLikeEvent in the database.
 *
 * @param user_email the email of the user who unlikes the event
 * @param event_id the event id
 * @returns the delete result object
 */
async function unlikeEvent(user_email, event_id) {
    return UserLikeEvent.deleteOne({user_email, event_id});
}

/**
 * Get all events liked by a user in the database.
 *
 * @param user_email the email of the user
 * @returns the events liked by the selected user
 */
async function getLikedEvents(user_email) {
    return UserLikeEvent.find({user_email}).exec();
}

/**
 * Get all users who liked the selected event.
 *
 * @param event_id the event id
 * @returns the user who liked the selected event
 */
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