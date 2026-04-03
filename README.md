# LaneVerse India - Full Stack Bowling Analytics Platform

Production-grade bowling analytics platform built for Indian 10-pin bowlers.

## Monorepo Structure

- `apps/frontend` - React + Vite + Tailwind UI (PWA-ready baseline)
- `apps/backend` - Node.js + Express + MongoDB + Socket.IO API

## Features Delivered

### Authentication & Roles
- Email/password registration and login
- OTP request + verify endpoints (email/WhatsApp integration-ready stubs)
- Role-based permissions (`ADMIN`, `PLAYER`, `CENTER_MANAGER`)

### Player Analytics
- Player profile endpoint with aggregated metrics
- Auto-calculated average score, strike %, spare %, split %
- Dashboard cards + performance score trend chart

### Game Tracking
- Frame-by-frame manual game entry (10 frames)
- Game history API
- Detailed frame storage for future scoring-system imports

### Leaderboards
- Daily / weekly / monthly leaderboard computation
- India city-based filter
- Rank with tie-breakers by average + best score

### Tournament & Auction
- Tournament CRUD seed (create + list)
- IPL-style player bids per tournament
- Live scoring events over Socket.IO rooms
- UPI field for registration fee collection

### Bowling Center Integration
- Center onboarding + manager assignment
- Brunswick integration object in schema for future API sync

### Notifications & Export
- Notification queue endpoint stub (`EMAIL` / `WHATSAPP`)
- CSV export endpoint for games (`/api/exports/games.csv`)

### India-specific UX
- English + Hindi language switch
- City-filtered rankings
- UPI-ready tournament metadata

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Chart.js (`react-chartjs-2`)
- i18next (English/Hindi)
- Socket.IO client

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT auth
- Zod request validation
- Socket.IO for real-time scoring

## Quick Start

### 1) Backend
```bash
cd apps/backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd apps/frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000/api`

## API Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/otp/request`
- `POST /api/auth/otp/verify`
- `GET /api/players/me`
- `POST /api/games`
- `GET /api/games/mine`
- `GET /api/leaderboard?range=weekly&city=Surat`
- `GET /api/tournaments`
- `POST /api/tournaments` (admin)
- `POST /api/tournaments/:id/bids` (admin)
- `GET /api/centers`
- `POST /api/centers` (admin/manager)
- `POST /api/notifications` (admin/manager)
- `GET /api/exports/games.csv`

## Deployment

- Frontend: Vercel
- Backend: Render/Firebase/any Node host
- Set CORS origin via `CLIENT_ORIGIN`

## Future-Ready Extensions

- Firebase Auth / Google OAuth provider bridging
- Brunswick scoring import service adapters
- AI insights microservice for coaching tips
- PWA manifest + offline sync cache
- Razorpay/UPI checkout integration for tournament payments
