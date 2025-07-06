import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const  authRoutes = express.Router();
import User from '../models/User.js'; // Import User model
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For JWT token generation

// Replace with your secret key or use process.env.JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

 authRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password' });

    // ✅ Generate real JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' } // token valid for 1 day
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default authRoutes;




