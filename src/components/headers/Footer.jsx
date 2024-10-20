import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white py-8'>
            {/* Social Media Icons */}
            <div className='flex justify-center space-x-6 mb-4'>
                <a href='https://youtube.com' target='_blank' rel='noreferrer' className='hover:text-red-600'>
                    <FaYoutube size={30} />
                </a>
                <a href='https://facebook.com' target='_blank' rel='noreferrer' className='hover:text-blue-600'>
                    <FaFacebook size={30} />
                </a>
                <a href='https://instagram.com' target='_blank' rel='noreferrer' className='hover:text-pink-400'>
                    <FaInstagram size={30} />
                </a>
            </div>

            {/* Navigation Links */}
            <div className='flex justify-center space-x-10'>
                <NavLink to="/" className='hover:text-secondary'>
                    Home
                </NavLink>
                <NavLink to="/classes" className='hover:text-secondary'>
                    Classes
                </NavLink>
                <NavLink to="/instructors" className='hover:text-secondary'>
                    Instructors
                </NavLink>
                <NavLink to="/contact-us" className='hover:text-secondary'>
                    Contact Us
                </NavLink>
            </div>
            {/* Copyright Section */}
            <div className='text-center text-sm text-gray-400 my-2'>
                © {new Date().getFullYear()} YogaMaster. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
