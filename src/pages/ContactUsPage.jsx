import React, { useState } from 'react';
import { init, send } from 'emailjs-com'; // Import EmailJS functions

// react-icons
import { FaDiscord, FaLinkedinIn, FaBehance, FaGithub, FaMailBulk } from 'react-icons/fa';

// Components
import SearchNavBar from '../components/SearchNavBar';
import TransparentLogo from '../assets/slides/transparentlogo.png';

// Initialize EmailJS with your service ID and user ID from .env file
init(import.meta.env.VITE_EMAILJS_USER_ID);

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSent, setIsSent] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formData)
            .then(() => {
                // console.log('Email sent successfully');
                setIsSent(true);
                setIsError(false);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            })
            .catch(() => {
                setIsError(true);
                setIsSent(false);
                // console.log('Error sending email');
            });
        e.target.reset();  // Clear form after submission
    };

    return (
        <>
            <SearchNavBar />

            {/* Contact Us Page */}
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">Contact Us</h1>

                    {/* Transparent logo positioned at the bottom right */}
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img
                            src={TransparentLogo}
                            alt="Logo"
                            className="object-cover opacity-25%"
                            style={{
                                position: 'absolute',
                                bottom: '-30px',  // Ensures half of the logo is shown
                                right: '-30px',   // Moves it slightly off-screen
                                width: '50%',
                                maxWidth: '275px', // Control the max size of the logo
                            }}
                        />
                    </div>
                </div>
            </section>

            <div className="grid sm:grid-cols-2 items-start gap-16 p-4 mx-auto max-w-4xl bg-white pt-24 pb-48">
                <div>
                    <h1 className="text-gray-800 text-3xl font-extrabold">Let's Talk</h1>
                    <p className="text-md text-gray-500 mt-4">Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.</p>

                    <div className="mt-12">
                        <h2 className="text-gray-800 text-lg font-bold">Email</h2>
                        <ul className="mt-4">
                            <li className="flex items-center">
                                <FaMailBulk size={24} />
                                <a href="mailto:rodrigomcobos@gmail.com" className="text-indigo-500 text-md ml-4">
                                    <p className="block text-md">Mail</p>
                                    <p className='text-lg font-semibold'>rodrigomcobos@gmail.com</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-gray-800 text-lg font-bold mb-6">Socials</h2>
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
                </div>

                <form onSubmit={handleSubmit} className="ml-auto space-y-4">
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Name'
                        className="w-full border p-3 rounded-md text-md"
                    />
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email'
                        className="w-full border p-3 rounded-md text-md"
                    />
                    <input
                        type='text'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder='Subject'
                        className="w-full border p-3 rounded-md text-md"
                    />
                    <textarea
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Message'
                        rows="6"
                        className="w-full border p-3 rounded-md text-md"
                    ></textarea>
                    <button
                        type='submit'
                        className="min-w-min px-8 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        {isSent ? 'Sent!' : 'Send'}
                    </button>
                    {isError && <p className="text-red-500">Failed to send message. Please try again.</p>}
                </form>
            </div>
        </>
    );
};

export default ContactUsPage;
