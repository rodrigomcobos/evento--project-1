import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, clearError } from '../redux/userSlice';

// react-icons
import { FaDiscord, FaLinkedinIn, FaBehance, FaGithub } from 'react-icons/fa';

// Components
import backgroundImage from '../assets/slides/loginbackground.png';
import transparentLogo from '../assets/slides/transparentlogo.png';

const SignInForm = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);

    // Clear any existing errors when the component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Function to handle form submission and sign in
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(signIn({ email, password })).unwrap();
            // console.log('Successfully Signed In');
            navigate('/profile');
        } catch (err) {
            console.error('Failed to sign in:', err);
            // Error is now handled in the Redux slice, no need to set it here
        }
    };

    return (
        <div
            className="min-h-screen px-6 flex items-center justify-center bg-cover bg-bottom-right relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Transparent Logo */}
            <img
                src={transparentLogo}
                alt="Logo"
                className="absolute bottom-10 right-10 z-0 w-[30%] h-auto"
            />
            <div className="bg-white bg-opacity-80 max-w-5xl w-full rounded-lg shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-14">

                {/* Column 1: Welcome Back */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
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
                </div>

                {/* Column 2: Sign In */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-6">Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Address */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                placeholder='john.doe@me.com'
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={password}
                                    placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
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

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe" className="text-md text-gray-600">Remember Me</label>
                        </div>

                        {/* Error message */}
                        {error && <p className="text-red-500">{error}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="min-w-min px-8 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                            disabled={loading}
                        >
                            <div className="flex items-center justify-center px-2">
                                {loading ? 'Signing In...' : 'Sign In'}
                            </div>
                        </button>
                    </form>

                    {/* Toggle to Sign Up */}
                    <a href="#new"
                        className="block text-md text-indigo-400 hover:text-indigo-800 mt-2"
                        onClick={toggleForm}
                    >
                        Are you new here?
                    </a>

                    <p className="text-sm text-center text-gray-500 mt-6">
                        By clicking on "Sign In" you agree to the <br /> <a href="#terms" className="underline">Terms of Service</a> | <a href="#privacy" className="underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;