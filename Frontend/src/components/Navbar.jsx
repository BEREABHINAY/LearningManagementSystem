import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './Navbar.css';
import logo from '../assets/learnity.jpg';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-branding">
        <img src={logo} alt="Learnity Logo" className="learnity-logo" />
        <div className="learnity-title-group">
          <span className="learnity-title">Learnity</span>
          <span className="learnity-tagline">Where Learning Never Ends</span>
        </div>
      </div>
      <div className="navbar-left">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu size={24} />
        </button>

        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
          <li><NavLink to="/courses" onClick={() => setMenuOpen(false)}>Courses</NavLink></li>
          <li><NavLink to="/submit-assignment" onClick={() => setMenuOpen(false)}>Assignments</NavLink></li>
          <li><NavLink to="/grades" onClick={() => setMenuOpen(false)}>Grades</NavLink></li>
          <li><NavLink to="/announcements" onClick={() => setMenuOpen(false)}>Announcements</NavLink></li>
          <li><NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
          {role === 'instructor' && (
            <>
              <li><NavLink to="/create-course" onClick={() => setMenuOpen(false)}>Create Course</NavLink></li>
              <li><NavLink to="/my-courses" onClick={() => setMenuOpen(false)}>My Courses</NavLink></li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-right">
        <NavLink to="/" className="right-link">Home</NavLink>
        <NavLink to="/dashboard" className="right-link">Dashboard</NavLink>
        <NavLink to="/contact" className="right-link">Contact</NavLink>
        {role === 'instructor' && (
          <>
            <NavLink to="/create-course" className="right-link">Create Course</NavLink>
            <NavLink to="/my-courses" className="right-link">My Courses</NavLink>
          </>
        )}
        {!token ? (
          <NavLink to="/login" className="login-link">Login</NavLink>
        ) : (
          <button onClick={handleLogout} className="logout-link">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
