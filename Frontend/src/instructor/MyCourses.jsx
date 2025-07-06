import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/api/courses/instructor');
        setCourses(response.data);
      } catch (err) {
        console.error('Failed to load courses', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h2>My Created Courses</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-grid">
          {courses.length === 0 ? (
            <p>No courses created yet.</p>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="dashboard-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

export default MyCourses;