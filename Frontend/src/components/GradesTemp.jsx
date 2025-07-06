import React from 'react';

function Grades() {
  const data = [
    { course: 'Web Development Basics', assignment: 'HTML & CSS Project', grade: '95%' },
    { course: 'JavaScript Fundamentals', assignment: 'Array Methods Quiz', grade: '88%' },
    { course: 'React Essentials', assignment: 'Build a Todo App', grade: '92%' },
  ];

  return (
    <main>
      <h2>Grades & Progress</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Assignment</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.course}</td>
              <td>{item.assignment}</td>
              <td>{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Grades;