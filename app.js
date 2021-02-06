const express = require('express');
const passport = require('passport');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const app = express();

// Passport Config
require('./config/passport')(passport);

// MongoDB
const db = require('./config/keys').mongoURI;
mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

// Session Middleware
app.use(session({
    secret: 'shhh secret',
    saveUninitialized: true,
    resave: true
}));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Logger
app.use(logger('dev'));

// Ejs
app.set('view engine', 'ejs');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    next();
})


// Routes
app.use('/users', require('./routes/users.js'));

// Server Information
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

app.listen(PORT, HOST, (err) => {
    if (err) new Error(err);
    console.log(`Server running at http://${HOST}:${PORT}`);
});