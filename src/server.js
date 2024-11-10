const express = require('express');
const initWebRoutes = require('./route/web.js');
const connectDB = require('./config/database.js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const psssportSetup = require('./passport.js');
const session = require('express-session');

const app = express();


app.use(session({
  secret: 'yourSecretKey', // Replace with a strong secret
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
connectDB();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

