const mongoose = require('mongoose');
const {DATABASE_URL, DATABASE_NAME} = require("./constant");

// Connexion à MongoDB
mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

// Schémas
const userSchema = new mongoose.Schema({
    email: String,
    password_hash: String,
    username: String,
    role_id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    birthday: Date,
    created_events_id: mongoose.Schema.Types.ObjectId
});

const userRoleSchema = new mongoose.Schema({
    role: String
});

const eventSchema = new mongoose.Schema({
    created_by: String, // Correspond à user_email
    theme_id: mongoose.Schema.Types.ObjectId,
    name: String,
    date: Date
});

const eventThemeSchema = new mongoose.Schema({
    theme: String
});

const userLikeEventSchema = new mongoose.Schema({
    user_email: String,
    event_id: mongoose.Schema.Types.ObjectId
});

const chatSchema = new mongoose.Schema({
    user_email1: String,
    user_email2: String
});

const messageSchema = new mongoose.Schema({
    sender_email: String,
    date: Date,
    chat_id: mongoose.Schema.Types.ObjectId
});

// Modèles
const User = mongoose.model('User', userSchema);
const UserRole = mongoose.model('UserRole', userRoleSchema);
const Event = mongoose.model('Event', eventSchema);
const EventTheme = mongoose.model('EventTheme', eventThemeSchema);
const UserLikeEvent = mongoose.model('UserLikeEvent', userLikeEventSchema);
const Chat = mongoose.model('Chat', chatSchema);
const Message = mongoose.model('Message', messageSchema);

// Fonction pour insérer des données d'exemple
async function populateDatabase() {
    // Supprimez les anciennes données
    await User.deleteMany({});
    await UserRole.deleteMany({});
    await Event.deleteMany({});
    await EventTheme.deleteMany({});
    await UserLikeEvent.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});

    // Insérez des rôles d'utilisateur
    const roleAdmin = await new UserRole({role: 'Admin'}).save();
    const roleUser = await new UserRole({role: 'User'}).save();

    // Insérez des utilisateurs
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

    // Insérez des thèmes d'événement
    const themeParty = await new EventTheme({theme: 'Party'}).save();
    const themeConference = await new EventTheme({theme: 'Conference'}).save();

    // Insérez des événements
    const event1 = await new Event({
        created_by: user1.email,
        theme_id: themeParty._id,
        name: 'Birthday Bash',
        date: new Date('2023-11-25')
    }).save();

    const event2 = await new Event({
        created_by: user2.email,
        theme_id: themeConference._id,
        name: 'Tech Conference',
        date: new Date('2024-02-20')
    }).save();

    // Insérez des likes d'événements par les utilisateurs
    await new UserLikeEvent({
        user_email: user1.email,
        event_id: event1._id
    }).save();

    await new UserLikeEvent({
        user_email: user2.email,
        event_id: event2._id
    }).save();

    // Insérez des chats entre utilisateurs
    const chat1 = await new Chat({
        user_email1: user1.email,
        user_email2: user2.email
    }).save();

    // Insérez des messages dans les chats
    await new Message({
        sender_email: user1.email,
        date: new Date(),
        chat_id: chat1._id
    }).save();

    await new Message({
        sender_email: user2.email,
        date: new Date(),
        chat_id: chat1._id
    }).save();

    console.log('Base de données peuplée avec succès!');
}

// Exécuter le script
populateDatabase().then(() => mongoose.connection.close());
