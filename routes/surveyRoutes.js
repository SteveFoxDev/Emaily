const express = require("express");

const { isLoggedIn, hasCredits } = require("../middleware");
const User = require("../models/user");
const Survey = require("../models/survey");
const catchAsync = require("../utilities/catchAsync");

const router = express.Router();

router.post(
  "/api/surveys",
  isLoggedIn,
  hasCredits,
  catchAsync(async (req, res, next) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now()
     });

     await survey.save();
  })
);