import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>Learn LMS</h4>
          <p>Your trusted platform for modern online learning.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Subscribe</h4>
          <form className="subscribe-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <p className="copyright">
        &copy; 2025 Learning Management System. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
