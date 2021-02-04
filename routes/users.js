const express = require('express');
const session = require('express-session');

// User Models
const Users = require('../models/Users');

const router = express.Router();

// Session Middleware
router.use(session({
    secret: 'shhh secret',
    saveUninitialized: true,
    resave: true
}))


router.get('/login', (req, res, next) => {
    res.render('login');
})

router.post('/login', (req, res, next) => {
    console.log(req.body);
    res.send('Hello, World!')
})



module.exports = router;