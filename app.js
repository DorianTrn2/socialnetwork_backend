// modules
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const session = require("express-session");
const constants = require("./constant");
const mongoose = require("mongoose");

const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
const homeRouter = require('./routes/home.js');

const app = express();
const port = 3001;

async function connectToMongoDB() {
    try {
        await mongoose.connect(`${constants.DATABASE_URL}/${constants.DATABASE_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
        console.log("Connected to MongoDB");

    } catch (error) {
        console.error("Error while connectiong to MongoDB:", error);
    }
}

connectToMongoDB().then(() => {
    app.use(morgan('dev'));

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: true }))

    app.use(session({
        secret: 'top secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use('/', indexRouter);
    app.use('/auth', authRouter);
    app.use('/home', homeRouter);

    // server start
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});