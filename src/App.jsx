import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getUserProfile } from './redux/userSlice'

// Import page components
import HomePage from './pages/HomePage';
import ShowAllEvents from './pages/ShowAllEvents';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import LogInPage from './pages/LogInPage';
import SignInPage from './components/SignInForm'
import SignUpPage from './components/SignUpForm'
import ContactUsPage from './pages/ContactUsPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PurchasePolicy from './pages/PurchasePolicy';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await dispatch(getUserProfile()).unwrap();
        console.log('User profile fetched successfully');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error (e.g., redirect to login page or show an error message)
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<ShowAllEvents />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Use LogInPage for both login and signup */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login/*" element={<LogInPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/purchase-policy" element={<PurchasePolicy />} />
        <Route path="*" element={<PageNotFound />} /> {/* Optional: Catch-all for undefined routes */}
      </Routes>
    </Router>
  );
};

export default App;