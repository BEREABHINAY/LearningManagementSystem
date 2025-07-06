import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import User model
import dotenv from 'dotenv';
dotenv.config();
import {clerkClient} from '@clerk/express';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach user info (except password) to request
      req.user = await User.findById(decoded.id).select('-password');
      next();



    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectEducator = async()=>{
  try{
    const userId = req.user.id;
    const response = await clerkClient.users.getUser(userId);
    if (response.publicMetadata.role !== 'educator') {
      return res.status(403).json({ message: 'Access denied, not an educator' });
    }
    next();
  }catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
export { protect, protectEducator };