const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// to plug-in login options
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function (accessToken, refreshToken, profile, cb) {
    // a user has attempted a login
    // does user exist in database?
    User.findOne({
        googleId: profile.id
    }, function(err, user) {
        // if user does not exist, create user
        // check and handle errors
        if (err) return cb(err);
        // if user exists, proceed to login
        if (user) {
            return cb(null, user)
        } else {
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                avatarURL: profile.photos[0].value
            });

            newUser.save(function(err) {
                if (err) return cb(err);
                // user save is successful
                return cb(null, newUser);
            });
        }
    });
}));

// passport.serializeUser <-- gets called once when the user logs in to create a session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// passport.deserializeUser <-- get called with each request
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user); // creates req.user
    });
});