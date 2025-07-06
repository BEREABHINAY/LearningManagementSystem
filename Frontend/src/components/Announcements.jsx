import React from 'react';
import './Announcements.css';

function Announcements() {
  const announcements = [
    {
      title: 'New Assignment Released',
      date: 'July 10, 2025',
      message: 'Assignment 3 for React Fundamentals is now available. Due next Friday.'
    },
    {
      title: 'Live Q&A Session',
      date: 'July 12, 2025',
      message: 'Join us for a live Q&A session with the instructor this Saturday at 6 PM.'
    },
    {
      title: 'Midterm Results Published',
      date: 'July 8, 2025',
      message: 'Check your grades section to see the midterm exam results.'
    }
  ];

  return (
    <main className="announcements">
      <h2>Latest Announcements</h2>
      <ul className="announcement-list">
        {announcements.map((item, index) => (
          <li key={index} className="announcement-item">
            <h3>{item.title}</h3>
            <span className="date">{item.date}</span>
            <p>{item.message}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Announcements;
