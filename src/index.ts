import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import verifyToken from './middleware/auth.js';
import cookieParser from 'cookie-parser'
import { protectedRoute } from './middleware/user.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoute)
app.use("/users", userRoute)

app.listen(port, async () => {
    await mongoose.connect(process.env.DB, {
        dbName: process.env.DB_NAME,
    })
    console.log("Database connected")
    console.log(`Server running at http://localhost:${port}`);
});