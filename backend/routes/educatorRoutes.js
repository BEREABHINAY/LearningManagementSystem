import express from 'express'
import { addCourse, updateRoleToEducator, getEducatorCourses, getEnrolledStudents, educatorDashboardData } from '../controllers/educatorController.js';
import upload from '../config/multer.js';
import { protectEducator } from '../middleware/authmiddleware.js';
import { get } from 'mongoose';
const educatorRouter = express.Router();
educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);
educatorRouter.get('/courses', protectEducator, getEducatorCourses);
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudents);
export default educatorRouter;