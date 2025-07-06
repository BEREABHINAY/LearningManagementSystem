import express from 'express';
import {getAllCourses, getCourseById} from '../controllers/courseController.js';
const courseRouter = express.Router();
courseRouter.get('/all', getAllCourses);
courseRouter.get('/:id', getCourseById);

// routes/courseRoutes.js
const router = express.Router();
import CourseRegistration from '../models/CourseRegistration.js';

// Predefined course resources
const courseResources = {
  react: {
    video: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    file: 'https://example.com/files/react-course.pdf'
  },
  javascript: {
    video: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
    file: 'https://example.com/files/js-advanced.pdf'
  },
  uiux: {
    video: 'https://www.youtube.com/watch?v=Ovj4hFxko7c',
    file: 'https://example.com/files/uiux-basics.pdf'
  },
  node: {
    video: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
    file: 'https://example.com/files/node-course.pdf'
  }
};

// @route   POST /api/courses/register
// @desc    Register a user for a course
router.post('/register', async (req, res) => {
  const { name, email, phone, courseId } = req.body;

  if (!name || !email || !phone || !courseId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Save registration to DB
    const registration = new CourseRegistration({ name, email, phone, courseId });
    await registration.save();

    // Send video + file links as response
    const resources = courseResources[courseId];

    if (!resources) {
      return res.status(404).json({ message: 'Course resources not found' });
    }

    res.status(200).json({
      message: 'Registration successful!',
      courseId,
      videoLink: resources.video,
      fileLink: resources.file
    });

  } catch (err) {
    console.error('Course registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
  
});
export {router, courseRouter};
