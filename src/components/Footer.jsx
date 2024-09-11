import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-12">
            <div className="container max-w-[52rem] mx-auto">
                {/* Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Column 1: Logo and Social Links */}
                    <div className="flex flex-col items-start">
                        <img src={logo} alt="Evento Logo" className="h-10 mb-4" />
                        <p className="mb-4 font-bold text-sm">Let's Connect</p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                                <FaBehance />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Your Account Links */}
                    <div>
                        <h3 className="font-bold text-sm mb-4">Your Account</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/signup" className="hover:underline text-xs">Sign up</a>
                            </li>
                            <li>
                                <a href="/login" className="hover:underline text-xs">Log in</a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:underline text-xs">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: About Us Links */}
                    <div>
                        <h3 className="font-bold text-sm mb-4">About Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="hover:underline text-xs">About Us</a>
                            </li>
                            <li>
                                <a href="/privacy" className="hover:underline text-xs">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/purchase-policy" className="hover:underline text-xs">Purchase Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="text-center text-xs border-t border-gray-700 pt-4">
                    © 2024 evento! All rights reserved. Designed by Rodrigo Cobos
                </div>
            </div>
        </footer>
    );
};

export default Footer;