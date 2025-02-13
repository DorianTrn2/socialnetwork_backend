const mongoose = require('mongoose');
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

    for (const roleData of data.roles) {
        await new UserRole(roleData).save();
    }

    const usersMap = {};
    for (const userData of data.users) {
        const user = await new User(userData).save();
        usersMap[userData.email] = user;
    }

    for (const themeData of data.themes) {
        await new EventTheme(themeData).save();
    }

    const eventsMap = {};
    for (const eventData of data.events) {
        const event = await new Event({
            ...eventData,
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
    
    const mongoHost = process.env.DOCKER ? 'mongo' : 'localhost';
    const mongoPort = process.env.MONGO_PORT || '27017';
    const mongoURL = `mongodb://${mongoHost}:${mongoPort}/${process.env.DATABASE_NAME}`;
    try {
        await mongoose.connect(mongoURL, {
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