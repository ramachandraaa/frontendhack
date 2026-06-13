# Company CRM Frontend

Production-ready React + TypeScript frontend for the Company CRM backend.

**Backend API:** `http://localhost:8080/api`

## Tech Stack

- React 18 + TypeScript
- Vite
- Material UI 6 + MUI X Data Grid
- React Router DOM
- Axios (JWT interceptors)
- TanStack React Query
- React Hook Form
- Notistack (toast notifications)
- Context API (Auth + Theme)

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

App: `http://localhost:5173`  
API proxy: `/api` → `http://localhost:8080`

## Project Structure

```
src/
├── api/              # Axios API modules
├── components/       # Reusable UI (dialogs, search, timeline, etc.)
├── contexts/         # Auth + Theme providers
├── hooks/            # React Query hooks
├── layouts/          # Auth + Main CRM layout
├── pages/            # Route pages (lazy-loaded)
├── routes/           # Route config + path helpers
├── services/         # Auth + localStorage
├── theme/            # Light/dark MUI theme
├── types/            # DTO interfaces
└── utils/            # Date, validation, API helpers
```

## Features

| Module | Endpoints | UI |
|--------|-----------|-----|
| Auth | `POST /auth/login`, `/auth/register` | Login, Register, JWT persistence |
| Dashboard | `GET /dashboard` | Stat cards |
| Companies | CRUD `/companies` | DataGrid, search, dialogs |
| Company Details | `GET /companies/{id}/hr-contacts` | Company info + HR cards |
| HR Management | CRUD `/hr-contacts` | Add/Edit/Delete dialogs |
| HR Profile | `GET/POST /hr-updates` | Timeline + add update form |
| Reminders | `GET/POST/PUT /reminders` | DataGrid + form dialog |
| Calling List | `GET /calling-list/today` | Click row → HR profile |
| Activity | `GET /activity` | Timeline feed |
| Search | `GET /search` | Navbar autocomplete + Search page |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |

## Environment

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Routes

| Path | Page |
|------|------|
| `/login` | Login |
| `/register` | Register |
| `/` | Dashboard |
| `/companies` | Companies |
| `/companies/:id` | Company Details |
| `/hr/:hrContactId` | HR Profile |
| `/reminders` | Reminders |
| `/calling-list` | Calling List |
| `/activity` | Activity Feed |
| `/search` | Search |
