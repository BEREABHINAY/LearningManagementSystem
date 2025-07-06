# Learnity - Learning Management System

A full-stack Learning Management System built with React (Frontend) and Node.js/Express (Backend).

## 🚀 Quick Start

### Local Development
```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev
```

### Production Build
```bash
# Build and start production server
npm start
```

## 📁 Project Structure

```
LMS/
├── backend/          # Node.js/Express backend
│   └── backend/
│       ├── config/   # Database and middleware configuration
│       ├── controllers/ # Route controllers
│       ├── middleware/  # Authentication middleware
│       ├── models/      # MongoDB models
│       ├── routes/      # API routes
│       └── server.js    # Main server file
├── Frontend/         # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── instructor/ # Instructor-specific components
│   │   └── utils/      # Utility functions (API configuration)
│   └── vite.config.js  # Vite configuration
├── package.json       # Root package.json for combined deployment
└── railway.json       # Railway deployment configuration
```

## 🌐 Deployment

### Option 1: Railway (Recommended)

1. **Push your code to GitHub**
2. **Go to [Railway](https://railway.app/)**
3. **Connect your GitHub repository**
4. **Set environment variables:**
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
5. **Deploy!**

### Option 2: Render

1. **Push your code to GitHub**
2. **Go to [Render](https://render.com/)**
3. **Create a new Web Service**
4. **Connect your repository**
5. **Set build command:** `npm run build`
6. **Set start command:** `npm start`
7. **Add environment variables**
8. **Deploy!**

### Option 3: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```
3. **Set environment variables:**
   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   ```
4. **Deploy:**
   ```bash
   git push heroku main
   ```

## 🔧 Environment Variables

### Backend
Create `.env` in `backend/backend/`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend (Optional)
Create `.env.local` in `Frontend/`:
```env
VITE_API_URL=/api
```

## 📱 Features

- **User Authentication** (Login/Register)
- **Course Management** (Create, View, Enroll)
- **Role-based Access** (Student/Instructor)
- **Progress Tracking**
- **Assignment Submission**
- **Grades Management**

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT
- **Styling:** CSS3

## 📝 API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/users/register` - User registration
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/profile` - Get user profile

## 🚀 Scripts

- `npm run install-all` - Install all dependencies
- `npm run dev` - Start development servers
- `npm run build` - Build frontend for production
- `npm start` - Start production server
- `npm run backend` - Start only backend
- `npm run frontend` - Start only frontend

## 📄 License

This project is licensed under the MIT License. 