const express = require('express');
const session = require('express-session');
const passport = require('passport');
const assert = require('assert');


// User Models
const Users = require('../models/Users');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login');
})

router.get('/register', (req, res, next) => {
    res.render('register')
})

router.post('/register', (req, res, next) => {
    const {username, password} = req.body; 
    console.log(req.body);
    if (!username || !password) {
        const err = new Error('You need to input a username and password');
        err.status = 403;
        next(err);
    } else {
        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        console.log(newUser);
        newUser.save((err, Users) => {
            if (err) {
                console.log(err);
                res.redirect('/users/register');
            } else {
                req.flash('message', 'Successful Registration!')
                res.redirect('/users/register')
            }
        })
    }
});

// 

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/users/login',
      failureRedirect: '/users/register',
      failureFlash: true
    })(req, res, next);
  });

router.post('/register',
  passport.authenticate('local', { successRedirect: '/users/login',
                                   failureRedirect: '/users/register',
                                   failureFlash: true })
);
  


module.exports = router;