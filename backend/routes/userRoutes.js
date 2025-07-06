import express from 'express';
import {getUserData, userEnrolledCourses, updateUserCourseProgress, getUserCourseProgress, addUserRating} from '../controllers/userController.js'; //purchaseCourse,

const userRouter = express.Router();
userRouter.get('/data', getUserData);
userRouter.get('/enrolled-courses', userEnrolledCourses);
// userRouter.post('/purchase', purchaseCourse);
userRouter.post('/update-course-progress', updateUserCourseProgress);
userRouter.get('/get-course-progress', getUserCourseProgress);
userRouter.post('/add-rating', addUserRating);

userRouter.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'student'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default userRouter;

