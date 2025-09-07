import { Router } from 'express';
import { z } from 'zod';
import { createItem, deleteItem, getItem, getItems, updateItem } from '../utils/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/items? q, minPrice, maxPrice, categories=a,b,c, skip, limit
router.get('/', (req, res) => {
    const { q, minPrice, maxPrice, categories, skip, limit } = req.query;
    const cats = typeof categories === 'string' && categories.length
        ? categories.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined;
    const result = getItems({
        q,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        categories: cats,
        skip: skip ? Number(skip) : 0,
        limit: limit ? Number(limit) : 20,
    });
    res.json(result);
});

// GET /api/items/:id
router.get('/:id', (req, res) => {
    const item = getItem(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

const itemSchema = z.object({
    title: z.string().min(1),
    price: z.number().nonnegative(),
    category: z.string().min(1),
    image: z.string().optional().default(''),
    description: z.string().optional().default(''),
});

// Create item (protected)
router.post('/', requireAuth, (req, res, next) => {
    try {
        const parsed = itemSchema.parse({
            ...req.body,
            price: Number(req.body.price),
        });
        const item = createItem(parsed);
        res.status(201).json(item);
    } catch (e) {
        next(e);
    }
});

// Update item (protected)
router.put('/:id', requireAuth, (req, res) => {
    const data = req.body;
    if (data.price != null) data.price = Number(data.price);
    const updated = updateItem(req.params.id, data);
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.json(updated);
});

// Delete item (protected)
router.delete('/:id', requireAuth, (req, res) => {
    const ok = deleteItem(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Item not found' });
    res.json({ success: true });
});

export default router;