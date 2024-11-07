const mongoose = require('mongoose');
const constants = require("./constant");

const User = require("./models/User");
const UserRole = require("./models/UserRole");
const Event = require("./models/Event");
const EventTheme = require("./models/EventTheme");
const UserLikeEvent = require("./models/UserLikeEvent");
const Chat = require("./models/Chat");
const Message = require("./models/Message");
const data = require("./__data__/databaseData");
const dotenv = require('dotenv');
dotenv.config();

async function deleteOldData() {
    await User.deleteMany({});
    await UserRole.deleteMany({});
    await Event.deleteMany({});
    await EventTheme.deleteMany({});
    await UserLikeEvent.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
}

async function populateDatabase() {
    await deleteOldData();

    const rolesMap = {};
    for (const roleData of data.roles) {
        const role = await new UserRole(roleData).save();
        rolesMap[roleData.role] = role._id;
    }

    const usersMap = {};
    for (const userData of data.users) {
        const user = await new User({
            ...userData,
            role_id: rolesMap[userData.role]
        }).save();
        usersMap[userData.email] = user;
    }

    const themesMap = {};
    for (const themeData of data.themes) {
        const theme = await new EventTheme(themeData).save();
        themesMap[themeData.theme] = theme._id;
    }

    const eventsMap = {};
    for (const eventData of data.events) {
        const event = await new Event({
            ...eventData,
            theme_id: themesMap[eventData.theme],
            created_by_email: eventData.created_by_email
        }).save();
        eventsMap[eventData.name] = event;
    }

    for (const likeData of data.userLikes) {
        await new UserLikeEvent({
            user_email: likeData.user_email,
            event_id: eventsMap[likeData.event_name]._id
        }).save();
    }

    for (const messageData of data.messages) {
        let chat = await Chat.findOne({
            user_email1: messageData.chat_users[0],
            user_email2: messageData.chat_users[1]
        }) || await new Chat({
            user_email1: messageData.chat_users[0],
            user_email2: messageData.chat_users[1]
        }).save();

        await new Message({
            sender_email: messageData.sender_email,
            date: messageData.date,
            chat_id: chat._id,
            message: messageData.content
        }).save();
    }

    console.log('Database populated successfully!');
}

async function main() {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
        console.log("Connected to MongoDB");

        await populateDatabase();

    } catch (error) {
        console.error("Erreur de connexion ou de population:", error);
    } finally {
        await mongoose.connection.close();
    }
}

main();