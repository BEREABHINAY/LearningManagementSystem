import React, { useState } from 'react';

function ProfileTemp() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating profile:', formData);
  };

  return (
    <main>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />

        <button type="submit">Update Profile</button>
      </form>
    </main>
  );
}

export default ProfileTemp; // ✅ MUST be here

