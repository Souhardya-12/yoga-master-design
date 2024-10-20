import React, { useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const ContactUs = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen flex flex-col`}>
      {/* Container for dark mode toggle */}
      <div className="fixed top-4 right-4">
        <button 
          onClick={toggleDarkMode} 
          className="px-4 py-2 bg-opacity-50 bg-gray-700 text-white rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          {darkMode ? '🔆' : '🌙'}
        </button>
      </div>

      {/* Contact Us Section */}
      <div className="flex-grow bg-white dark:bg-gray-900 flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-4xl font-bold text-secondary dark:text-gray-200 mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
          Welcome to our platform, where we offer the best online yoga courses designed for beginners and professionals alike. 
          Whether you're looking to deepen your practice or start fresh, we have a course tailored just for you. 
          If you have any questions or need assistance, feel free to reach out to us through the following methods:
        </p>
        
        {/* Contact Details */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center font-bold text-secondary dark:text-blue-400  text-lg">
            <FaPhone className="mr-2" />
            <span>Call us: <a href="tel:9879879777" className="hover:text-green-500">9879879777</a></span>
          </div>
          <div className="flex font-bold items-center text-secondary dark:text-blue-400 text-lg">
            <FaEnvelope className="mr-2" />
            <span>Email us: <a href="mailto:yogamaster@yogi.com" className="hover:text-green-500">yogamaster@yogi.com</a></span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-600">
            <FaYoutube size={30} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
            <FaFacebook size={30} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400">
            <FaInstagram size={30} />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-10">
          <NavLink to="/" className="hover:text-secondary">
            Home
          </NavLink>
          <NavLink to="/classes" className="hover:text-secondary">
            Classes
          </NavLink>
          <NavLink to="/instructors" className="hover:text-secondary">
            Instructors
          </NavLink>
          <NavLink to="/contact-us" className="hover:text-secondary">
            Contact Us
          </NavLink>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-400 my-2">
          © {new Date().getFullYear()} YogaMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
