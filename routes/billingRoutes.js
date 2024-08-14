const express = require('express');

const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const router = express.Router();

router.post('/api/stripe', isLoggedIn, catchAsync(async (req, res, next) => {
   const user = req.user;
   const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 Emaily Credits',
        source: req.body.id,   
    });
    if(!charge){
        return next(error);
    }
    user.credits += 5;
    await user.save();
    res.send(user);
}));

module.exports = router;