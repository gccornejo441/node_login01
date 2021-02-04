const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// Load User model
const User = require()

module.exports = function(passport) {
    passport.use(
        new localStrategy (
        (username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) return done(err);
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        })
    );
}
