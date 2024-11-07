// modules
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const session = require("express-session");

const app = express();
const port = 3001;
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
