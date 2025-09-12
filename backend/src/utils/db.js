// MongoDB-backed data access layer
import bcrypt from 'bcryptjs';
import Item from '../models/Item.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';

// Seed sample items (only if empty)
export async function seedItems() {
    const count = await Item.countDocuments();
    if (count > 0) return;
    const sample = [
        { title: "Printed Men's Shirt", price: 300, category: 'fashion', image: '/img/product/f1.jpg' },
        { title: "White Printed Men's Shirt", price: 500, category: 'fashion', image: '/img/product/f4.jpg' },
        { title: 'T-Shirts & Shirt Combo', price: 600, category: 'fashion', image: '/img/product/f6.jpg' },
        { title: 'Amazon Echo Dot smart Speaker (Alexa)', price: 5500, category: 'electronics', image: '/img/elect/alexa-e1.jpg' },
        { title: 'Canon EOS 5D series DSLR Camera', price: 64399, category: 'electronics', image: '/img/elect/camera-e2.jpg' },
        { title: 'iPhone 15 pro max', price: 99999, category: 'electronics', image: '/img/elect/iphone-e3.jpg' },
    ];
    await Item.insertMany(sample.map((s) => ({ description: '', ...s })));
}

export async function createUser({ name, email, password }) {
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) throw new Error('Email already registered');
    const passHash = await bcrypt.hash(password, 10);
    const doc = await User.create({ name, email: email.toLowerCase(), passHash });
    return { id: String(doc._id), name: doc.name, email: doc.email };
}

export async function verifyUser({ email, password }) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passHash);
    if (!ok) return null;
    return { id: String(user._id), name: user.name, email: user.email };
}

export async function getItems({ q, minPrice, maxPrice, categories, skip = 0, limit = 20 }) {
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (typeof minPrice === 'number' || typeof maxPrice === 'number') {
        filter.price = {};
        if (typeof minPrice === 'number') filter.price.$gte = minPrice;
        if (typeof maxPrice === 'number') filter.price.$lte = maxPrice;
    }
    if (categories?.length) filter.category = { $in: categories };

    const [items, total] = await Promise.all([
        Item.find(filter).skip(skip).limit(limit).lean(),
        Item.countDocuments(filter),
    ]);
    // Normalize id field
    const mapped = items.map(({ _id, ...rest }) => ({ id: String(_id), ...rest }));
    return { items: mapped, total };
}

export async function getItem(id) {
    const doc = await Item.findById(id).lean();
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return { id: String(_id), ...rest };
}

export async function createItem(data) {
    const doc = await Item.create({
        title: data.title,
        price: Number(data.price) || 0,
        category: data.category || 'general',
        image: data.image || '',
        description: data.description || '',
    });
    return { id: String(doc._id), title: doc.title, price: doc.price, category: doc.category, image: doc.image, description: doc.description };
}

export async function updateItem(id, data) {
    const doc = await Item.findByIdAndUpdate(id, data, { new: true }).lean();
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return { id: String(_id), ...rest };
}

export async function deleteItem(id) {
    const res = await Item.findByIdAndDelete(id);
    return !!res;
}

export async function getCart(userId) {
    const cart = await Cart.findOne({ userId }).lean();
    return cart?.items?.map((it) => ({ itemId: String(it.itemId), qty: it.qty })) || [];
}

export async function setCart(userId, items) {
    await Cart.findOneAndUpdate(
        { userId },
        { userId, items: items.map((it) => ({ itemId: it.itemId, qty: it.qty })) },
        { upsert: true, new: true }
    );
}