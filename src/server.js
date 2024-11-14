const express = require('express');
const initWebRoutes = require('./route/web.js');
const connectDB = require('./config/database.js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const psssportSetup = require('./passport.js');
const session = require('express-session');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3001', // Change to the frontend's URL (e.g., http://localhost:3001 for frontend on port 3001)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers you want to allow
  credentials: true,  // Allow cookies (for sessions)
};

app.use(session({
  secret: 'yourSecretKey', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to `true` for HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
connectDB();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

