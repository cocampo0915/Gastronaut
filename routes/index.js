const express = require('express');
const passport = require('passport');
const router = express.Router();
const indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index);

// login route
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route - called back/requested after user logs in
router.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: '/destinations',
    failureRedirect: '/'
}));

// logout route
router.get('/logout', function(req, res) {
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect('/'); // send the user back to the home page
    }); // destroy the login session from the session store
});

module.exports = router;