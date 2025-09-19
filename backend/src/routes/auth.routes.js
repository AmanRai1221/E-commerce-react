import { Router } from 'express';
import { z } from 'zod';
import { createUser, verifyUser } from '../utils/db.js';
import { signToken } from '../middleware/auth.js';

const router = Router();

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

router.post('/register', async (req, res, next) => {
    try {
        const data = registerSchema.parse(req.body);
        const user = await createUser(data);
        const token = signToken(user);
        return res.status(201).json({ user, token });
    } catch (e) {
        // Validation errors
        if (e?.name === 'ZodError') {
            res.status(400);
            return next(new Error(e.errors?.[0]?.message || 'Invalid input'));
        }
        // Duplicate email or our explicit exists error
        if (e?.code === 11000 || e?.message?.toLowerCase?.().includes('already registered')) {
            res.status(409);
            return next(new Error('Email already registered'));
        }
        return next(e);
    }
});

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

router.post('/login', async (req, res, next) => {
    try {
        const data = loginSchema.parse(req.body);
        const user = await verifyUser(data);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = signToken(user);
        return res.json({ user, token });
    } catch (e) {
        if (e?.name === 'ZodError') {
            res.status(400);
            return next(new Error(e.errors?.[0]?.message || 'Invalid input'));
        }
        return next(e);
    }
});

export default router;