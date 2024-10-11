import express, { } from 'express';
import { createServer } from 'node:http';
import mongoose from 'mongoose';
import "dotenv/config"
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io';
import bcrypt from 'bcrypt'
import { User } from './db/users.js';

const app = express();
const server = createServer(app)
const io = new Server(server)
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoute)
app.use("/users", userRoute)

io.on('connection', (socket) => {
    console.log('a user connected');
})

app.get("/", (req, res) => {

    res.sendFile("/home/aditya/Desktop/node/src/index.html")
})

app.post("/temp", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
})

server.listen(port, async () => {
    await mongoose.connect(process.env.DB, {
        dbName: process.env.DB_NAME,
    })
    console.log("Database connected")
    console.log(`Server running at http://localhost:${port}`);
});
export { io }