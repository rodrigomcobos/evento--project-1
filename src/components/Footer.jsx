import React from 'react';
import { FaDiscord, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <div>
            <footer className="bg-zinc-800 text-gray-200 py-12 px-4">
                <div className="container max-w-6xl mx-auto">
                    {/* Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 sm:items-center gap-12 mb-8">

                        {/* Column 1: Logo and Social Links */}
                        <div className="flex flex-col items-start">
                            <img src={logo} alt="Evento Logo" className="h-12 mb-4" />
                            <p className="mb-4 font-bold text-lg">Let's Connect</p>
                            <div className="flex space-x-4">
                                <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
                                    <FaDiscord size={20} />
                                </a>
                                <a href="https://www.linkedin.com/in/rodrigomcobos/" target="_blank" rel="noreferrer" className="hover:text-blue-700">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                                    <FaBehance size={20} />
                                </a>
                                <a href="https://github.com/rodrigomcobos/evento--project-1" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                                    <FaGithub size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Your Account Links */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Your Account</h3>
                            <ul className="space-y-1">
                                <li>
                                    <a href="/signup" className="hover:underline text-sm">Sign up</a>
                                </li>
                                <li>
                                    <a href="/login" className="hover:underline text-sm">Log in</a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:underline text-sm">Contact Us</a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: About Us Links */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">About Us</h3>
                            <ul className="space-y-1">
                                <li>
                                    <a href="/about" className="hover:underline text-sm">About Us</a>
                                </li>
                                <li>
                                    <a href="/privacy" className="hover:underline text-sm">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/purchase-policy" className="hover:underline text-sm">Purchase Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="text-center text-[.75rem] border-t border-gray-700 pt-4">
                        © 2024 Evento! All rights reserved. This website is not affiliated with anyone. For educational purposes only. This is a demo project that includes real data and payments will not be processed, only for demo purposes. If you like this website, please give me a star on my Github Repo which is linked on my active social links. Thank you for visiting, use this site's contact form to leave me any comments or suggestions. <br />Designed by Rodrigo Cobos, project for DevMountain, Lehi, UT 2024
                    </div>
                </div>
            </footer>
        </div>

    );
};

export default Footer;