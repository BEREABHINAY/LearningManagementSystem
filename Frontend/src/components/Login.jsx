import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';               // optional styling

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState('student');   // "admin" | "student"
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/api/auth/login', {
        email,
        password,
        role,
      });

      const { token, role: returnedRole } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('role',  returnedRole);

      if (returnedRole === 'admin')   navigate('/admin-dashboard');
      else                            navigate('/dashboard');      // student
    } catch (err) {
      console.error(err);
      setError('Invalid credentials or role. Please try again.');
    }
  };

  return (
    <main className="login-page">
      <h2>Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* role selector */}
        <fieldset className="role-select">
          <legend>Login as:</legend>
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === 'student'}
              onChange={() => setRole('student')}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            Admin
          </label>
        </fieldset>

        <button type="submit">Login</button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </main>
  );
}

export default Login;

