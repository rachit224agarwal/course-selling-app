# Course Selling App — Backend

A simple and secure backend for a course selling platform, built with Node.js, Express, MongoDB, JWT authentication, and input validation using Zod.

---

##  Features

- **User Authentication**  
  - Email/password sign-up with password hashing (bcrypt)  
  - Sign-in with secure JWT stored in HTTP-only cookies  
  - Role-based routes: separate access for users and admins

- **Course Management**  
  - Admins can create, update, and list their own courses  
  - Users can purchase courses and view their purchases

- **Security & Robustness**  
  - Input validation using **Zod**  
  - Rate limiting to protect against abuse (`express-rate-limit`)  
  - Cookie-based sessions with safe defaults (`httpOnly`, `sameSite`, `secure`)

---

##  Project Structure

├── index.js # App entry point <br/>
├── config.js # Secrets and config (JWT secrets)<br/>
├── db.js # Mongoose schemas & models <br/>
├── middleware/ <br/>
│ ├── rateLimiter.js # Rate limiting middleware <br/>
│ └── user.js / admin.js # Auth middlewares <br/>
├── routes/ <br/>
│ ├── user.js # User signup, signin, purchases <br/>
│ ├── admin.js # Admin signup/signin, course routes <br/>
│ └── course.js # Course listing & purchase endpoint <br/>
├── .env.example # Example environment variables <br/>
├── package.json <br/>
└── .gitignorec<br/>

---<br/>

## Setup & Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/rachit224agarwal/course-selling-app.git
   cd course-selling-app
2. **Install Dependencies**
   ```bash
   npm install
3. **Configure environment variables
Copy .env.example to .env and update values:**
   ```bash
   PORT=3000
   DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/course-app
   JWT_USER_SECRET=yourUserSecret
   JWT_ADMIN_SECRET=yourAdminSecret

4. **Configure environment variables
Copy .env.example to .env and update values:**
   ```bash
   npm start
The backend will be available at http://localhost:3000.
