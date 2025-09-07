import { Router } from 'express';
import { z } from 'zod';
import { createUser, verifyUser } from '../utils/db.js';
import { signToken } from '../middleware/auth.js';

const router = Router();

const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

router.post('/register', async (req, res, next) => {
    try {
        const data = registerSchema.parse(req.body);
        const user = await createUser(data);
        const token = signToken(user);
        res.status(201).json({ user, token });
    } catch (e) {
        next(e);
    }
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

router.post('/login', async (req, res, next) => {
    try {
        const data = loginSchema.parse(req.body);
        const user = await verifyUser(data);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const token = signToken(user);
        res.json({ user, token });
    } catch (e) {
        next(e);
    }
});

export default router;