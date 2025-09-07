// Backend API helper
// Configure base URL via Vite env (VITE_API_BASE_URL) or override here
const DEFAULT_BASE = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:4000';

export const API = {
    baseURL: DEFAULT_BASE,

    // Token storage key (keep separate from existing storage util to avoid file changes)
    tokenKey: 'ecommerce_token',

    get token() {
        try { return JSON.parse(localStorage.getItem(this.tokenKey)); } catch { return null; }
    },
    set token(t) {
        if (!t) localStorage.removeItem(this.tokenKey);
        else localStorage.setItem(this.tokenKey, JSON.stringify(t));
    },

    async request(path, { method = 'GET', body, auth = false } = {}) {
        const headers = { 'Content-Type': 'application/json' };
        if (auth && this.token) headers['Authorization'] = `Bearer ${this.token}`;
        const res = await fetch(`${this.baseURL}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            const msg = data?.message || `HTTP ${res.status}`;
            throw new Error(msg);
        }
        return data;
    },

    // Auth
    register({ name, email, password }) {
        return this.request('/api/auth/register', { method: 'POST', body: { name, email, password } });
    },
    login({ email, password }) {
        return this.request('/api/auth/login', { method: 'POST', body: { email, password } });
    },

    // Items
    getItems(params = {}) {
        const q = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
            if (v != null && v !== '') q.append(k, Array.isArray(v) ? v.join(',') : v);
        });
        const query = q.toString() ? `?${q.toString()}` : '';
        return this.request(`/api/items${query}`);
    },
    getItem(id) { return this.request(`/api/items/${id}`); },

    // Cart
    getCart() { return this.request('/api/cart', { auth: true }); },
    replaceCart(items) { return this.request('/api/cart', { method: 'PUT', body: { items }, auth: true }); },
    addToCart(itemId, qty = 1) { return this.request('/api/cart/add', { method: 'POST', body: { itemId, qty }, auth: true }); },
    updateCartItem(itemId, qty) { return this.request(`/api/cart/${itemId}`, { method: 'PATCH', body: { qty }, auth: true }); },
    removeCartItem(itemId) { return this.request(`/api/cart/${itemId}`, { method: 'DELETE', auth: true }); },

    // Helper: try to resolve backend itemId by frontend product fields
    async resolveItemIdByProduct(product) {
        // Try by title match, fallback by image path
        const title = product?.name || product?.title || '';
        const image = product?.image || '';
        const { items } = await this.getItems({ q: title });
        let match = items?.find((i) => i.image === image && i.title.toLowerCase() === title.toLowerCase());
        if (!match) match = items?.find((i) => i.title.toLowerCase() === title.toLowerCase());
        if (!match && image) match = items?.find((i) => i.image === image);
        return match?.id || null;
    }
};