# PERNStack Todo App

A full-stack **Todo Application** built using the **PERN stack (PostgreSQL, Express, React, Node.js)** with authentication and a clean UI.

---

## Features

- User Registration & Login
- JWT Authentication
- Password hashing using bcrypt
- Protected Todo page
- Personalized greeting
- Add and view todos
- Logout functionality
- Clean UI using Tailwind CSS

---

## Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- bcrypt
- JSON Web Token (JWT)

---

## Backend Setup

### Install dependencies
npm install

## DotEnv
PORT=5001
DATABASE_URL=postgresql://username:password@localhost:5432/todoapp
JWT_SECRET=your_jwt_secret

##Start backend server
npm run dev

##Backend runs on:
http://localhost:5001

## Frontend Setup
###Install dependencies
npm install

###Start frontend
npm run dev

##Frontend runs on:
http://localhost:5173

##API Endpoints
###Authentication
Method	 Endpoint	                Description
POST	 /api/auth/register	   Register user
POST	 /api/auth/login	      Login user
##Todos (Protected)
Method	Endpoint	   Description
GET	      /api/todos	Get user todos
POST	/api/todos	   Create new todo
##Protected Routes Header
token: <JWT_TOKEN>

##🔄 Authentication Flow
1.User registers
2.User logs in
3.Backend returns JWT token
4.Token is stored in localStorage
5.Username is decoded from JWT
6.Todo page displays:  Welcome {username}
7.Logout clears authentication data
```
