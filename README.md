# Photography Portfolio (MERN)

## Structure
- `client/` — React + Vite + TanStack Start frontend
- `server/` — Express + MongoDB + Cloudinary backend

## Server
```
cd server
npm install
cp .env.example .env   # fill MONGODB_URI, CLOUDINARY_*, JWT_SECRET, ADMIN_*
npm run seed
npm run dev            # http://localhost:5000
```

## Client
```
cd client
bun install            # or npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
bun dev
```

Admin: http://localhost:3000/admin
