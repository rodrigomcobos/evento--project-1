import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaBehance, FaGithub } from 'react-icons/fa';
import placeholderImage from '../assets/slides/loginbackground.jpg';

const LoginPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logged in');
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${placeholderImage})` }}
        >
            <div className="bg-white bg-opacity-80 max-w-3xl w-full rounded-lg shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-14">

                {/* Column 1: Welcome Back */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-xs text-gray-600 mb-6">
                        Evento! is a global ticketing and event platform. It serves a wide range of event types, including concerts, festivals, conferences, workshops, and more.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition duration-300">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition duration-300">
                            <FaLinkedinIn size={24} />
                        </a>
                        <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition duration-300">
                            <FaBehance size={24} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>

                {/* Column 2: Sign In */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-bold mb-6">Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
                        </div>

                        <button
                            type="submit"
                            className="min-w-min bg-indigo-500 text-white py-2 rounded-full hover:bg-indigo-600 transition-colors"
                        >
                            <div className="flex items-center justify-center px-6">
                                Sign In Now
                            </div>

                        </button>
                    </form>

                    <a href="#new" className="block text-sm text-indigo-400 hover:text-indigo-800 mt-4">
                        Are you new here?
                    </a>

                    <p className="text-[.60rem] text-center text-gray-500 mt-6">
                        By clicking on "Sign In Now" you agree to the <br /> <a href="#terms" className="underline">Terms of Service</a> | <a href="#privacy" className="underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;