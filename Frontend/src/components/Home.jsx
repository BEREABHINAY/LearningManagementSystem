import React from 'react';
import '../App.css';
import logo from '../assets/learnity.jpg';

function Home() {
  return (
    <main className="home">
      <section className="hero-section">
        <img src={logo} alt="Learnity Logo" className="hero-logo" />
        <h1 className="hero-title">Learnity</h1>
        <h2 className="hero-tagline">Where Learning Never Ends</h2>
        <p className="hero-desc">Empowering you to learn, grow, and succeed with a modern, flexible online platform.</p>
        <a href="/register" className="hero-cta-btn">Get Started</a>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <img src="https://source.unsplash.com/80x80/?books" alt="books" />
            <h3>📚 Wide Course Selection</h3>
            <p>Choose from hundreds of expert-led courses in development, design, business, and more.</p>
          </div>
          <div className="feature-item">
            <img src="https://source.unsplash.com/80x80/?progress" alt="progress" />
            <h3>📈 Track Your Progress</h3>
            <p>View grades, monitor deadlines, and manage assignments all in one dashboard.</p>
          </div>
          <div className="feature-item">
            <img src="https://source.unsplash.com/80x80/?teamwork" alt="community" />
            <h3>💬 Community Support</h3>
            <p>Join discussions, ask questions, and collaborate with learners worldwide.</p>
          </div>
        </div>
      </section>
      <section className="about-section">
  <h2>About Our Platform</h2>
  <p>
    Our Learning Management System (LMS) empowers students, professionals, and institutions by providing a flexible and user-friendly platform for online education. With a wide selection of courses, personalized progress tracking, assignment submissions, and real-time grading, we make digital learning seamless and impactful.
  </p>
</section>

      <section className="testimonials">
        <h2>What Our Learners Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"This platform transformed my career. The courses are practical and easy to follow."</p>
            <span>— Priya S., Frontend Developer</span>
          </div>
          <div className="testimonial">
            <p>"Assignments and grading helped me stay motivated and improve consistently."</p>
            <span>— Arjun M., CS Student</span>
          </div>
          <div className="testimonial">
            <p>"Love the community and support system. Always someone to help."</p>
            <span>— Neha R., UX Designer</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

