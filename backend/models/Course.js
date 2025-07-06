import mongoose from 'mongoose';
const lectureSchema = new mongoose.Schema({
  lectureId: { type: String, required: true }, // Unique identifier for each lecture
  lectureTitle: { type: String, required: true }, // Title of the lecture
  videoUrl: { type: String, required: true }, // URL of the video content
  duration: { type: Number, required: true }, // Duration of the lecture in seconds
  isPreviewFree: {type: Number, required: true} // 0 for no preview, 1 for free preview
}, {_id: false});

const chapterSchema = new mongoose.Schema({
  chapterId: { type: String, required: true }, // Unique identifier for each chapter
  chapterOrder: { type: Number, required: true }, // Order of the chapter in the course
  chapterTitle: { type: String, required: true }, // Title of the chapter
  chapterContent: [lectureSchema], // Content of the chapter
},{_id: false});

const courseSchema = new mongoose.Schema({
  title: {type:String, required: true, unique: true}, // Unique title for each course
  description: String, 
  thumbnail: String,
  price: {
    type: Number,
    default: 0 // Default price is 0, indicating free courses
  },
  isPublished: {
    type: Boolean,
    default: false // Default is not published
  }, 
  discount: {
    type: Number, required: true, min:0, max: 100}, // Default discount is 0
  chapters: [chapterSchema], // Array of chapters in the course
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  studentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true , minimize: false});

const Course = mongoose.model('Course', courseSchema);
export default Course;
