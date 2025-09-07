import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getCart, setCart, getItem } from '../utils/db.js';

const router = Router();

// Get cart for current user
router.get('/', requireAuth, (req, res) => {
    const items = getCart(req.user.sub);
    res.json({ items });
});

// Replace entire cart
router.put('/', requireAuth, (req, res) => {
    const incoming = Array.isArray(req.body?.items) ? req.body.items : [];
    // Validate entries
    const sanitized = incoming
        .map((it) => ({ itemId: String(it.itemId), qty: Math.max(1, Number(it.qty) || 1) }))
        .filter((it) => !!getItem(it.itemId));
    setCart(req.user.sub, sanitized);
    res.json({ items: sanitized });
});

// Add or increment an item in cart
router.post('/add', requireAuth, (req, res) => {
    const { itemId, qty } = req.body || {};
    const item = getItem(String(itemId));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    const cur = getCart(req.user.sub);
    const existing = cur.find((c) => c.itemId === item.id);
    if (existing) existing.qty += Math.max(1, Number(qty) || 1);
    else cur.push({ itemId: item.id, qty: Math.max(1, Number(qty) || 1) });
    setCart(req.user.sub, cur);
    res.status(201).json({ items: cur });
});

// Update quantity for one item
router.patch('/:itemId', requireAuth, (req, res) => {
    const { qty } = req.body || {};
    let cur = getCart(req.user.sub);
    const idx = cur.findIndex((c) => c.itemId === req.params.itemId);
    if (idx === -1) return res.status(404).json({ message: 'Not in cart' });
    const newQty = Math.max(1, Number(qty) || 1);
    cur[idx].qty = newQty;
    setCart(req.user.sub, cur);
    res.json({ items: cur });
});

// Remove an item
router.delete('/:itemId', requireAuth, (req, res) => {
    const cur = getCart(req.user.sub).filter((c) => c.itemId !== req.params.itemId);
    setCart(req.user.sub, cur);
    res.json({ items: cur });
});

export default router;