import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { getUserProfile } from './redux/userSlice';

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
import EventPage from './pages/EventPage';

// Testing page
import TicketmasterTest from './components/TicketmasterTest';
import LoadingPage from './components/LoadingPage';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await dispatch(getUserProfile()).unwrap();
      } catch (error) {
        // Handle error if needed
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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login/*" element={<LogInPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/purchase-policy" element={<PurchasePolicy />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/event/:id" element={<EventPage />} /> {/* Add the new route for EventPage */}
        <Route path="*" element={<PageNotFound />} />

        {/* Testing page */}
        <Route path="/ticketmaster" element={<TicketmasterTest />} />
        <Route path="/loading" element={<LoadingPage />} />
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