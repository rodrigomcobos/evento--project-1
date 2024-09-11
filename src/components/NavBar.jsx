import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <div className='px-4'>
            <nav className="bg-white max-w-[54rem] mx-auto pt-6 flex justify-between">
                {/* Left Side: Logo and Event Links */}
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-[94px] mr-6" />
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-blue-500 text-xs">Sports</a></li>
                        <li><a href="#" className="hover:text-blue-500 text-xs">Concerts</a></li>
                        <li><a href="#" className="hover:text-blue-500 text-xs">Theater</a></li>
                        <li><a href="#" className="hover:text-blue-500 text-xs">Festivals</a></li>
                    </ul>
                </div>

                {/* Right Side: User Links */}
                <div className="flex items-center space-x-4">
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-blue-500 text-xs">Explore</a></li>
                        <li><a href="#" className="hover:text-blue-500 text-xs">Favorites</a></li>
                        <li><a href="#" className="hover:text-blue-500 text-xs">My Bookings</a></li>
                    </ul>
                    <div className="flex items-center space-x-2">
                        <a href="#" className="hover:text-blue-500 text-xs">Sign In</a>
                        <FaUserCircle className="h-6 w-6 text-blue-500" />

                    </div>
                </div>
            </nav>

        </div>

    );
};

export default Navbar;