// modules
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const path = require('path');
const session = require("express-session");

const app = express();
dotenv.config();

const port = process.env.PORT;
app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret: 'top secret',
    resave: true,
    saveUninitialized: true
}));

const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');

app.use('/', indexRouter);
app.use('/auth', authRouter);


// server start
if (process.env.CI) {
    console.log("Running in CI mode - syntax and startup check only.");
    process.exit(0);  // Stop immediately in CI
} else {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

async function connectToMongoDB() {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {
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
