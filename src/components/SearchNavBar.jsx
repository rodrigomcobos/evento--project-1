import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';

const SearchNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Function to toggle the menu when the hamburger icon is clicked
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close the menu when clicking outside of it in mobile mode
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

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };


    return (
        <>
            <div className="flex gap-2 max-sm:flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white [text-shadow:_0_1px_0_rgb(0_0_0_/25%)]  px-4 py-2 font-[sans-serif]">
                <p className="text-base">This is a demo website.</p>
                <a target='_blank'
                    href="https://github.com/rodrigomcobos/evento--project-1"
                    className="min-w-min px-4 py-1 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                >
                    Visit the Repo
                </a>
            </div>
            {/* Nav Bar */}
            <div className='px-4 mb-6'>
                <nav className="bg-white max-w-6xl mx-auto pt-6 flex justify-between align-middle">
                    {/* Left Side: Logo and Event Links */}
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="w-[145px]" />
                        {/* Search Bar */}
                        <div className='px-4'>
                            <div className="flex bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-600 items-center bg-gray-100 rounded-full p-[2px] w-auto sm:w-dvw max-w-[350px] shadow-md">
                                <div className='rounded-full p-3 bg-white h-full w-full flex items-center justify-between'>
                                    <FaSearch className="text-gray-500 mr-3" />
                                    <input
                                        type="text"
                                        className="bg-transparent outline-none w-full text-md"
                                        placeholder={isFocused ? '' : 'Search events, artists, teams, and more'}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Side: User Links */}
                    <div className="hidden md:flex items-center justify-between space-x-4">
                        <ul className="flex space-x-4">
                            <li><a href="#" className="hover:text-blue-500 transition duration-300 text-md">Explore</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition duration-300 text-md">My Bookings</a></li>
                        </ul>
                        <div className="flex items-center space-x-2">
                            <a href="#" className="hover:text-blue-500 text-md transition duration-300">Sign In</a>
                            <FaUserCircle className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>

                    {/* Hamburger Icon for Mobile */}
                    <menu className="md:hidden flex items-center">
                        <button onClick={toggleMenu}>
                            {isMenuOpen ? (
                                <FiX className="h-6 w-6 text-blue-500" /> // Close icon
                            ) : (
                                <FiMenu className="h-6 w-6 text-blue-500" /> // Hamburger icon
                            )}
                        </button>
                    </menu>

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
                                    <li><a href="#" className="text-lg font-bold">My Bookings</a></li>
                                    <li><a href="#" className="text-lg font-bold">Sign In</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </>

    );
};

export default SearchNavBar;