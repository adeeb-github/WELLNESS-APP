# 🌿 WELLNESS-APP

A full-stack wellness application built with **React (frontend)** and **Node.js, Express, MongoDB (backend)**.  
Users can explore wellness sessions, upload session data, and manage content in real-time.

---

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js, MongoDB
- **Storage**: Supabase (for JSON session files)
- **Authentication**: JWT-based login/signup

---

## 📦 Project Structure
<pre><code> ``` WELLNESS-APP/ ├── backend/ # Node.js backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── config/ │ └── server.js ├── frontend/ # React frontend │ ├── src/ │ └── package.json └── README.md ``` </code></pre>
---

## 🛠️ Setup Instructions

### 1. Clone the Repo


git clone https://github.com/adeeb-github/WELLNESS-APP.git
cd WELLNESS-APP

### 2.Backend Setup
cd backend

npm install

npm run dev

### 3. Frontend Setup
cd ../frontend

npm install

npm start

## API documentation

🛠️ API Routes
### 🔐 Auth Routes

| Method | Endpoint        | Description     |
|--------|------------------|-----------------|
| POST   | `/auth/signup`   | Register user   |
| POST   | `/auth/login`    | Login user      |

### 📅 Session Routes

| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| POST   | `/session/createsession`   | Create a new session     |
| GET    | `/session/sessions`        | Get all published sessions |
| GET    | `/session/my-sessions`     | Get user's own sessions  |
| DELETE | `/session/delete/:id`      | Delete session by ID     |
| PUT    | `/session/publish/:id`     | Publish session by ID    |



