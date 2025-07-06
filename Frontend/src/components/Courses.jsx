import React from 'react';
import { Link } from 'react-router-dom';
import './Course.css';

function Courses() {
  const courses = [
    {
      id: 'react',
      title: 'React Fundamentals',
      instructor: 'Jane Smith',
      lessons: 18
    },
    {
      id: 'javascript',
      title: 'Advanced JavaScript',
      instructor: 'John Doe',
      lessons: 24
    },
    {
      id: 'uiux',
      title: 'UI/UX Design Basics',
      instructor: 'Emily Davis',
      lessons: 12
    },
    {
      id: 'node',
      title: 'Node.js Backend',
      instructor: 'Mike Thompson',
      lessons: 20
    }
  ];

  return (
    <main className="courses">
      <h2>Available Courses</h2>
      <div className="course-grid">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <h3>{course.title}</h3>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Lessons:</strong> {course.lessons}</p>
            <Link to={`/courses/${course.id}`} className="view-button">View Course</Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Courses;
