const express = require('express');
const passport = require('passport');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();


// Session Middleware
app.use(session({
    secret: 'shhh secret',
    saveUninitialized: true,
    resave: true
}))

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Logger
app.use(logger('dev'));

// Ejs
app.set('view engine', 'ejs');

// Routes
app.use('/users', require('./routes/users.js'));

// Server Information
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

app.listen(PORT, HOST, (err) => {
    if (err) new Error(err);
    console.log(`Server running at http://${HOST}:${PORT}`);
});