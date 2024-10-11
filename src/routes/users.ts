import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/users.js';
import { protectedRoute, validUserData } from '../middleware/user.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// User Middlewares to check token and role
router.use(verifyToken, protectedRoute);


router.get("/check", async (req, res) => {
    res.status(200).json({ message: 'User is authenticated' });
})



router.post("/temp", async (req, res) => {
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


router.get("/search", async (req, res) => {
    try {
        const { page = 1, limit = 10, email, name } = req.query;
        const skip = (page as number - 1) * (limit as number)


        const query: any = {};
        if (name) query.name = name;
        if (email) query.email = email;

        const users = await User.find(query).limit(limit as number * 1).skip(Math.max(0, skip));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }

})

// Create User (POST /users)
// This is for admin
router.post('/create', validUserData, async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});



// Get User by ID (GET /:id)
// User | Admin
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// Update User (PUT /:id)
// User | Admin
router.put('/:id', validUserData, async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const updateData: any = { name, email, role };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Delete User (DELETE /:id)
// User | Admin
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

export default router;