const express = require('express');

const { isLoggedIn, hasCredits } = require('../middleware');
const User = require('../models/user');
const Survey = require('../models/survey');
const catchAsync = require('../utilities/catchAsync');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const router = express.Router();

router.get('/api/surveys/thanks',  (req, res, next) => {
  res.send('Thank You for your participation!');
});

router.post(
  '/api/surveys',
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

     // <<< --- Send Email --- >>>
     const mailer = new Mailer(survey, surveyTemplate(survey));
     await mailer.send();
     // <<< --- Save Survey to DB --- >>>
     await survey.save();
     // <<< --- Update User Credits --- >>>
     req.user.credits -= 1;
     const user = await req.user.save();
     res.send(user);
  })
);

module.exports = router;