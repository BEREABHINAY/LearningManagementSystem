import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/ProfileTemp";
import Grades from "./components/GradesTemp";
import SubmitAssignment from "./components/SubmitAssignment";
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Announcements from './components/Announcements';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './instructor/CreateCourse';
import MyCourses from './instructor/MyCourses';
import InstructorRoute from './instructor/InstructorRoute';



import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
<Route path="/register/:courseId" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/submit-assignment" element={<SubmitAssignment />} />
          <Route
  path="/create-course"
  element={
    <InstructorRoute>
      <CreateCourse />
    </InstructorRoute>
  }
/>

<Route
  path="/my-courses"
  element={
    <InstructorRoute>
      <MyCourses />
    </InstructorRoute>
  }
/>

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

