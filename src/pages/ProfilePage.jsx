import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaTicketAlt, FaRegIdCard } from 'react-icons/fa';
import { getUserProfile, signOut } from '../redux/userSlice';

// Components
import SearchNavBar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import ProfileDetails from '../components/ProfileDetails';
import BillingInfo from '../components/BillingInfo';
import MyReviews from '../components/MyReviews';
import UpcomingEvents from '../components/UpcomingEvents';
import PastEvents from '../components/PastEvents';

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('UpcomingEvents');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const resultAction = await dispatch(getUserProfile());
                if (getUserProfile.rejected.match(resultAction)) {
                    // If rejected due to 401, redirect to login
                    navigate('/login');
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                navigate('/login');
            }
        };

        fetchProfile();
    }, [dispatch, navigate]);

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'UpcomingEvents':
                return <UpcomingEvents />;
            case 'PastEvents':
                return <PastEvents />;
            case 'ProfileDetails':
                return <ProfileDetails />;
            case 'BillingInfo':
                return <BillingInfo />;
            case 'MyReviews':
                return <MyReviews />;
            default:
                return <UpcomingEvents />;
        }
    };

    const handleSignOut = async () => {
        try {
            await dispatch(signOut()).unwrap();
            navigate('/');
        } catch (error) {
            console.error('Failed to sign out:', error);
            setError('Failed to sign out. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentUser) return <div>Please sign in to view this page.</div>;

    return (
        <>
            <SearchNavBar />

            {/* SIDEBAR SECTION */}
            <div className="flex min-h-screen mt-14 mb-14 max-w-6xl mx-auto">
                {/* Left Sidebar */}
                <div className="w-1/4 bg-white p-6 border-r-2 border-gray-100">
                    <div className="flex flex-col items-center">
                        <div className=" mb-4 flex items-center justify-center">
                            <FaUserCircle className="text-blue-500 text-6xl" />
                        </div>
                        <p className="text-md text-gray-500">Welcome Back!</p>
                        {/* User's Name */}
                        <h2 className="text-2xl font-semibold mt-1">{currentUser.first_name} {currentUser.last_name}</h2>

                        {/* My Bookings */}
                        <div className="mt-8 w-full flex justify-center flex-col">
                            <div className='flex items-center gap-2'>
                                <FaTicketAlt className="text-gray-500 text-2xl" />
                                <h3 className="text-gray-700 font-semibold text-lg">My Bookings</h3>
                            </div>
                            <ul className="pl-8 mt-2">
                                <li
                                    className={`text-md cursor-pointer ${activeSection === 'UpcomingEvents' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}
                                    onClick={() => setActiveSection('UpcomingEvents')}
                                >
                                    Upcoming Events
                                </li>
                                <li
                                    className={`text-md cursor-pointer ${activeSection === 'PastEvents' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}
                                    onClick={() => setActiveSection('PastEvents')}
                                >
                                    Past Events
                                </li>
                            </ul>
                        </div>

                        {/* My Profile */}
                        <div className="mt-8 w-full">
                            <div className='flex items-center gap-2'>
                                <FaRegIdCard className="text-gray-500 text-2xl" />
                                <h3 className="text-gray-700 font-semibold text-lg">My Profile</h3>
                            </div>
                            <ul className="pl-8 mt-2">
                                <li
                                    className={`text-md cursor-pointer ${activeSection === 'ProfileDetails' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}
                                    onClick={() => setActiveSection('ProfileDetails')}
                                >
                                    Profile Details
                                </li>
                                <li
                                    className={`text-md cursor-pointer ${activeSection === 'BillingInfo' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}
                                    onClick={() => setActiveSection('BillingInfo')}
                                >
                                    Billing Information
                                </li>
                                <li
                                    className={`text-md cursor-pointer ${activeSection === 'MyReviews' ? 'text-indigo-600 font-semibold' : 'text-gray-600'}`}
                                    onClick={() => setActiveSection('MyReviews')}
                                >
                                    My Reviews
                                </li>
                            </ul>
                        </div>

                        {/* Sign Out Link */}
                        <div className="mt-8 text-lg flex items-center text-red-400 hover:text-red-700 cursor-pointer" onClick={handleSignOut}>
                            <FaSignOutAlt className="mr-2" />
                            <span>Sign Out</span>
                        </div>
                    </div>
                </div>

                {/* THIS WILL CHANGE DEPENDING ON WHICH SIDEBAR TAB IS CLICKED */}
                <div className="w-3/4 p-6">
                    {renderActiveSection()}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProfilePage;