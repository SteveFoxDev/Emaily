const express = require("express");

const { isLoggedIn, hasCredits } = require("../middleware");
const getFeedback = require("../utilities/webhookData");
const Survey = require("../models/survey");
const catchAsync = require("../utilities/catchAsync");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const ExpressError = require("../utilities/ExpressError");

const router = express.Router();
router.get('/api/surveys', isLoggedIn, catchAsync(async (req, res, next) => {
  const user = req.user;
  const surveys = await Survey.find({ _user: user }, '-recipients');
  if (!surveys) {
    next(new ExpressError('Something Went Wrong', '500'));
  }
  res.send(surveys);
}));

// Thank You Route
router.get("/api/surveys/:surveyId/:choice", (req, res, next) => {
  res.send("Thank You for your participation!");
});

// Create Survey
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
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.toLowerCase().trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    survey.totalSent = survey.recipients.length;
    // <<< --- Send Email --- >>>
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
    // <<< --- Save Survey to DB --- >>>
    await survey.save();
    // <<< --- Update User Credits --- >>>
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  }),
);

// Record Feedback
router.post("/api/surveys/webhooks", (req, res, next) => {
  const feedback = getFeedback(req.body);
  for (let f of feedback) {
    Survey.updateOne(
      {
        _id: f.surveyId,
        recipients: {
          $elemMatch: { email: f.email, clicked: false },
        },
      },
      {
        $inc: { [f.choice]: 1 }, // increment by 1
        $set: { "recipients.$.clicked": true }, // set clicked to true
        lastRespnded: new Date(),
      },
    ).exec();
  }

  res.send({});
});

module.exports = router;
