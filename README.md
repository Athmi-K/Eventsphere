# EventSphere

EventSphere is a centralized campus event registration system. It features a clean, minimal, and modern React interface with a robust Express & PostgreSQL backend.

## Architecture

- **Frontend**: React (Vite), React Router DOM, Axios, Lucide React (Icons), date-fns. Designed with modern vanilla CSS for maximum control and performance.
- **Backend**: Node.js, Express, PostgreSQL, JWT Authentication, bcrypt, CORS, Helmet.

## Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (Ensure it is running locally or provide a cloud connection string)

## Setup Instructions

### 1. Database Setup
1. Create a PostgreSQL database named `eventsphere` (or configure your preferred name).
2. Configure your database credentials in the backend environment file.

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Open or create `.env` in the `backend` directory and ensure variables are correct (especially DB credentials):
   ```env
   PORT=5000
   NODE_ENV=development
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=eventsphere
   JWT_SECRET=supersecretjwtkey_change_in_production
   ```
4. Initialize the Database tables:
   ```bash
   npm run init-db
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on the port provided by Vite (usually `http://localhost:5173`).

## API Endpoints

### Public Routes
- `GET /api/events` - Fetch all upcoming events (ordered by date)
- `GET /api/events/:id` - Fetch details for a specific event
- `POST /api/events/:id/register` - Form submission { name, email }

### Admin Routes (Protected - requires Bearer token)
- `POST /api/admin/login` - Authenticate admin (`admin` / `admin123`)
- `POST /api/admin/events` - Create a new event
- `PUT /api/admin/events/:id` - Edit an existing event
- `GET /api/admin/events/:id/registrations` - Vew list of registered users for an event

## Design Philosophy

The application interface is intentionally designed with minimal aesthetics:
- Soft shadows to lift interactive elements (`--shadow-sm` through `--shadow-soft`)
- Professional typography using Google's Inter font
- Neutral color palette (white, slate gray backgrounds and primary text) with subtle blue (`#2563eb`) accents.
- Responsive, mobile-first layouts using CSS grid and flexbox.

## Container / Production Readiness

To deploy this application:
1. Ensure both `.env` configurations are set appropriately for production (e.g., `NODE_ENV=production`, safe JWT secrets, deployed database credentials).
2. The frontend can be built using `npm run build` in the `frontend` folder. The resulting `dist` folder can be served natively, via Nginx, or deployed easily to platforms like Vercel or Netlify.
3. The backend uses `helmet` for security headers, centralized error handling, and parameterized queries (pg) to mitigate SQL injection.

**Built for the campus. Scaled for the future.**
