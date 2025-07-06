// models/CourseRegistration.js
import mongoose from 'mongoose';
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  courseId: { type: String, required: true }, // 'react', 'javascript', etc.
}, { timestamps: true });

export default mongoose.model('CourseRegistration', registrationSchema);