const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./services/passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');

// ========== MONGOOSE CONNECTION ==========
// =========================================
const dbUrl = keys.mongoURI;
mongoose.connect(dbUrl).catch((error) => console.log(error));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

// ========== APP SETUP ==========
// ===============================
const app = express();

// <<< --- Passport / Cookie Setup --- >>>
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        }
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb();
        }
    }
    next();
});

// ========== ROUTES ==========
// ============================
// <<< --- Auth Routes --- >>>
app.use('/', authRoutes)


// ========== SERVER ==========
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Backend Listening on port: ', PORT);
});