import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import router from './route/api.js';

// Hidden important config
dotenv.config(); // Load environment variables

// Declare APP
const app = express();

// Middleware (No need for body-parser)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection (No deprecated options)
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(process.env.PORT, () => console.log('Server started on port', process.env.PORT));
    })
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/', router);

