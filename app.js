import express from "express";
import bodyParser from "body-parser";
const { json } = bodyParser;
import commentRoutes from "./routes/comment.routes.js";
import { sequelize } from "./models/comment.model.js";

const app = express();
const PORT = 3000;

app.use(json());
app.use("/api/comments", commentRoutes);

// Add CORS middleware if needed
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });