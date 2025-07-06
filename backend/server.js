import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// import clerkMiddleware from '@clerk/express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(clerkMiddleware());

// Route imports
import userRouter from './routes/userRoutes.js'; // Registration
import authRoutes from './routes/authRoutes.js'; // Login
import { router as courseRoutes, courseRouter } from './routes/courseRoutes.js'; // Courses
import profileRoutes from './routes/profileRoutes.js'; // Profile
import educatorRouter from './routes/educatorRoutes.js'; // Educator role update
// import clerkWebhooks from './routes/clerkWebhooks.js'; // Clerk webhooks

// Route usage
app.get('/', (req, res) => res.send('API Working!'));
app.use('/api/users', userRouter);        // POST /api/users/register
app.use('/api/auth', authRoutes);         // POST /api/auth/login
app.use('/api/courses', courseRoutes);    // Course-related routes
app.use('/api/profile', profileRoutes);   // Profile routes
app.use('/api/educator', educatorRouter); // Educator role update
app.use('/api/courses/register', courseRouter); // Course registration
// app.use('/clerk', clerkWebhooks); // Clerk webhooks for user updates
app.use('/api/enrollments', userRouter); // User data and enrolled courses

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


