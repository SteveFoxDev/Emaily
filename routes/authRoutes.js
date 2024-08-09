const express = require('express');
const passport = require('passport');

const router = express.Router();
router.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email']}), 
    (req, res, next) => {
        
});

router.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/api/current_user');
    }
);

router.get('/api/logout',  (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
    });
    res.redirect('/');
});

router.get('/api/current_user',  (req, res, next) => {
    const user = req.user;
    res.send(user);
});

module.exports = router;