# Photography Portfolio — Client (Plain Vite + React JS)

Luxury photography portfolio frontend. Plain JavaScript, no TypeScript, no TanStack.

## Stack
- React 18 + Vite 5 (JavaScript)
- react-router-dom (routes: `/` and `/admin`)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion (animations)
- @tanstack/react-query (data fetching)
- react-hot-toast (notifications)
- lucide-react (icons)

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend
npm run dev            # http://localhost:3000
```

- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin
  - Default login: `admin@studio.com` / `admin123` (from server seed)

If the backend is not running, the public site automatically falls back to the
built-in hardcoded content in `src/lib/site-data.js`.

## Build

```bash
npm run build
npm run preview
```

## Folder structure

```
src/
  pages/
    Home.jsx              # public landing
    Admin.jsx             # admin panel (login + dashboard)
  components/
    site/                 # public site sections
    admin/                # admin building blocks
  hooks/use-site-data.js  # fetches from API, falls back to defaults
  lib/
    api.js                # tiny REST client + auth token
    site-data.js          # hardcoded fallback content
  index.css               # Tailwind v4 + design tokens
  main.jsx
  App.jsx
```
