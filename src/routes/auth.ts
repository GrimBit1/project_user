import { Router } from "express";
import { User } from "../db/users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()


// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ error: "email and password are required" });
            return
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Authentication failed' });
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Authentication failed' });
            return
        }

        console.log(user)

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).cookie("token", token).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router