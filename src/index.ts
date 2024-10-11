import express, { } from 'express';
import { createServer } from 'node:http';
import mongoose from 'mongoose';
import "dotenv/config"
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io';
import { dirname } from 'path'
import e from 'express';

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
    // console.log(socket)
})

app.get("/", (req, res) => {

    res.sendFile("/home/aditya/Desktop/node/src/index.html")
})

server.listen(port, async () => {
    await mongoose.connect(process.env.DB, {
        dbName: process.env.DB_NAME,
    })
    console.log("Database connected")
    console.log(`Server running at http://localhost:${port}`);
});
export { io }