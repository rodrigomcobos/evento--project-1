import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaTicketAlt, FaRegIdCard, FaChevronDown } from 'react-icons/fa';
import { getUserProfile, signOut } from '../redux/userSlice';

// Components
import SearchNavBar from '../components/SearchNavBar';
import ProfileDetails from '../components/ProfileDetails';
import BillingInfo from '../components/BillingInfo';
import MyReviews from '../components/MyReviews';
import UpcomingEvents from '../components/UpcomingEvents';
import PastEvents from '../components/PastEvents';

const ProfilePage = () => {
    // State variables
    const [activeSection, setActiveSection] = useState('UpcomingEvents');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, loading, error } = useSelector((state) => state.user);

    // Fetch user profile on component mount and when the user signs out or signs in
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const resultAction = await dispatch(getUserProfile());
                if (getUserProfile.rejected.match(resultAction)) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                navigate('/login');
            }
        };

        fetchProfile();
    }, [dispatch, navigate]);

    // Function to handle navigation to different sections in the profile page based on the activeSection state
    const renderActiveSection = () => {
        switch (activeSection) {
            case 'Upcoming Events':
                return <UpcomingEvents />;
            case 'Past Events':
                return <PastEvents />;
            case 'Profile Details':
                return <ProfileDetails />;
            // case 'Billing Info':
            //     return <BillingInfo />;
            case 'My Reviews':
                return <MyReviews />;
            default:
                return <UpcomingEvents />;
        }
    };

    // Function to handle sign out and navigate to the home page when the sign out button is clicked
    const handleSignOut = async () => {
        try {
            await dispatch(signOut()).unwrap();
            navigate('/');
        } catch (error) {
            console.error('Failed to sign out:', error);
            setError('Failed to sign out. Please try again.');
        }
    };

    // Function to handle navigation to different sections in the profile page based on the activeSection state
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentUser) return <div>Please sign in to view this page.</div>;

    return (
        <>
            <SearchNavBar />

            <div className="mt-14 mb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="lg:flex lg:gap-x-5">
                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="flex items-center m-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        >
                            Menu
                            <FaChevronDown className={`ml-2 ${mobileMenuOpen ? 'transform rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Sidebar for larger screens, top menu for mobile */}
                    <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block lg:flex-shrink-0 lg:w-64`}>
                        <div className="h-full bg-white p-6 border-r border-gray-200">
                            <div className="flex flex-col items-center mb-6">
                                <FaUserCircle className="text-blue-500 text-6xl mb-4" />
                                <p className="text-sm text-gray-500">Welcome Back!</p>
                                <h2 className="text-xl font-semibold mt-1">{currentUser.first_name} {currentUser.last_name}</h2>
                            </div>

                            <nav className="space-y-1">
                                <div className="mb-4">
                                    <h3 className="text-gray-700 font-semibold mb-2">My Bookings</h3>
                                    <ul className="ml-2 space-y-1">
                                        <li>
                                            <button
                                                onClick={() => setActiveSection('Upcoming Events')}
                                                className={`w-full text-left px-2 py-1 text-sm rounded-md ${activeSection === 'Upcoming Events' ? 'text-indigo-600 bg-indigo-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                Upcoming Events
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => setActiveSection('Past Events')}
                                                className={`w-full text-left px-2 py-1 text-sm rounded-md ${activeSection === 'Past Events' ? 'text-indigo-600 bg-indigo-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                Past Events
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-gray-700 font-semibold mb-2">My Profile</h3>
                                    <ul className="ml-2 space-y-1">
                                        <li>
                                            <button
                                                onClick={() => setActiveSection('Profile Details')}
                                                className={`w-full text-left px-2 py-1 text-sm rounded-md ${activeSection === 'Profile Details' ? 'text-indigo-600 bg-indigo-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                Profile Details
                                            </button>
                                        </li>
                                        {/* <li>
                                            <button
                                                onClick={() => setActiveSection('Billing Info')}
                                                className={`w-full text-left px-2 py-1 text-sm rounded-md ${activeSection === 'Billing Info' ? 'text-indigo-600 bg-indigo-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                Billing Information
                                            </button>
                                        </li> */}
                                        <li>
                                            <button
                                                onClick={() => setActiveSection('My Reviews')}
                                                className={`w-full text-left px-2 py-1 text-sm rounded-md ${activeSection === 'My Reviews' ? 'text-indigo-600 bg-indigo-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                My Reviews
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
                                >
                                    <FaSignOutAlt className="mr-3 h-4 w-4" />
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main content area */}
                    <div className="mt-5 lg:mt-0 lg:flex-grow">
                        <div className="bg-white overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-indigo-500">
                                    {activeSection}
                                </h3>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                {renderActiveSection()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;