import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Register() {
  const { courseId } = useParams();
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
    alert(`Registered for ${courseId}!\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <main className="register-page">
      <h2>Register for {courseId}</h2>
      <form className="register-form" onSubmit={handleSubmit}>
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
        <input 
          type="text"
          name="Course Name"
          placeholder="Course Name"
          onChange={handleChange}></input>
        <button type="submit" className="confirm-button">Confirm Registration</button>
      </form>
      <Link to="/courses" className="back-link">← Back to Courses</Link>
    </main>
  );
}

export default Register;
