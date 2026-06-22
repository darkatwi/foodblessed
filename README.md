# FoodBlessed

A full-stack web application for charitable food aid and volunteer management, based in Beirut, Lebanon. FoodBlessed connects volunteers, donors, and community members to help combat food insecurity through organized outreach and community fridges.

## Features

- **Volunteer Signup** — Public form for registering volunteers; automatic welcome email sent on signup
- **Contact Form** — Accept public inquiries; admins can reply directly from the dashboard
- **Donate Page** — Donation information and options
- **Community Fridge** — Transparency page for community food fridge locations and details
- **Partners & Team** — Showcase of partner organizations and team members
- **Admin Dashboard** — Password-protected panel to manage volunteers and contact submissions

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router DOM 7, Vite |
| Backend | Node.js, Express 4 |
| Database | MongoDB (Mongoose) |
| Email | Resend API |
| Styling | Custom CSS |

## Project Structure

```
FoodBlessed/
├── frontend/          # React + Vite SPA
│   └── src/
│       ├── pages/     # Page components
│       ├── styles/    # CSS stylesheets
│       └── assets/    # Images and media
├── backend/           # Express REST API
│   ├── routes/        # API route handlers
│   ├── models/        # Mongoose schemas
│   ├── server.js      # App entry point
│   ├── db.js          # MongoDB connection
│   └── mailer.js      # Email templates
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or Atlas)
- A [Resend](https://resend.com) account for email delivery

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   DB_NAME=your_database_name
   PORT=4000
   ADMIN_PASSWORD=your_admin_password
   RESEND_API_KEY=your_resend_api_key
   WHATSAPP_LINK=https://wa.me/your_number
   ```

4. Start the server:
   ```bash
   # Development (auto-restart)
   npm run dev

   # Production
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

### Build for Production

```bash
cd frontend
npm run build
```

The output will be in `frontend/dist/`.

## API Endpoints

| Method | Path | Description | Auth |
|---|---|---|---|
| POST | `/api/volunteers` | Register a new volunteer | No |
| GET | `/api/admin/volunteers` | List all volunteers | Yes |
| POST | `/api/contact` | Submit a contact message | No |
| GET | `/api/admin/contacts` | List all contact submissions | Yes |
| POST | `/api/admin/reply/:id` | Reply to a contact message | Yes |
| POST | `/api/admin/login` | Admin login | No |

Protected routes require a `Authorization: Bearer <ADMIN_PASSWORD>` header.

## Environment Variables

### Backend

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | Yes | MongoDB connection string |
| `DB_NAME` | Yes | Database name |
| `PORT` | No | Server port (default: `4000`) |
| `ADMIN_PASSWORD` | Yes | Admin dashboard password |
| `RESEND_API_KEY` | Yes | Resend API key for email delivery |
| `WHATSAPP_LINK` | No | WhatsApp community invite link |

### Frontend

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | Base URL of the backend API |
