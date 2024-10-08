const express = require("express");
const passport = require("passport");

const ExpressError = require("../utilities/ExpressError");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect("/surveys");
  },
);

router.get("/api/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(new ExpressError("Something Went Wrong", 500));
    }
  });
  res.redirect("/");
});

router.get("/api/current_user", (req, res, next) => {
  const user = req.user;
  res.send(user);
});

module.exports = router;
