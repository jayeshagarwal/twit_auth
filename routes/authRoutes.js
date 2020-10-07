const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')
const TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser((user, callback)=> {
    callback(null,user);
})

passport.deserializeUser((obj, callback)=> {
    callback(null,obj);
})

passport.use(new TwitterStrategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: "http://localhost:8000/auth/twitter/return"
    },
    function(token, tokenSecret, profile, cb) {
        // console.log(token);
        // console.log(tokenSecret);
        // console.log(profile.username)
        User.findOrCreate({ username: profile.username,twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

router.get('/twitter/login', passport.authenticate('twitter'));
router.get('/auth/twitter/return', passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: '/me'
}));

module.exports = router