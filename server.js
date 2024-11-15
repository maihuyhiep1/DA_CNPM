const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./src/routes/postRoutes');
const path = require('path');
require('dotenv').config();

const app = express();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware để parse body từ request
app.use(bodyParser.json());

// Sử dụng các routes của posts
app.use('/api', postRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
