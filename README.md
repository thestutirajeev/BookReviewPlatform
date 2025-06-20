
# 📚 Book Review Platform

A full-stack web application where users can browse, search, and review books. It supports user authentication, book ratings, and an admin dashboard to manage books.

🌐 **Live Demo**: [Book Review Platform](https://book-review-platform-plum.vercel.app/)
![image](https://github.com/user-attachments/assets/2a2e7add-a6aa-4f45-882a-e26a6391236c)

---

## 📌 Table of Contents
1. Objective
2. Tech Stack  
3. Features
4. Installation & Setup
5. Database Models
6. Error Handling

---

## 🎯 Objective

Build a responsive book review platform where:
- Users can explore and rate books
- Authenticated users can leave reviews
- Admins can add the books

---

## 🛠 Tech Stack

### 🔹 Frontend
- React
- React Router DOM
- Redux
- Axios
- TailwindCSS

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)

---

## ✨ Features

### 👤 User Features
- View featured/highly rated books
- Browse all books
- Search by title or author
- Filter by genre/category
- View book details and reviews
- Submit a review with star rating
- Manage personal profile

### 🛠 Admin Features
- Add new books to the catalog

---

## ⚙️ Installation & Setup

### 🔧 Backend

```bash
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken express-validator nodemon
npm run start
````

---

### 💻 Frontend

```bash
cd frontend
npm create vite@latest ./
# Choose: React + JavaScript

npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install framer-motion react-icons
npm run dev
```

---

## 🗃 Database Models

### 📘 Book

| Field         | Type   | Required | Description                    |
| ------------- | ------ | -------- | ------------------------------ |
| title         | String | Yes      | Book title                     |
| author        | String | Yes      | Author name                    |
| description   | String | Yes      | Book summary                   |
| genre         | String | Yes      | Category (e.g., Fiction)       |
| coverImage    | String | No       | Image URL                      |
| averageRating | Number | No       | Avg. rating (default: 0)       |
| totalReviews  | Number | No       | Review count (default: 0)      |
| timestamps    | Date   | Auto     | Created and updated timestamps |

---

### 📝 Review

| Field      | Type     | Required | Description                    |
| ---------- | -------- | -------- | ------------------------------ |
| user       | ObjectId | Yes      | References a User              |
| book       | ObjectId | Yes      | References a Book              |
| rating     | Number   | Yes      | Rating (1 to 5)                |
| comment    | String   | Yes      | Review text                    |
| timestamps | Date     | Auto     | Created and updated timestamps |

---

### 👤 User

| Field      | Type    | Required | Description                    |
| ---------- | ------- | -------- | ------------------------------ |
| name       | String  | Yes      | User's full name               |
| email      | String  | Yes      | Unique email address           |
| password   | String  | Yes      | Hashed password                |
| isAdmin    | Boolean | No       | Admin flag (default: false)    |
| timestamps | Date    | Auto     | Created and updated timestamps |

---

## ❗ Error Handling

* All API endpoints return appropriate HTTP status codes.
* Standard response format:

```json
{
  "success": false,
  "message": "Error description"
}
```

* The frontend uses `useState` to manage loading and error messages with appropriate UI feedback.

---

## 🧪 License

This project is open for learning and portfolio use. Please credit if used as a template or starting point.
