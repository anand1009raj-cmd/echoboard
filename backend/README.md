# ✦ EchoBoard — Academic Feedback Platform

> A full-stack web application for collecting, analyzing, and reporting feedback from academic events and workshops.

![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen)
![Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20bcrypt-orange)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20CSS%20JS-yellow)

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)

---

## 📖 About the Project

EchoBoard solves a common problem in academic institutions — feedback from workshops, seminars, and events is often collected informally through verbal comments or simple forms, with no structured way to analyze or act on it.

EchoBoard provides:
- A clean form for participants to submit structured feedback
- An admin dashboard with real-time analytics
- Automated suggestion extraction from comments
- A report generator for organizers

---

## ✨ Features

### 👤 Participant
- Register and login securely
- Submit feedback with star rating, comments, and topic tags
- View personal feedback history across all events

### 🔐 Admin (Organizer)
- Protected dashboard with aggregated analytics
- Rating distribution charts
- Automated keyword-based suggestion extraction
- Tag frequency analysis
- AI-style summary of all responses
- Filter and search all submissions
- Delete feedback entries
- Generate downloadable feedback reports by event and date range

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Authentication | JWT (jsonwebtoken) + bcryptjs |
| Hosting (DB) | MongoDB Atlas Free Tier |

---

## 📁 Project Structure

```
echoboard/
│
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema (name, email, password, role)
│   │   └── Feedback.js      # Feedback schema (event, rating, comments, tags)
│   │
│   ├── routes/
│   │   ├── auth.js          # Register, Login, Me routes
│   │   └── feedback.js      # CRUD routes for feedback
│   │
│   ├── middleware/
│   │   └── auth.js          # protect + adminOnly middleware
│   │
│   ├── server.js            # Express app entry point
│   ├── .env                 # Environment variables (not committed)
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    └── index.html           # Complete Single Page Application
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org) (v16 or above)
- [npm](https://npmjs.com)
- [MongoDB Atlas](https://cloud.mongodb.com) account (free)

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/anand1009raj/echoboard.git
cd echoboard
```

**2. Install backend dependencies**
```bash
cd backend
npm install
```

**3. Setup environment variables**

Create a `.env` file inside the `backend` folder:
```env
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/echoboard
PORT=3001
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_admin_password
```

**4. Start the backend server**
```bash
node server.js
```

You should see:
```
✅ MongoDB Connected!
🚀 Server running on http://localhost:3001
```

**5. Open the frontend**

Simply open `frontend/index.html` in your browser.

> No build step required — pure HTML/CSS/JS.

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `PORT` | Backend server port | `3001` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `mySecretKey123` |
| `ADMIN_EMAIL` | Admin login email | `admin@college.edu` |
| `ADMIN_PASSWORD` | Admin login password | `Admin@123` |

> ⚠️ Never commit your `.env` file to GitHub. It is listed in `.gitignore`.

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new participant |
| POST | `/api/auth/login` | Public | Login (admin + participant) |
| GET | `/api/auth/me` | Protected | Get current user info |

### Feedback Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/feedback` | Admin only | Get all feedback |
| GET | `/api/feedback/mine` | Participant | Get own feedback |
| POST | `/api/feedback` | Protected | Submit new feedback |
| GET | `/api/feedback/:id` | Admin only | Get single feedback |
| DELETE | `/api/feedback/:id` | Admin only | Delete feedback |

---

## 👥 User Roles

### Participant
- Can register and login
- Can submit feedback for events
- Can only view their own submissions

### Admin
- Pre-configured via `.env` file (no registration needed)
- Can view all feedback from all users
- Can access analytics dashboard
- Can generate and export reports
- Can delete any feedback entry

---

## 🔒 Security Features

- **Password Hashing** — bcrypt with 10 salt rounds
- **JWT Authentication** — Stateless, token-based auth (7 day expiry)
- **Role-based Access Control** — Middleware-protected admin routes
- **Environment Variables** — Sensitive data never hardcoded
- **Admin Isolation** — Admin credentials stored in env, not database

---

## 📊 How Report Generation Works

1. Admin selects an event and date range
2. Selects sections to include (Summary, Ratings, Suggestions, Tags, Comments)
3. System fetches filtered data from MongoDB
4. Generates a structured plain-text report
5. Admin can copy it with one click for use in Word/PDF/Email

---

## 🔮 Future Improvements

- [ ] PDF export for reports (pdfkit)
- [ ] Real AI summary using Claude / OpenAI API
- [ ] Email report delivery (nodemailer)
- [ ] Interactive charts (Chart.js)
- [ ] Rate limiting (express-rate-limit)
- [ ] Input validation (express-validator)
- [ ] Refresh token implementation
- [ ] Admin panel to add/manage events
- [ ] Deployment on Railway + Netlify

---

## 📦 Dependencies

```json
{
  "express": "^4.x",
  "mongoose": "^7.x",
  "jsonwebtoken": "^9.x",
  "bcryptjs": "^2.x",
  "cors": "^2.x",
  "dotenv": "^16.x"
}
```

---

## 🧑‍💻 Author

**ANAND RAJ**
- GitHub: [@anand1009raj](https://github.com/anand1009raj)
- Email: anand1009raj@gmail.com

---

## 📄 License

This project is for academic purposes.

---

> Built with ❤️ for academic event organizers who deserve better feedback tools.