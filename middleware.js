const ExpressError = require("./utilities/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(new ExpressError("Must Be Logged In First", 401));
  }
  next();
};

module.exports.hasCredits = (req, res, next) => {
  if (req.user.credits < 1) {
    return next(new ExpressError("Not enough credits!", 402));
  }
  next();
};
