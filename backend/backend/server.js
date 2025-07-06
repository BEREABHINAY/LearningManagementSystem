import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route imports
import { router as userRoutes, userRouter } from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { route as courseRoutes, courseRouter } from './routes/courseRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import educatorRouter from './routes/educatorRoutes.js';

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/educator', educatorRouter);
app.use('/api/courses/register', courseRouter);
app.use('/api/enrollments', userRouter);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API Working!' });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Frontend/dist/index.html'));
});

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