const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./src/routes/postRoutes');
require('dotenv').config();

const app = express();

// Middleware để parse body từ request
app.use(bodyParser.json());

// Sử dụng các routes của posts
app.use('/api', postRoutes);

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
