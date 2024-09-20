import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import HomePage from './pages/HomePage';
import ShowAllEvents from './pages/ShowAllEvents';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import LogInPage from './pages/LogInPage';  // New parent component for SignIn/SignUp toggle
import SignInPage from './components/SignInForm'
import SignUpPage from './components/SignUpForm'
import ContactUsPage from './pages/ContactUsPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PurchasePolicy from './pages/PurchasePolicy';
import PageNotFound from './pages/PageNotFound';  // Optional: For handling 404 errors

const App = () => {
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
