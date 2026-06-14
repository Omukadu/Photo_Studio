# Photography Portfolio — Backend (Express + MongoDB + Cloudinary)

## Setup

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGODB_URI, JWT_SECRET, CLOUDINARY_* and ADMIN_*
npm run seed    # creates the first admin user
npm run dev     # http://localhost:5000
```

## Endpoints

Public:
- `GET  /api/health`
- `GET  /api/site/all`              — full hydration payload
- `GET  /api/:resource`             — list (hero-slides, services, portfolio, testimonials, featured-projects, stats, why-choose, instagram, categories)
- `GET  /api/settings/:key`         — about | contact | photographer
- `POST /api/messages`              — contact form submissions

Admin (JWT in `Authorization: Bearer <token>`):
- `POST   /api/auth/login`
- `GET    /api/auth/me`
- `POST   /api/:resource`
- `PUT    /api/:resource/:id`
- `DELETE /api/:resource/:id`
- `PUT    /api/settings/:key`
- `GET    /api/messages`
- `DELETE /api/messages/:id`
- `POST   /api/upload/:preset`     — multipart field `image`. Presets: hero, featured, service, about, portrait, square, landscape, category

## Aspect ratios (enforced server-side via Cloudinary `c_fill,g_auto`)

| Preset    | Size       | Used by                          |
|-----------|------------|----------------------------------|
| hero      | 2400x1350  | Hero slider (16:9)               |
| featured  | 2000x1125  | Featured projects (16:9)         |
| service   | 1200x1500  | Services cards (4:5)             |
| about     | 1200x1600  | About portrait (3:4)             |
| portrait  | 1200x1600  | Portfolio "tall" (3:4)           |
| square    | 1200x1200  | Portfolio "medium", IG, testim.  |
| landscape | 1600x1200  | Portfolio "short" (4:3)          |
| category  | 1200x1600  | Category showcase (3:4)          |

## Frontend connection

Add to the React app `.env`:
```
VITE_API_URL=http://localhost:5000/api
```
