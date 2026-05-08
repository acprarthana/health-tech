# HealthTech Prescription Management System

## Project Overview

The HealthTech Prescription Management System is a backend-driven application developed using Node.js, Express.js, and SQLite3 following the MVC (Model-View-Controller) architecture pattern.

The system provides secure authentication and role-based authorization for two different user roles:

- Doctor
- Patient/User

Doctors can create, update, and manage prescriptions for patients, while patients can securely access and view only their assigned prescriptions.

The project demonstrates secure backend development practices, protected API routes, database integration, and proper architectural separation of concerns.

---

# Technologies Used

- Node.js
- Express.js
- SQLite3
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- CORS

---

# Features

## Authentication
- Patient registration
- User login
- JWT token generation
- Password hashing using bcryptjs

---

## Role-Based Authorization
- Doctor-only access for prescription creation and updates
- Patient-only access for viewing personal prescriptions
- Protected routes using middleware

---

## Prescription Management
- Create prescriptions
- Update prescriptions
- View doctor prescriptions
- View patient prescriptions

---

## Security Features
- Password hashing
- JWT authentication
- Role-based access control
- Protected API routes
- Error handling and validation

---

# MVC Architecture

The application follows MVC architecture:

```text
Health-tech/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── prescriptionController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   └── prescriptionRoutes.js
│
├── database/
│   ├── schema.sql
│   └── queries.sql
│
├── screenshots/
│
├── health.db
├── app.js
├── package.json
├── .env
└── README.md
```

---

# Database Design

## users Table

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary Key |
| name | TEXT | User Name |
| email | TEXT | Unique Email |
| password | TEXT | Hashed Password |
| role | TEXT | doctor / patient |
| created_at | DATETIME | Timestamp |

---

## prescriptions Table

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary Key |
| doctor_id | INTEGER | Foreign Key |
| patient_id | INTEGER | Foreign Key |
| diagnosis | TEXT | Diagnosis Details |
| medicines | TEXT | Medicines Prescribed |
| notes | TEXT | Additional Notes |
| created_at | DATETIME | Timestamp |
| updated_at | DATETIME | Timestamp |

---

# Relationships

- One doctor can create multiple prescriptions
- One patient can receive multiple prescriptions
- Each prescription belongs to one doctor and one patient

---

# API Endpoints

## Authentication APIs

### Register Patient

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

# Prescription APIs

## Create Prescription (Doctor Only)

```http
POST /api/prescriptions
```

---

## Update Prescription (Doctor Only)

```http
PUT /api/prescriptions/:id
```

---

## View Doctor Prescriptions

```http
GET /api/prescriptions/doctor
```

---

## View Patient Prescriptions

```http
GET /api/prescriptions/patient
```

---

# Installation & Setup

## Step 1: Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

## Step 2: Open Project

```bash
cd Health-tech
```

---

## Step 3: Install Dependencies

```bash
npm install
```

---

## Step 4: Create Environment Variables

Create `.env` file:

```env
PORT=5000
JWT_SECRET=healthtech_secret_key
```

---

## Step 5: Run SQLite Database

Execute `schema.sql` using:
- DBeaver
- DB Browser for SQLite
- SQLite CLI

---

## Step 6: Start Server

```bash
node app.js
```

OR

```bash
npm run dev
```

---

# Testing APIs

The APIs were tested using:
- Postman

---

# Sample Authentication Header

```http
Authorization: Bearer YOUR_TOKEN
```

---

# Sample Request Body

## Register

```json
{
  "name":"Rahul",
  "email":"rahul@gmail.com",
  "password":"123456"
}
```

---

## Create Prescription

```json
{
  "patient_id":1,
  "diagnosis":"Fever",
  "medicines":"Paracetamol",
  "notes":"Take rest"
}
```

---

# Validation & Error Handling

The application handles:
- Missing fields
- Invalid credentials
- Duplicate users
- Unauthorized access
- Invalid JWT tokens
- Invalid routes

---

# Screenshots Included

The repository contains screenshots for:
- User Registration
- Login
- JWT Token
- Prescription Creation
- Doctor Access
- Patient Access
- Unauthorized Access
- Database Tables

---

# Key Concepts Implemented

- MVC Architecture
- REST API Development
- JWT Authentication
- Role-Based Authorization
- SQLite3 Integration
- Middleware
- CRUD Operations
- Protected Routes
- Relational Database Design

---

# Conclusion

The HealthTech Prescription Management System successfully demonstrates secure backend application development using Node.js, Express.js, and SQLite3. The project implements authentication, authorization, database integration, MVC architecture, and protected APIs while maintaining clean code structure and proper separation of concerns.