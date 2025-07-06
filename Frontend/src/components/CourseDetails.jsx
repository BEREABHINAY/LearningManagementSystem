import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourseDetails.css';

const courseData = {
  react: {
    title: 'React Fundamentals',
    instructor: 'Jane Smith',
    lessons: 18,
    description: 'Learn the fundamentals of React including components, hooks, and state management.',
    progress: 60
  },
  javascript: {
    title: 'Advanced JavaScript',
    instructor: 'John Doe',
    lessons: 24,
    description: 'Deep dive into JavaScript concepts like closures, async/await, and prototypal inheritance.',
    progress: 75
  },
  uiux: {
    title: 'UI/UX Design Basics',
    instructor: 'Emily Davis',
    lessons: 12,
    description: 'Understand the basics of user experience and user interface design principles.',
    progress: 40
  },
  node: {
    title: 'Node.js Backend',
    instructor: 'Mike Thompson',
    lessons: 20,
    description: 'Build scalable server-side applications using Node.js and Express.',
    progress: 90
  }
};

function CourseDetails() {
  const { courseId } = useParams();
  const course = courseData[courseId];
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Registered Successfully!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`);
    setFormData({ name: '', email: '', phone: '' });
    setShowForm(false);
  };

  if (!course) {
    return (
      <main className="course-details">
        <h2>Course not found</h2>
        <p><Link to="/courses" className="back-link">← Back to Courses</Link></p>
      </main>
    );
  }

  return (
    <main className="course-details">
      <div className="course-header">
        <h2>{course.title}</h2>
        <div className="button-row">
          <button className="register-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : 'Register'}
          </button>
          <Link to="/courses" className="back-link">← Back to Courses</Link>
        </div>
      </div>

      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Lessons:</strong> {course.lessons}</p>
      <p>{course.description}</p>

      <div className="progress-container">
        <label><strong>Rating:</strong> {course.progress}%</label>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
        </div>
      </div>

      {showForm && (
        <form className="register-form" onSubmit={handleSubmit}>
          <h3>Register for this course</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" className="confirm-button">Confirm Registration</button>
        </form>
      )}
    </main>
  );
}

export default CourseDetails;



