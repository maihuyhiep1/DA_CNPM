const express = require('express');
const initWebRoutes = require('./route/web.js');
const connectDB = require('./config/database.js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const configViewEngine = require('./config/viewEngine.js');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


configViewEngine(app);
initWebRoutes(app);
connectDB();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

