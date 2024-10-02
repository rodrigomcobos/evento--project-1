import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../redux/userSlice';

// react-icons
import { FaDiscord, FaLinkedinIn, FaBehance, FaGithub } from 'react-icons/fa';

// Components
import backgroundImage from '../assets/slides/loginbackground.png';
import transparentLogo from '../assets/slides/transparentlogo.png';

const SignUpForm = ({ toggleForm }) => {  // Added toggleForm prop
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState(null);  // Renamed to formError

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error: reduxError } = useSelector((state) => state.user);  // Renamed to reduxError

    // Handle submit function for sign-up form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (password !== confirmPassword) {
            setFormError("Passwords don't match!");
            return;
        }
        if (password.length < 6) {
            setFormError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const resultAction = await dispatch(signUp({
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                password
            })).unwrap();

            // console.log('Sign-up successful:', resultAction);
            navigate('/profile');
        } catch (err) {
            console.error('Error during sign-up:', err);
            setFormError(err.message || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div
            className="min-h-screen p-6 flex items-center justify-center bg-cover bg-bottom-right relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Transparent Logo */}
            <img
                src={transparentLogo}
                alt="Logo"
                className="absolute bottom-10 right-10 z-0 w-[30%] h-auto"
            />

            <div className="bg-white bg-opacity-80 max-w-5xl w-full rounded-lg shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-14 relative z-10">
                {/* Column 1: Welcome */}
                <section className="flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Evento!</h2>
                    <p className="text-md text-gray-600 mb-6 pr-6">
                        Evento! is a global ticketing and event platform. It serves a wide range of event types, including concerts, festivals, conferences, workshops, and more.
                    </p>
                    <div className="flex space-x-3">
                        <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition duration-300">
                            <FaDiscord size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/rodrigomcobos/" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition duration-300">
                            <FaLinkedinIn size={24} />
                        </a>
                        <a href="https://www.behance.net/rodrigocobos1" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition duration-300">
                            <FaBehance size={24} />
                        </a>
                        <a href="https://github.com/rodrigomcobos/evento--project-1" target="_blank" rel="noreferrer" className="hover:text-purple-500 transition duration-300">
                            <FaGithub size={24} />
                        </a>
                    </div>
                </section>

                {/* Column 2: Sign Up */}
                <section className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">First Name</label>
                            <input
                                type="text"
                                required
                                value={firstName}
                                placeholder='Your First Name'
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                required
                                value={lastName}
                                placeholder='Your Last Name'
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                placeholder='Your email'
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                placeholder='Create Username'
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                placeholder='***-***-****'
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={password}
                                    placeholder='Create a password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute inset-y-0 right-2 text-sm text-gray-500 focus:outline-none"
                                >
                                    {passwordVisible ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    value={confirmPassword}
                                    placeholder='Confirm your password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="absolute inset-y-0 right-2 text-sm text-gray-500 focus:outline-none"
                                >
                                    {confirmPasswordVisible ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Error message */}
                        {/* Error messages */}
                        {formError && <p className="text-red-500">{formError}</p>}
                        {reduxError && <p className="text-red-500">{reduxError}</p>}

                        <button
                            type="submit"
                            className="min-w-min px-8 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                            disabled={loading}
                        >
                            <div className="flex items-center justify-center px-2">
                                {loading ? 'Signing Up...' : 'Sign Up Now'}
                            </div>
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-500 mt-6">
                        Already have an account? <a href="#signin" onClick={toggleForm} className="underline text-indigo-500">Sign In here</a>
                    </p>

                    <p className="text-sm text-center text-gray-500 mt-6">
                        By clicking on "Sign Up Now" you agree to the <br /> <a href="#terms" className="underline">Terms of Service</a> | <a href="#privacy" className="underline">Privacy Policy</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default SignUpForm;
