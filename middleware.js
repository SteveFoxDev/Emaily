const ExpressError = require('./utilities/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(new ExpressError('Must Be Logged In First', 401));        
    }
    next();
}