const localStrategy = require('passport-local').Strategy;


// Load User model
const User = require('../models/Users.js');

module.exports = function(passport) {
    passport.use(
        new localStrategy ({ usernameField: 'username' },
        (username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) return done(err);
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                return done(null, user);
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          if (err) { return done(err); }
          done(null, user);
        });
      });
}

  