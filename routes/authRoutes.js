const express = require('express');
const passport = require('passport');

const router = express.Router();
router.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email']}), 
    );

router.get('/auth/google/callback',
    passport.authenticate('google'),
    
);

router.get('/api/logout',  (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
    });
   res.send('logged out');
});

router.get('/api/current_user',  (req, res, next) => {
    const user = req.user;
    
    res.send(user);
});

module.exports = router;