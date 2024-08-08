const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret:  keys.googleClientSecret,
    callbackURL: `${keys.googleRedirectURI}/auth/google/callback`
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
        if(!existingUser){
            const user = new User({ googleId: profile.id });
            await user.save();
            return done(null, user);
        } else {
            return done(null, existingUser);
        }
    }
));