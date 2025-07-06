import React, { useState } from 'react';
import api from '../utils/api';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/courses', { title, description });
      setMessage('Course created successfully!');
      setTitle('');
      setDescription('');
    } catch (err) {
      setMessage('Error creating course');
    }
  };

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h2>Create a New Course</h2>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="title">Course Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Course</button>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}

export default CreateCourse;
