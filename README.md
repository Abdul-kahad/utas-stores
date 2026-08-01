# UTAS Stores

**A centralized, offline-capable inventory and stores management system for university/campus store operations.**

🔗 **Live App:** [utas-stores.vercel.app](https://utas-stores.vercel.app/)

---

## Why UTAS Stores Exists

Campus central stores traditionally rely on manual logbooks and spreadsheets to track inventory, receipts, and department requests — a process that's slow, error-prone, and offers no visibility into stock movement or accountability.

**UTAS Stores** replaces that with a role-based digital system that lets store managers and procurement officers manage inventory, receive stock, approve department requests, and track every action — automatically, in real time, whether the campus has internet access or not.

---

## Key Features

- **Role-Based Access Control** — Admin, Store Manager, Procurement, and Department User roles, each with a tailored dashboard and permission set
- **Inventory Management** — full CRUD on store items with live stock levels
- **Automatic Stock Updates** — receiving a supplier receipt increases inventory automatically; no manual quantity editing
- **Request & Approval Workflow** — department users submit requests → managers approve/reject → fulfillment updates stock
- **Direct Issue & Issuing System** — fast-path stock dispatch outside the formal request flow
- **Supplier Management** — supplier directory and onboarding
- **Audit Logging** — every sensitive action (logins, user changes, approvals) is permanently logged and viewable by admins
- **System Logging** — separate, self-cleaning (capped) logs for backend errors/warnings, isolated from business audit trails
- **Reporting & Analytics** — charts (Chart.js), PDF export (PDFKit), and Excel import/export (SheetJS)
- **Offline / Intranet Mode** — runs entirely on a local network with no internet dependency, for environments with unreliable connectivity
- **Desktop App** — packaged as a native Windows installer via Electron
- **Progressive Web App** — installable, offline-capable web client via service workers

---

## Architecture

UTAS Stores is a MERN application designed to run in **three deployment modes** from the same codebase: cloud, LAN intranet, and Electron desktop.

```
                         ┌─────────────────────────┐
                         │        Clients          │
                         │  Browser / PWA / Electron │
                         └────────────┬─────────────┘
                                      │ HTTPS / HTTP (LAN)
                                      ▼
                         ┌─────────────────────────┐
                         │     React Frontend       │
                         │  Vite + Tailwind + Axios │
                         │  (HashRouter for local   │
                         │   file protocol support) │
                         └────────────┬─────────────┘
                                      │ REST API (JWT + Cookie)
                                      ▼
                         ┌─────────────────────────┐
                         │   Express.js Backend     │
                         │  Auth · RBAC · Business  │
                         │  Logic · Audit Logging   │
                         └────────────┬─────────────┘
                                      │ Mongoose ODM
                                      ▼
                         ┌─────────────────────────┐
                         │        MongoDB           │
                         │  Atlas (cloud) OR local   │
                         │  Community Server (LAN)   │
                         └─────────────────────────┘
```

### Authentication Flow

```
Login ──▶ Access Token (JWT, short-lived, in memory/localStorage)
       └▶ Refresh Token (JWT, HttpOnly cookie, long-lived)

Access token expires ──▶ 401 ──▶ Axios interceptor
                                     │
                                     ▼
                        POST /api/auth/refresh (cookie sent automatically)
                                     │
                                     ▼
                     New access token ──▶ original request retried
```

Cookie security (`secure`, `sameSite`) adapts automatically based on `NODE_ENV`, so the same code works over plain HTTP on a local intranet and over HTTPS in production — no manual toggling required.

### Business Logic Flow

```
Supplier Receipt Recorded
        ↓
Inventory Quantity Increases (automatic)
        ↓
Department Request Submitted
        ↓
Manager Approval
        ↓
Fulfillment / Issuing
        ↓
Inventory Quantity Decreases (automatic)
        ↓
Audit Log Entry Created
```

---

## Tech Stack

### Frontend
| Category | Technology |
|---|---|
| Core | React 19 (JavaScript, ES Modules) |
| Build tool | Vite |
| Routing | React Router (`HashRouter`) |
| Styling | Tailwind CSS |
| HTTP client | Axios (custom interceptors for token refresh + dynamic server IP) |
| Charts | Chart.js  |
| Excel | SheetJS (`xlsx`) |
| Offline / PWA | vite-plugin-pwa, Workbox, Service Workers |

### Backend
| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| API style | REST |
| Auth | JWT (access + refresh), bcrypt, HttpOnly cookies |
| Logging | Winston + winston-mongodb (capped system logs) + custom audit logger |
| PDF generation | PDFKit |
| File uploads | Multer |
| CORS | `cors` |

### Database
| Category | Technology |
|---|---|
| Engine | MongoDB (Atlas for cloud, Community Server for local/offline) |
| ODM | Mongoose |

### Desktop
| Category | Technology |
|---|---|
| Runtime | Electron |
| Packaging | electron-builder → Windows `.exe` (NSIS) |
| Dev tooling | concurrently, wait-on |

### Deployment & Infrastructure
| Layer | Platform |
|---|---|
| Frontend hosting | Vercel / Netlify |
| Backend hosting | Render |
| Offline networking | LAN / Intranet (Wi-Fi or Ethernet) |
| Version control | Git & GitHub |

---

## Getting Started

### Prerequisites
- Node.js (LTS)
- npm
- MongoDB (Atlas account, or MongoDB Community Server installed locally)

### 1. Clone the repository
```bash
git clone https://github.com/Abdul-kahad/utas-stores.git
cd utas-stores
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```env
PORT=5000
HOST=0.0.0.0
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_TOKEN_SECRET=your_access_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Run the backend:
```bash
node server.js
# or
npm run server
```

### 3. Frontend setup
```bash
cd client
npm install
```

Create a `.env` file in `/client`:
```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

### 4. Desktop (Electron) build
```bash
npm run electron:dev     # development
npm run electron:build   # produces Windows .exe installer
```

### 5. Running on a Local Intranet
1. Find your host machine's LAN IP (`ipconfig` / `ifconfig`)
2. Set `VITE_API_URL` to `http://10.251.8.74:5000/api`
3. Bind the backend to `0.0.0.0` (already the default)
4. Allow ports 5000 and 5173 through your firewall
5. Access from any device on the same network at `http://10.251.8.74:5173`

---

## User Roles & Permissions

| Role | Capabilities |
|---|---|
| **Admin** | Full system access, user management, audit logs, all reports |
| **Store Manager** | Inventory, requests & approvals, issuing, reports |
| **Procurement** | Add items, manage receipts, view inventory, manage suppliers |
| **Department User** | Submit item requests, track own requests |

---

## Roadmap

- [ ] Barcode / QR-code scanning for stock intake and issuing
- [ ] Low-stock threshold alerts and notifications
- [ ] Multi-warehouse / multi-branch support
- [ ] Refresh token rotation with request queuing (race-condition hardening)
- [ ] Automated test suite (unit + integration)
- [ ] Role-based analytics dashboards
- [ ] Mobile-first companion app

---

## Engineering Challenges Solved

Building UTAS Stores across three deployment targets (cloud, LAN, desktop) surfaced real-world engineering problems beyond typical coursework:

- Route/middleware ordering bugs causing silent 404s
- CORS and cookie `sameSite`/`secure` behavior differing between HTTP (LAN) and HTTPS (production)
- Environment-dependent auth configuration (`NODE_ENV`-driven cookie policy)
- Preventing parallel token-refresh race conditions in the Axios interceptor layer
- MongoDB connection pool conflicts between Mongoose and Winston's logging transport
- `HashRouter` vs `BrowserRouter` for Electron's `file://` protocol
- Static vs dynamic IP handling for LAN deployment
- Packaging and distributing a signed Windows installer via Electron

---

## License

This project was developed as a personal project. License terms to be added.

---

## Author

Built and maintained by Buhari Abdul Kahad. Contributions and feedback welcome.
