import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="bg-white p-6 flex justify-between items-center">
            {/* Left Side: Logo and Event Links */}
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-[94px] mr-5" />
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:text-blue-500 text-sm">Sports</a></li>
                    <li><a href="#" className="hover:text-blue-500 text-sm">Concerts</a></li>
                    <li><a href="#" className="hover:text-blue-500 text-sm">Theater</a></li>
                    <li><a href="#" className="hover:text-blue-500 text-sm">Festivals</a></li>
                </ul>
            </div>

            {/* Right Side: User Links */}
            <div className="flex items-center space-x-4">
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:text-blue-500 text-sm">Explore</a></li>
                    <li><a href="#" className="hover:text-blue-500 text-sm">Favorites</a></li>
                    <li><a href="#" className="hover:text-blue-500 text-sm">My Bookings</a></li>
                </ul>
                <div className="flex items-center space-x-2">
                    <a href="#" className="hover:text-blue-500 text-sm">Sign In</a>
                    <FaUserCircle className="h-6 w-6 text-blue-500" />

                </div>
            </div>
        </nav>
    );
};

export default Navbar;