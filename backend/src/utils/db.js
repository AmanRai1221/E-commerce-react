// In-memory data store (replace with real DB later if needed)
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export const db = {
    users: [], // { id, name, email, passHash }
    items: [], // { id, title, price, category, image, description }
    carts: new Map(), // userId -> [{ itemId, qty }]
};

// Seed sample items
function seedItems() {
    if (db.items.length) return;
    const sample = [
        { title: "Printed Men's Shirt", price: 300, category: 'fashion', image: '/img/product/f1.jpg' },
        { title: 'White Printed Men\'s Shirt', price: 500, category: 'fashion', image: '/img/product/f4.jpg' },
        { title: 'T-Shirts & Shirt Combo', price: 600, category: 'fashion', image: '/img/product/f6.jpg' },
        { title: 'Amazon Echo Dot smart Speaker (Alexa)', price: 5500, category: 'electronics', image: '/img/elect/alexa-e1.jpg' },
        { title: 'Canon EOS 5D series DSLR Camera', price: 64399, category: 'electronics', image: '/img/elect/camera-e2.jpg' },
        { title: 'iPhone 15 pro max', price: 99999, category: 'electronics', image: '/img/elect/iphone-e3.jpg' },
    ];
    db.items = sample.map((s) => ({ id: nanoid(), description: '', ...s }));
}
seedItems();

export async function createUser({ name, email, password }) {
    const exists = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('Email already registered');
    const passHash = await bcrypt.hash(password, 10);
    const user = { id: nanoid(), name, email, passHash };
    db.users.push(user);
    return { id: user.id, name: user.name, email: user.email };
}

export async function verifyUser({ email, password }) {
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passHash);
    if (!ok) return null;
    return { id: user.id, name: user.name, email: user.email };
}

export function getItems({ q, minPrice, maxPrice, categories, skip = 0, limit = 20 }) {
    let items = [...db.items];
    if (q) {
        const term = q.toLowerCase();
        items = items.filter((i) => i.title.toLowerCase().includes(term));
    }
    if (typeof minPrice === 'number') items = items.filter((i) => i.price >= minPrice);
    if (typeof maxPrice === 'number') items = items.filter((i) => i.price <= maxPrice);
    if (categories?.length) {
        const set = new Set(categories.map((c) => c.toLowerCase()));
        items = items.filter((i) => set.has(i.category.toLowerCase()));
    }
    const total = items.length;
    items = items.slice(skip, skip + limit);
    return { items, total };
}

export function getItem(id) {
    return db.items.find((i) => i.id === id) || null;
}

export function createItem(data) {
    const item = { id: nanoid(), title: data.title, price: Number(data.price) || 0, category: data.category || 'general', image: data.image || '', description: data.description || '' };
    db.items.push(item);
    return item;
}

export function updateItem(id, data) {
    const idx = db.items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    db.items[idx] = { ...db.items[idx], ...data };
    return db.items[idx];
}

export function deleteItem(id) {
    const before = db.items.length;
    db.items = db.items.filter((i) => i.id !== id);
    return db.items.length < before;
}

export function getCart(userId) {
    return db.carts.get(userId) || [];
}

export function setCart(userId, items) {
    db.carts.set(userId, items);
}