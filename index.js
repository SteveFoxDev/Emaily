const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret:  keys.googleClientSecret,
    callbackURL: '/auth/google/callback '
    }, 
    (accessToken, refreshToken, profile, cb) => {
        console.log('access token: ', accessToken);
        console.log('refresh token: ', refreshToken);
        console.log('profile: ', profile);
    }
));

app.get('/',  (req, res, next) => {
    res.send({hello: 'world'});
});

app.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email']}), 
    (req, res, next) => {
        
});

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/auth/google'}),
    (req, res, next) => {
        res.redirect('/');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});