import React from 'react';
import { FaDiscord, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-gray-200 py-12 px-12">
                <div className="container max-w-[52rem] mx-auto">
                    {/* Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 sm:items-center gap-12 mb-8">

                        {/* Column 1: Logo and Social Links */}
                        <div className="flex flex-col items-start">
                            <img src={logo} alt="Evento Logo" className="h-9 mb-4" />
                            <p className="mb-4 font-bold text-sm">Let's Connect</p>
                            <div className="flex space-x-4">
                                <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
                                    <FaDiscord />
                                </a>
                                <a href="https://www.linkedin.com/in/rodrigomcobos/" target="_blank" rel="noreferrer" className="hover:text-blue-700">
                                    <FaLinkedinIn />
                                </a>
                                <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                                    <FaBehance />
                                </a>
                                <a href="https://github.com/rodrigomcobos/evento--project-1" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                                    <FaGithub />
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Your Account Links */}
                        <div>
                            <h3 className="font-bold text-sm mb-4">Your Account</h3>
                            <ul className="space-y-1">
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
                            <ul className="space-y-1">
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
                    <div className="text-center text-[.54rem] border-t border-gray-700 pt-4">
                        © 2024 Evento! All rights reserved. This website is not affiliated with anyone. For educational purposes only. This is a demo project that includes real data and payments will not be processed, only for demo purposes. If you like this website, please give me a star on my Github Repo which is linked on my active social links. Thank you for visiting, use this site's contact form to leave me any comments or suggestions. <br />Designed by Rodrigo Cobos, project for DevMountain, Lehi, UT 2024
                    </div>
                </div>
            </footer>
        </div>

    );
};

export default Footer;