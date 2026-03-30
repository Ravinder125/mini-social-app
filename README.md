# Mini Social Post Application

A full stack social media post application where users can signup,
login, create posts, like posts and comment on posts.

Frontend: https://mini-social-app-blue.vercel.app/  
Backend API: (https://mini-social-app-8pac.onrender.com)

## Tech Stack

### Frontend:

-   React (Vite)
-   Axios
-   React Router

### Backend:

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT Authentication
-   bcrypt password hashing

## Features

### Authentication:

-   User signup
-   User login
-   JWT authentication
-   Protected routes

### Posts:

-   Create text post
-   Create image post
-   Public feed
-   Author information

### Social Features:

-   Like / Unlike posts
-   Comment on posts
-   Like count
-   Comment count

### UI:

-   Clean card layout
-   Navbar with logout
-   Responsive centered layout

## Project Structure

mini-social-app

backend\
├── src\
│ ├── controllers\
│ ├── models\
│ ├── routes\
│ ├── middleware\
│ ├── utils

frontend\
├── src\
│ ├── components\
│ ├── pages\
│ ├── context\
│ ├── api

## API Routes

### Auth:

-   POST /api/auth/signup
-   POST /api/auth/login

### Posts:

-   GET /api/posts
-   POST /api/posts
-   PUT /api/posts/:id/like
-   POST /api/posts/:id/comment

## Environment Variables

Create .env in backend:

PORT=5000\
MONGO_URI=your_mongodb_connection\
JWT_SECRET=your_secret

## Run Locally

### Backend:

cd backend\
npm install\
npm run dev

### Frontend:

cd frontend\
npm install\
npm run dev

## Author

Ravinder Kumar\
Full Stack Developer (Trainee)
