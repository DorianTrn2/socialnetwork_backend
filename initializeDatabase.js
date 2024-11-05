const mongoose = require('mongoose');
const constants = require("./constant");

// Connexion à MongoDB
mongoose.connect(`${constants.DATABASE_URL}/${constants.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schémas
const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password_hash: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    role_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    birthday: {type: Date, required: true}
});

const userRoleSchema = new mongoose.Schema({
    role: {type: String, required: true}
});

const eventSchema = new mongoose.Schema({
    created_by_email: {type: String, required: true},
    theme_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    date: {type: Date, required: true}
});

const eventThemeSchema = new mongoose.Schema({
    theme: {type: String, required: true}
});

const userLikeEventSchema = new mongoose.Schema({
    user_email: {type: String, required: true},
    event_id: {type: mongoose.Schema.Types.ObjectId, required: true}
});

const chatSchema = new mongoose.Schema({
    user_email1: {type: String, required: true},
    user_email2: {type: String, required: true}
});

const messageSchema = new mongoose.Schema({
    sender_email: {type: String, required: true},
    date: {type: Date, required: true},
    chat_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    message: {type: String, required: true}
});

// Modèles
const User = mongoose.model('User', userSchema);
const UserRole = mongoose.model('UserRole', userRoleSchema);
const Event = mongoose.model('Event', eventSchema);
const EventTheme = mongoose.model('EventTheme', eventThemeSchema);
const UserLikeEvent = mongoose.model('UserLikeEvent', userLikeEventSchema);
const Chat = mongoose.model('Chat', chatSchema);
const Message = mongoose.model('Message', messageSchema);

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

    const roleAdmin = await new UserRole({role: 'Admin'}).save();
    const roleUser = await new UserRole({role: 'User'}).save();

    const user1 = await new User({
        email: 'user1@example.com',
        password_hash: 'hash1',
        username: 'user1',
        role_id: roleUser._id,
        firstname: 'John',
        lastname: 'Doe',
        birthday: new Date('1990-01-01')
    }).save();

    const user2 = await new User({
        email: 'user2@example.com',
        password_hash: 'hash2',
        username: 'user2',
        role_id: roleAdmin._id,
        firstname: 'Jane',
        lastname: 'Smith',
        birthday: new Date('1992-05-15')
    }).save();

    const sportEvent = await new EventTheme({theme: 'Sport'}).save();
    await new EventTheme({theme: 'Culture'}).save();
    await new EventTheme({theme: 'Festif'}).save();
    await new EventTheme({theme: 'Professionnel'}).save();
    await new EventTheme({theme: 'Autre'}).save();

    const event1 = await new Event({
        created_by_email: user1.email,
        theme_id: sportEvent._id,
        name: 'Birthday Bash',
        date: new Date('2023-11-25')
    }).save();

    const event2 = await new Event({
        created_by_email: user2.email,
        theme_id: sportEvent._id,
        name: 'Tech Conference',
        date: new Date('2024-02-20')
    }).save();

    await new UserLikeEvent({
        user_email: user1.email,
        event_id: event1._id
    }).save();

    await new UserLikeEvent({
        user_email: user2.email,
        event_id: event2._id
    }).save();

    const chat1 = await new Chat({
        user_email1: user1.email,
        user_email2: user2.email
    }).save();

    await new Message({
        sender_email: user1.email,
        date: new Date(),
        chat_id: chat1._id,
        message: "SUPER MESSAGE DE FOU FURAX"
    }).save();

    await new Message({
        sender_email: user2.email,
        date: new Date(),
        chat_id: chat1._id,
        message: "SUPER MESSAGE DE FOU FURAX"
    }).save();

    console.log('Database successfully initialized!');
}

populateDatabase().then(() => mongoose.connection.close());
