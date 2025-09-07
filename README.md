# React E-Commerce (Frontend + Backend)

A simple e-commerce web app with a React (Vite) frontend and a Node/Express backend. It includes basic authentication (signup/login), item browsing, and a cart with JWT-protected API routes. The backend uses an in-memory store for demo purposes.

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Backend**: Node.js, Express, JWT (jsonwebtoken), Zod (validation), bcryptjs
- **Tooling**: Vercel (frontend hosting)

## Project Structure

```
react-ecom/
├─ ecommerce/               # Frontend (React + Vite)
│  ├─ src/
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.js
│  └─ vercel.json           # Vercel config for SPA fallback
└─ backend/                 # Backend (Express)
   ├─ src/
   │  ├─ routes/
   │  ├─ middleware/
   │  ├─ utils/
   │  └─ server.js
   └─ package.json
```

## Features

- **Frontend**
  - Pages: Home, Shop, Blog, About, Contact, Cart, Login, Signup
  - Client-side routing (React Router)
  - Authentication UI flows (login/signup)
  - Calls API via a small helper using `VITE_API_BASE_URL`
- **Backend**
  - JWT-based auth (register/login)
  - Items listing with simple filtering params
  - Cart management (protected by JWT)
  - In-memory database (resets on server restart)

---

## Local Development

### Prerequisites

- Node.js 18+ recommended

### 1) Backend (Express)

1. Create a `.env` in `backend/`:
   ```env
   PORT=4000
   JWT_SECRET=your-strong-secret
   ```
2. Install and run:
   ```bash
   cd backend
   npm install
   npm run dev   # or: npm start
   ```
3. The API should be available on `http://localhost:4000`.

### 2) Frontend (Vite + React)

1. Create a `.env` in `ecommerce/` (for local dev):
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```
2. Install and run:
   ```bash
   cd ecommerce
   npm install
   npm run dev
   ```
3. Open the app in the browser (Vite will show the local URL, typically `http://localhost:5173`).

---

## Available Scripts

### Backend (from `backend/`)

- **dev**: `node --watch src/server.js`
- **start**: `node src/server.js`

### Frontend (from `ecommerce/`)

- **dev**: `vite`
- **build**: `vite build`
- **preview**: `vite preview`

---

## API Overview

Base URL: `http://localhost:4000`

- **Health**

  - `GET /api/health` → `{ status: "ok" }`

- **Auth**

  - `POST /api/auth/register` → body: `{ name, email, password }` → `{ user, token }`
  - `POST /api/auth/login` → body: `{ email, password }` → `{ user, token }`

- **Items**

  - `GET /api/items` (query: `q`, `minPrice`, `maxPrice`, `categories=a,b`, `skip`, `limit`) → `{ items, total }`
  - `GET /api/items/:id` → item
  - `POST /api/items` (protected) → body: `{ title, price, category, image?, description? }`
  - `PUT /api/items/:id` (protected)
  - `DELETE /api/items/:id` (protected)

- **Cart** (all routes require `Authorization: Bearer <token>`)
  - `GET /api/cart` → `{ items: [{ itemId, qty }] }`
  - `PUT /api/cart` → body: `{ items: [{ itemId, qty }] }` → replaces cart
  - `POST /api/cart/add` → body: `{ itemId, qty? }`
  - `PATCH /api/cart/:itemId` → body: `{ qty }`
  - `DELETE /api/cart/:itemId`

> Note: The backend uses an in-memory store; data resets on server restarts.

---

## Deployment

### Frontend on Vercel

The repository already includes `ecommerce/vercel.json` with an SPA fallback so client-side routes work.

In Vercel project settings:

1. **Root Directory**: `ecommerce`
2. **Build Command**: `npm run build` (or leave empty to use default)
3. **Install Command**: `npm ci` (or leave empty)
4. **Output Directory**: `dist`
5. Environment Variables:
   - `VITE_API_BASE_URL` → set to your deployed backend URL
6. If you previously saw "vite: command not found": make sure you use `npm run build` and that devDependencies are installed (do not set `NPM_CONFIG_PRODUCTION=true`). Clear build cache and redeploy if needed.

### Backend Hosting

- The backend is a standard Express server. Deploy it on a Node host (Render, Railway, Fly.io, etc.).
- Set `JWT_SECRET` on the host. Note that the in-memory DB resets on restarts; for persistence you’ll want to swap in a real database later.

---

## Environment Variables Summary

- **Backend** (in `backend/.env`)
  - `PORT` (default 4000)
  - `JWT_SECRET` (required)
- **Frontend** (in `ecommerce/.env`)
  - `VITE_API_BASE_URL` (required in production)

---

## Notes and Future Improvements

- Replace in-memory storage with a real database (e.g., PostgreSQL, MongoDB).
- Add product images hosting or a CDN.
- Implement order/checkout flow.
- Protect admin item CRUD with proper roles.

---

## License

This project is provided as-is for learning/demo purposes.
