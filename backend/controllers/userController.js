import User from "../models/User.js";
import Course from "../models/Course.js";
// import Purchase from "../models/Purchase.js";
import { config } from "dotenv";
import CourseProgress from "../models/CourseProgress.js";
config();

export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId; // Assuming you're using Clerk's auth middleware
        const user = await User.findById(userId).select('-password -__v'); // Exclude sensitive fields
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId; // Assuming you're using Clerk's auth middleware
        const userData = await User.findById(userId).populate('enrolledCourses', '-__v -educator -studentsEnrolled'); // Exclude sensitive fields
        res.json({ success: true, courses: userData.enrolledCourses });
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// export const purchaseCourse = async (req, res) => {
//     try {
//         const { courseId } = req.body;
//         const { origin } = req.headers;
//         const userId = req.auth.userId; // Assuming you're using Clerk's auth middleware
//         const userData = await User.findById(userId).select('-password -__v');
//         const courseData = await Course.findById(courseId).select('-content -__v');
//         if (!courseData || !userData) {
//             return res.status(404).json({ success: false, message: 'Data not found' });
//         }
//         const purchaseData = {
//             courseId: courseData._id,
//             userId: userData._id,
//             amount: (courseData.price - courseData.discount * courseData.price / 100).toFixed(2),
//         }
//         const newPurchase = new Purchase.create(purchaseData);

//         res.json({ success: true, session_url: session_url });
//     } catch (error) {
//         console.error('Error purchasing course:', error.message);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// }

export const updateUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId; // Assuming you're using Clerk's auth middleware
        const { courseId, lectureId } = req.body;
        const progressData = await CourseProgress.findOne({ userId, courseId });
        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({ success: true, message: 'Lecture already completed' });
            }
            progressData.lectureCompleted.push(lectureId);
            await progressData.save();
        }
        else {
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId],
            })
        }
        return res.json({ success: true, message: 'Lecture progress updated' });
    }catch (error) {
        console.error('Error updating course progress:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId; // Assuming you're using Clerk's auth middleware
        const { courseId } = req.body;
        const progressData = await CourseProgress.findOne({ userId, courseId });
        res.json({ success: true, progress: progressData });
    } catch (error) {
        console.error('Error fetching course progress:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const addUserRating = async (req, res) => {
    try{
        const userId = req.auth.userId; // Assuming you're using Clerk's auth middleware
        const { courseId, rating } = req.body;
        if(!courseId || !userId || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: 'Invalid details' });
        }
        const courseData = await Course.findById(courseId);
        if(!courseData) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        const user = await User.findById(userId);
        if(!user || !user.enrolledCourses.includes(courseId)) {
            return res.status(404).json({ success: false, message: 'User has not purchased this course' });
        }
        const existingRatingIndex = courseData.ratings.findIndex(r => r.userId === userId);
        if(existingRatingIndex > -1) {
            courseData.ratings[existingRatingIndex].rating = rating;
        } else {
            courseData.ratings.push({ userId, rating });
        }
        await courseData.save();
        return res.json({ success: true, message: 'Rating added successfully' });
    }catch (error) {
        console.error('Error adding user rating:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}