const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./services/passport');
const keys = require('./config/keys');
const ExpressError = require('./utilities/ExpressError');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
// <<< --- Billing Routes --- >>>
app.use('/', billingRoutes);

// ========== FRONTEND ROUTES ==========
// =====================================
if (process.env.NODE_ENV === 'production'){
    // <<< --- React Files --- >>>
    app.use(express.static(';client/build'));
    // <<< --- REACT Index.html --- >>>
    app.get('*',  (req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};
// ========== ERROR HANDLER ==========
// ===================================
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((error, req, res, next) => {
    const { statusCode = 500 } = error;
    if(!error.message) error.message = 'Something Went Wrong';
    res.headerSent ? next(error) : res.status(statusCode).json(error.message);
});

// ========== SERVER ==========
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Backend Listening on port: ', PORT);
});