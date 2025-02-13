// modules
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const fs = require('fs');

const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
const homeRouter = require('./routes/event.js');
const userRouter = require('./routes/user.js');
const chatRouter = require('./routes/chat.js');
const {verifyToken} = require("./middleware/authMiddleware");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
dotenv.config();

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

const ppDir = path.join(__dirname, 'public/pp');
if (!fs.existsSync(ppDir)) {
    fs.mkdirSync(ppDir);
}

const ppEvent = path.join(__dirname, 'public/event');
if (!fs.existsSync(ppEvent)) {
    fs.mkdirSync(ppEvent);
}

const port = process.env.PORT;

const server = http.createServer(app);

app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// TODO to remove once Angular app is created (serve /public/js/chat.js for websockets tests)
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());


app.use(session({
    secret: 'top secret',
    resave: true,
    saveUninitialized: true
}));

const io = new Server(server);

// Middleware to insert io in requests
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/event', homeRouter);
app.use('/user', verifyToken, userRouter); // Must be authenticated to be there
app.use('/chat', verifyToken, chatRouter); // Must be authenticated to be there

// server start
if (process.env.CI) {
    console.log("Running in CI mode - syntax and startup check only.");
    process.exit(0);  // Stop immediately in CI
} else {
    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

io.on('connection', (socket) => {
    console.log(`New connection. Socket id : ${socket.id}`);

    socket.on("join_room", (room) => {
        socket.join(room);
    });
});

async function connectToMongoDB() {
    const mongoHost = process.env.DOCKER ? "mongo" : "localhost";
    const mongoPort = process.env.MONGO_PORT || "27017";
    const mongoURL = `mongodb://${mongoHost}:${mongoPort}/${process.env.DATABASE_NAME}`;
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
        console.log("Connected to MongoDB");

    } catch (error) {
        console.error("Error while connectiong to MongoDB:", error);
    }
}

connectToMongoDB();