import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Make sure this path is correct
import { getUserProfile } from './redux/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

// Import page components
import HomePage from './pages/HomePage';
import ShowAllEvents from './pages/ShowAllEvents';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import LogInPage from './pages/LogInPage';
import SignInPage from './components/SignInForm';
import SignUpPage from './components/SignUpForm';
import ContactUsPage from './pages/ContactUsPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PurchasePolicy from './pages/PurchasePolicy';
import PageNotFound from './pages/PageNotFound';
import SearchResults from './pages/SearchResults';

// Testing page
import TicketmasterTest from './components/TicketmasterTest';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await dispatch(getUserProfile()).unwrap();
        // console.log('User profile fetched successfully');
      } catch (error) {
        // console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [dispatch]);



  return (
    <>
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
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Testing page */}
        <Route path="/ticketmaster" element={<TicketmasterTest />} />

      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;