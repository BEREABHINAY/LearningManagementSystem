import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FaUserGraduate, FaTasks, FaChartLine, FaBullhorn } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [active, setActive] = useState('courses');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulated fetch based on user
    const userId = localStorage.getItem('userId');
    const mockUserProgress = {
      user123: {
        courses: 4,
        assignmentsDue: 1,
        averageGrade: '87%',
        announcements: 2,
        charts: {
          courses: {
            labels: ['Web Dev', 'AI', 'DBMS'],
            data: [4, 2, 3],
            label: 'Course Enrollments'
          },
          assignments: {
            labels: ['Due Soon', 'Submitted', 'Graded'],
            data: [1, 4, 2],
            label: 'Assignment Status'
          },
          grades: {
            labels: ['HTML', 'CSS', 'React'],
            data: [85, 89, 87],
            label: 'Grades (%)'
          },
          announcements: {
            labels: ['Unread', 'Read'],
            data: [1, 1],
            label: 'Announcements'
          }
        }
      },
      user456: {
        courses: 6,
        assignmentsDue: 3,
        averageGrade: '93%',
        announcements: 4,
        charts: {
          courses: {
            labels: ['Python', 'ML', 'Cloud'],
            data: [2, 3, 4],
            label: 'Course Enrollments'
          },
          assignments: {
            labels: ['Due Soon', 'Submitted', 'Graded'],
            data: [3, 6, 4],
            label: 'Assignment Status'
          },
          grades: {
            labels: ['Python', 'ML', 'Cloud'],
            data: [94, 95, 90],
            label: 'Grades (%)'
          },
          announcements: {
            labels: ['Unread', 'Read'],
            data: [2, 2],
            label: 'Announcements'
          }
        }
      }
    };

    const progress = mockUserProgress[userId] || mockUserProgress.user123;
    setUserData(progress);
  }, []);

  if (!userData) return <main className="dashboard"><p>Loading...</p></main>;

  const gradeChartData = {
    labels: userData.charts[active].labels,
    datasets: [
      {
        label: userData.charts[active].label,
        data: userData.charts[active].data,
        backgroundColor: '#1abc9c'
      }
    ]
  };

  const gradeChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Dashboard Insights'
      }
    }
  };

  return (
    <main className="dashboard">
      <div className="dashboard-wrapper">
        <div className="dashboard-sidebar">
          <button onClick={() => setActive('courses')} className={active === 'courses' ? 'active' : ''}>
            <FaUserGraduate /> Courses
          </button>
          <button onClick={() => setActive('assignments')} className={active === 'assignments' ? 'active' : ''}>
            <FaTasks /> Assignments
          </button>
          <button onClick={() => setActive('grades')} className={active === 'grades' ? 'active' : ''}>
            <FaChartLine /> Grades
          </button>
          <button onClick={() => setActive('announcements')} className={active === 'announcements' ? 'active' : ''}>
            <FaBullhorn /> Announcements
          </button>
        </div>

        <div className="dashboard-content">
          <h2>Student Dashboard</h2>
          <div className="card">
            <Bar data={gradeChartData} options={gradeChartOptions} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;


