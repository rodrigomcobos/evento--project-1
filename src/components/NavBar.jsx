import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close the menu when clicking outside of it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isMenuOpen]);

    return (
        <div className='px-4'>
            <nav className="bg-white max-w-[54rem] mx-auto pt-6 flex justify-between align-middle">
                {/* Left Side: Logo and Event Links */}
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-[94px] mr-6" />
                    <ul className="hidden md:flex space-x-4">
                        <li><a href="#" className="hover:text-blue-500 transition duration-300 text-xs">Sports</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition duration-300 text-xs">Concerts</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition duration-300 text-xs">Theater</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition duration-300 text-xs">Festivals</a></li>
                    </ul>
                </div>

                {/* Right Side: User Links */}
                <div className="hidden md:flex items-center justify-between space-x-4">
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-blue-500 transition duration-300 text-xs">Explore</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition duration-300 text-xs">Favorites</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition duration-300 text-xs">My Bookings</a></li>
                    </ul>
                    <div className="flex items-center space-x-2">
                        <a href="#" className="hover:text-blue-500 text-xs transition duration-300">Sign In</a>
                        <FaUserCircle className="h-6 w-6 text-blue-500" />
                    </div>
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <FiX className="h-6 w-6 text-blue-500" /> // Close icon
                        ) : (
                            <FiMenu className="h-6 w-6 text-blue-500" /> // Hamburger icon
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div ref={menuRef} className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg z-50 transition-transform transform translate-x-0">
                        <div className="flex flex-col p-6 space-y-4">
                            {/* Close button */}
                            <div className="flex justify-end">
                                <button onClick={toggleMenu}>
                                    <FiX className="h-6 w-6 text-blue-500" />
                                </button>
                            </div>

                            <ul className="space-y-4">
                                <li><a href="#" className="text-lg font-bold">Sports</a></li>
                                <li><a href="#" className="text-lg font-bold">Concerts</a></li>
                                <li><a href="#" className="text-lg font-bold">Theater</a></li>
                                <li><a href="#" className="text-lg font-bold">Festivals</a></li>
                            </ul>

                            <ul className="space-y-4 mt-8">
                                <li><a href="#" className="text-lg font-bold">Explore</a></li>
                                <li><a href="#" className="text-lg font-bold">Favorites</a></li>
                                <li><a href="#" className="text-lg font-bold">My Bookings</a></li>
                                <li><a href="#" className="text-lg font-bold">Sign In</a></li>
                            </ul>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;