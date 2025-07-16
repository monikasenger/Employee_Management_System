# 👨‍💼 EmployeeEase – Full Stack Employee Management System

**EmployeeEase** is a modern Full Stack Employee Management System designed to simplify and streamline employee data management for any organization. Built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**, it offers a clean user interface, responsive design, secure authentication, and powerful data visualizations.

---

## 🌍 Live Demo

👉 **Live URL:**  
[🔗 EmployeeEase](https://employee-management-system-fox0.onrender.com)

---

## 🚀 Features

### ✅ **Frontend (React.js)**
- Responsive UI with Tailwind CSS
- Dashboard with dynamic charts (Bar, Pie)
- List, Add, Edit, Delete employees
- Global state management using Context API
- API integration using Axios
- Route management with React Router

### 🔐 **Backend (Node.js + Express.js + MongoDB)**
- RESTful APIs for employee management
- User registration and login with JWT authentication
- Password reset functionality (JWT token-based)
- Secure password storage using bcrypt
- MongoDB + Mongoose for data modeling
- Centralized error handling

---

## 🛠️ Tech Stack

| Technology   | Description                      |
|--------------|----------------------------------|
| **Frontend** | React.js, Tailwind CSS, Axios, Recharts |
| **Backend**  | Node.js, Express.js, JWT, bcrypt |
| **Database** | MongoDB with Mongoose            |
| **Deployment** | Render (Frontend & Backend)   |



----

## 💻 Installation Guide

### ✅ Prerequisites

- **Node.js installed**  
- **MongoDB URI** (Cloud or Local)

---

### 📦 Clone the Repository
```bash

git clone https://github.com/MonikaSenger/Employee_Management_System.git
cd Employee_Management_System
```

```bash
git clone https://github.com/MonikaSenger/Employee_Management_System.git
cd Employee_Management_System
```
---
### 🔧 Setup Backend:

```bash
cd backend
npm install

🛠️ Create a .env file in /backend:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

▶️ Run the backend:
npm run server
```
---
### 💻 Setup Frontend:
```bash
cd frontend
npm install

🛠️ Create a .env file in /frontend:
VITE_BACKEND_URL=http://localhost:5000

▶️ Run the frontend:
npm run dev
```
---

## 📁 Folder Structure + 💻 Installation Guide

```bash
Employee_Management_System/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── index.html

