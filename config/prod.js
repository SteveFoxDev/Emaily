const { redirectDomain } = require("./dev");

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  googleRedirectURI:
    "https://glacial-anchorage-15396-a039fe345a7d.herokuapp.com",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  fromEmail: process.env.FROM_EMAIL,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};
