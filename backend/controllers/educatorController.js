import { clerkClient } from '@clerk/express'
import { parse } from 'dotenv';
import Course from '../models/Course.js';
// import Purchase from '../models/Purchase.js';
import User from '../models/User.js';
// import cloudinary from '../config/cloudinary.js';

export const updateRoleToEducator = async () => {
    try {
        const userId = requestAnimationFrame.auth.userId
        await clerkClient.users.updateUserMetadata(userId, { publicMetadata: { role: 'educator' } });
        res.json({ success: true, message: 'You can publish courses now.' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body;
        const imageFile = req.file;
        const educatorId = req.auth.userId;

        // Validate input
        if (!imageFile) {
            return res.json({ success: false, message: 'All fields are required' });
        }
        const parsedCourseData = JSON.parse(courseData);
        parsedCourseData.educator = educatorId;
        const newCourse = await Course.create(parsedCourseData);
        // const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        // newCourse.thumbnail = imageUpload.secure_url;
        await newCourse.save();
        res.json({ success: true, message: 'Course added' });

    } catch (error) {
        console.error('Error adding course:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getEducatorCourses = async (req, res) => {
    try {
        const educatorId = req.auth.userId;
        const courses = await Course.find({ educator: educatorId });
        res.json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const educatorDashboardData = async (req, res) => {
    try {
        const educatorId = req.auth.userId;
        const courses = await Course.find({ educator: educatorId });
        const totalCourses = courses.length;
        const courseIds = courses.map(course => course._id);
        const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' });
        const totalEarnings = purchases.reduce((acc, purchase) => acc + purchase.amount, 0);
        const enrolledStdentsData = [];
        for (const course of courses) {
            const students = await User.find({ _id: { $in: course.enrolledStudents } }, 'name imageUrl');
            students.forEach(student => {
                enrolledStdentsData.push({
                    courseTitle: course.title, student
                });
            });
        }
        res.json({ success: true, dashboardData: { totalCourses, totalEarnings, enrolledStdentsData } });
    } catch (error) {
        console.error('Error fetching educator data:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getEnrolledStudents = async (req, res) => {
    try{
        const educatorId = req.auth.userId;
        const courses = await Course.find({ educator: educatorId });
        const courseIds = courses.map(course => course._id);
        const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' }).populate('userId', 'name imageUrl').populate('courseId', 'title');

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.title,
            purchaseDate: purchase.createdAt
        }));

        res.json({ success: true, enrolledStudents });
    }catch (error) {
        console.error('Error fetching enrolled students:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};