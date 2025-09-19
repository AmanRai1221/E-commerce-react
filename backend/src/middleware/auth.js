import jwt from 'jsonwebtoken';

// Resolve secret at call time to avoid ESM import order issues
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Server misconfigured: JWT_SECRET is not set');
    return secret;
}

export function signToken(user) {
    const secret = getJwtSecret();
    return jwt.sign({ sub: user.id, name: user.name, email: user.email }, secret, { expiresIn: '7d' });
}

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const secret = getJwtSecret();
        const payload = jwt.verify(token, secret);
        req.user = payload;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}