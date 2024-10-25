const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./src/routes/postRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/api', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
