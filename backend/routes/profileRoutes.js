// routes/profileRoutes.js
import express from 'express';
const profileRoutes = express.Router();
import User from '../models/User.js'; // Import User model

// Update user profile
profileRoutes.put('/:id', async (req, res) => {
  try {
    const { name, email, username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, username },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Update Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default profileRoutes;
