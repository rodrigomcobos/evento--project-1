import React, { useState } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

// Components
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ProfileDetails from '../components/ProfileDetails';
// Strip will handle payment info for secure payment
// import BillingInfo from '../components/BillingInfo';
import MyReviews from '../components/MyReviews';
import UpcomingEvents from '../components/UpcomingEvents';
import PastEvents from '../components/PastEvents';

const ProfilePage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Navbar />

            {/* SIDEBAR SECTION - THIS WILL STAY THE SAME IN ALL PAGES */}
            <div className="flex min-h-screen mt-14 mb-16 max-w-[54rem] mx-auto">
                {/* Left Sidebar */}
                <div className="w-1/4 bg-white p-6 border-r-2 border-gray-100">
                    <div className="flex flex-col items-center">
                        <div className=" mb-4 flex items-center justify-center">
                            <FaUserCircle className="text-blue-500 text-6xl" />
                        </div>
                        <p className="text-xs text-gray-500">Welcome Back!</p>
                        {/* Here will be the user's name */}
                        <h2 className="text-md font-semibold mt-1">Rodrigo Cobos</h2>

                        {/* My Bookings */}
                        <div className="mt-8 w-full">
                            <h3 className="text-gray-700 font-semibold text-sm">My Bookings</h3>
                            <ul className="pl-4 mt-2">
                                <li className="text-gray-600 hover:text-indigo-600 cursor-pointer text-xs">Upcoming Events</li>
                                <li className="text-gray-600 hover:text-indigo-600 cursor-pointer text-xs">Past Events</li>
                            </ul>
                        </div>

                        {/* My Profile */}
                        <div className="mt-8 w-full">
                            <h3 className="text-gray-700 font-semibold text-sm">My Profile</h3>
                            <ul className="pl-4 mt-2">
                                <li className="text-gray-600 hover:text-indigo-600 cursor-pointer text-xs">Profile Details</li>

                                {/* We'll let Stripe handle this */}
                                {/* <li className="text-gray-600 hover:text-indigo-600 cursor-pointe text-xs">Billing Information</li> */}
                                <li className="text-gray-600 hover:text-indigo-600 cursor-pointer text-xs">My Reviews</li>
                            </ul>
                        </div>

                        {/* Sign Out */}
                        <div className="mt-8 flex items-center text-red-400 hover:text-red-700 cursor-pointer">
                            <FaSignOutAlt className="mr-2" />
                            <span>Sign Out</span>
                        </div>
                    </div>
                </div>


                {/* THIS WILL CHANGE DEPENDING ON THE WHICH SIDEBAR TAB IS CLICKED */}
                {/* My Bookings Tab */}
                <UpcomingEvents />
                <PastEvents />
                {/* My Profile Tab */}
                <ProfileDetails />
                <MyReviews />
            </div>
            <Footer />
        </>

    );
};

export default ProfilePage;