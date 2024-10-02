import React from 'react'
import { Link } from 'react-router-dom';

// react-icons
import { FaDiscord, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa';

// Components
import SearchNavBar from '../components/SearchNavBar'


// Photo/Img Imports
import RodrigoPhoto from '../assets/slides/rodrigo.jpeg'
import SeanPhoto from '../assets/slides/sean.jpeg'
import ScottPhoto from '../assets/slides/scott.jpeg'
import Team1Photo from '../assets/slides/team1.jpg'
import Team2Photo from '../assets/slides/team2.jpg'
import Team3Photo from '../assets/slides/team3.jpg'
import DiscountImg from '../assets/slides/discount.png'
import MoneyImg from '../assets/slides/money.png'
import TimeImg from '../assets/slides/time.png'
import TransparentLogo from '../assets/slides/transparentlogo.png'

const AboutUs = () => {
    return (
        <>
            <SearchNavBar />
            {/* About Us Strip */}
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">About Us</h1>

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

            {/* Main Content */}
            <div className="mx-auto px-6 py-12 space-y-12 max-w-6xl mb-24">
                {/* Who we are */}
                <section className='py-8'>
                    <h2 className="text-3xl font-semibold mb-4 flex justify-center items-center">Who we are</h2>
                    <p className="text-md text-gray-600 text-center">
                        For more than 12 years, Evento! has been the top marketplace for fans to buy and sell tickets. We remain committed to offering peace of mind through our guarantee, exceptional customer service, and innovative features that ensure your satisfaction. This website was created as a project for a fictional company, integrating both backend and frontend to deliver a smooth experience—from browsing events to testing our purchasing process. Please note, this site is for demonstration educational purposes only, and any tickets purchased are not real. We are not affiliated with any company or organization displayed on this site.
                    </p>
                </section>

                {/* Separation line */}
                <hr className="border-gray-300" />

                {/* Our guarantee */}
                <section className='py-12'>
                    <h2 className="text-3xl font-semibold mb-2 flex justify-center items-center">Our guarantee to you</h2>
                    <p className='text-sm text-gray-400 flex justify-center items-center mb-10'>** This is a demo site, none of these terms are real or applicable **</p>
                    <p className='text-md text-center'>
                        Every order is 100% guaranteed on Evento. Our exclusive Protection Program Guarantee ensures that you'll receive valid tickets or your money back. This guarantee makes us the most trusted ticket marketplace, allowing fans to buy and sell with complete confidence.
                    </p><br />

                    <p className='text-lg text-center font-bold'>Our Protection Program Guarantee provides buyers with four key benefits:</p><br />
                    <ul className='text-md text-center'>
                        <li>You'll receive your tickets in time for the event.</li>
                        <li>Your order guarantees a valid ticket for entry.</li>
                        <li>If there's an issue with your order, we'll resolve it with comparable or better tickets or a full refund.</li>
                        <li>If your event is canceled and not rescheduled, you'll receive a 100% credit or the option for a full refund.</li>
                    </ul>

                    <p className='text-md text-center'>Check the full buyer Terms & Conditions <a href="#">here</a>.</p><br />
                    <p className='text-md text-center'> Please note: Only tickets bought or sold through Evento platforms are covered by this guarantee.<br /></p>
                    <div className='flex justify-center items-center'>
                        <p className='text-md text-center'>
                            Read the full policy&nbsp;
                        </p>
                        <Link to="/purchase-policy" className='text-indigo-500'>
                            here.
                        </Link>
                    </div>

                </section>

                {/* Separation line */}
                <hr className="border-gray-300" />

                {/* Above and beyond */}
                <section className='py-12'>
                    <h2 className="text-3xl font-semibold mb-2 flex justify-center items-center">Above and beyond our guarantee, we offer:</h2>
                    <p className='text-sm text-gray-400 flex justify-center items-center mb-10'>** This is a demo site, none of these terms are real or applicable **</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-6 flex flex-col items-center justify-center">
                            <img src={TimeImg} alt="placeholder" className="w-48 h-48 object-cover mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-center">Don't miss a moment</h3>
                            <p className="text-gray-600 text-center">
                                Don’t miss a moment. With access to millions of events and features like Price Alert to help you stay on budget, we’ve got the perfect ticket for you.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-6 flex flex-col items-center justify-center">
                            <img src={MoneyImg} alt="placeholder" className="w-48 h-48 object-cover mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-center">Satisfaction Guarantee</h3>
                            <p className="text-gray-600 text-center">
                                Buy tickets with confidence. We guarantee that you’ll receive valid tickets or your money back. This is a fictional company that doesn't exist by the way.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-6 flex flex-col items-center justify-center">
                            <img src={DiscountImg} alt="placeholder" className="w-48 h-48 object-cover mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-center">Evento Perks</h3>
                            <p className="text-gray-600 text-center">
                                Receive perks with our exclusive Protection Program Guarantee and earn discounts on your tickets. This is a fictional company that doesn't exist.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Separation line */}
                <hr className="border-gray-300" />

                {/* Evento Dream Team */}
                <section className='py-12'>
                    <h2 className="text-3xl font-semibold mb-4 flex justify-center items-center pb-12">Evento's Web Development Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                        {/* Team Card 1 */}
                        <div className="text-center">
                            <img src={RodrigoPhoto} alt="team member" className="w-[10rem] h-[10rem] rounded-full mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">Rodrigo Cobos</h3>
                            <p className="text-gray-600">Web Developer</p>
                            {/* Social Media Links */}
                            <div className="flex space-x-4 my-4 justify-center">
                                <a href="https://www.linkedin.com/in/rodrigomcobos/" target="_blank" rel="noreferrer" className="hover:text-blue-700">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                                    <FaBehance size={20} />
                                </a>
                                <a href="https://github.com/rodrigomcobos" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                                    <FaGithub size={20} />
                                </a>
                            </div>
                            <p className="text-gray-600 mt-2">Web developer that coded this website. Rodrigo has poured a lot of time and effort creating this project utilizing the PERN stack and TailwindCSS for styling.</p>
                        </div>
                        {/* Team Card 2 */}
                        <div className="text-center">
                            <img src={SeanPhoto} alt="team member" className="w-[10rem] h-[10rem] rounded-full mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">Sean Fagan</h3>
                            <p className="text-gray-600">DevMountain - Instructor</p>
                            {/* Social Media Links */}
                            <div className="flex space-x-4 my-4 justify-center">
                                <a href="https://www.linkedin.com/in/sean-p-fagan/" target="_blank" rel="noreferrer" className="hover:text-blue-700">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="https://github.com/seanthewonderful" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                                    <FaGithub size={20} />
                                </a>
                            </div>
                            <p className="text-gray-600 mt-2">Instructor at DevMountain in Lehi, UT. Sean has been teaching web development since 2023 and has come from a backend engineering background using Python.</p>
                        </div>
                        {/* Team Card 3 */}
                        <div className="text-center">
                            <img src={ScottPhoto} alt="team member" className="w-[10rem] h-[10rem] rounded-full mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">Scott Sutherland</h3>
                            <p className="text-gray-600">DevMountain - Instructor</p>
                            {/* Social Media Links */}
                            <div className="flex space-x-4 my-4 justify-center">
                                <a href="https://www.linkedin.com/in/scott-r-sutherland/" target="_blank" rel="noreferrer" className="hover:text-blue-700">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="https://github.com/suthyscott" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                                    <FaGithub size={20} />
                                </a>
                            </div>
                            <p className="text-gray-600 mt-2">Instructor and mentor at DevMountain in Lehi, UT. Scott has been teaching web development since 2021, and has come from a frontend engineering background.</p>
                        </div>
                    </div>
                </section>

                {/* Separation line */}
                <hr className="border-gray-300" />

                {/* Join us */}
                <section className='py-12'>
                    <h2 className="text-3xl font-semibold mb-4 flex justify-center items-center pb-4">Join us</h2>
                    <div className='flex flex-col justify-center items-center pb-10'>
                        <p className="text-md text-gray-600 mb-4 text-center">
                            Are you ready to help us connect people with the world of live experiences? We’re always on the lookout for candidates who are driven, courageous, inventive, diverse and live the Evento brand. But let's not forget that this company is fictional, sorry there are no jobs. <br />But want to learn web development? Then contact DevMountain <a className='text-indigo-500' href="https://devmountain.com/" target='_blank'>on this link here.</a>
                        </p>
                        <Link to="/contact" className="text-indigo-500 text-xl">
                            Contact Us to Join
                        </Link>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <img src={Team1Photo} alt="Join image 1" className="w-full h-72 object-cover rounded-2xl" />
                        <img src={Team2Photo} alt="Join image 2" className="w-full h-72 object-cover rounded-2xl" />
                        <img src={Team3Photo} alt="Join image 3" className="w-full h-72 object-cover rounded-2xl" />
                    </div>
                </section>

                {/* Thank You */}
                <section className="text-center mt-12">
                    <h2 className="text-3xl font-semibold mb-12">Thank you for Visiting Evento!</h2>
                    <a target='_blank'
                        href="https://github.com/rodrigomcobos/evento--project-1"
                        className="min-w-min px-8 py-4 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Visit this website's repo on GitHub
                    </a>
                </section>
            </div>

        </>
    )
}

export default AboutUs