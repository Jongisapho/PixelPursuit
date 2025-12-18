# PixelPursuit 🚀

A modern, full-stack Job Board Application built with **TypeScript**, **Express.js**, **Prisma ORM**, and **PostgreSQL**.

This platform allows User registration with roles such as **Job Seekers** or **Employers** .
Users can post jobs, apply to jobs, and ,manage applications - all secured with **JWT** authentication and role-based access control .

## Features
- User authentication (Register / Login / Logout)
- Role-based access: `JOBSEEKER`, `EMPLOYER`, `ADMIN` (extensible)
- Employers can post and manage jobs
- Job seekers can view and apply to jobs
- Secure password hashing with bcrypt
- JWT-based authentication (7-day expiry)
- Protected routes with middleware
- RESTful API design
- Prisma ORM with PostgreSQL

## Tech Stack

### Backend
- **Node.js** + **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **bcrypt** – Password hashing
- **jsonwebtoken** – JWT auth

### Tools
- CORS enabled
- dotenv for environment variables

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (local or cloud)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/pixelpursuit-backend.git 
cd pixelpursuit-backend
```

2. Install dependencies
```bash
npm install
```

```bash
3. Set up environment variables
cp .env (private for now)
```

```bash
4. Run Prisma migrations
npx prisma migrate dev --name init
This will create the tables: User, Job, Application
```

```bash
5. Start Server
npm run dev # or npm start
```