# EstateHub — Real Estate Platform

A full-stack real estate web app where users can see property listings, register/login, save favourites, and manage them from a personal dashboard.

**Live Demo:** https://estatehub-frontend.onrender.com

## How to Run Locally

### Prerequisites
- Node.js 18+
- PostgreSQL (or a free [Neon](https://neon.tech) cloud database)

### 1. Set up the backend
```bash
git clone https://github.com/manishaa8981/estate_hub_backend.git
cd backend
npm install
```
Create a `backend/.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=any_long_random_string
NODE_ENV=development
```

Run the database schema (one time only):

```bash
psql $DATABASE_URL -f db/db.sql
```

> **Using Neon?** Go to your Neon project → **SQL Editor** and run this:
>
> ```sql
> CREATE TABLE IF NOT EXISTS users (
>   id SERIAL PRIMARY KEY,
>   name VARCHAR(100) NOT NULL,
>   email VARCHAR(100) UNIQUE NOT NULL,
>   password VARCHAR(255) NOT NULL,
>   role VARCHAR(50) DEFAULT 'buyer',
>   created_at TIMESTAMP DEFAULT NOW()
> );
>
> CREATE TABLE IF NOT EXISTS favourites (
>   id SERIAL PRIMARY KEY,
>   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
>   property_id VARCHAR(100) NOT NULL,
>   property_title VARCHAR(200),
>   property_price VARCHAR(50),
>   property_location VARCHAR(200),
>   property_image TEXT,
>   property_beds INTEGER,
>   property_baths INTEGER,
>   property_sqft INTEGER,
>   property_tag VARCHAR(50),
>   created_at TIMESTAMP DEFAULT NOW(),
>   UNIQUE(user_id, property_id)
> );
> ```

Start the backend:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`

### 2. Set up the frontend

```bash
git clone https://github.com/manishaa8981/estate_hub_frontend.git
cd frontend
npm install
```
Create a `frontend/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend:

```bash
npm run dev
```
Frontend runs at `http://localhost:5173`
---

## Example Flows

### Sign Up → Login → Save a Favourite

1. Open `http://localhost:5173`
2. Click **Get Started** in the navbar
3. Fill in your name, email, password (min 8 chars, 1 uppercase, 1 number), and role
4. Click **Create Account** — you'll be redirected to your dashboard
5. Click **Browse more →** to go back to the landing page
6. Click the  heart button on any property card to save it
7. Go back to your dashboard — the saved property appears under **My Favourites**
8. Click **Remove** on any favourite to delete it (confirmation dialog appears first)
9. Click **Sign Out** → confirm → you're logged out and redirected to the home page

### Login Flow

1. Click **Sign In** in the navbar
2. Enter your registered email and password
3. Click **Sign In** — on success you'll see a "Welcome back!" toast and be redirected to your dashboard

### Remove a Favourite

1. Go to `/dashboard`
2. Click **Remove** on any saved property
3. A confirmation modal appears — click **Remove** to confirm or **Keep it** to cancel
4. A success toast confirms the removal

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (Neon) |
| Auth | JWT (7-day expiry), bcryptjs |
| Icons | Lucide React |

