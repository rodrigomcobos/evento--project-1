// src/routes.js
import HomePage from './pages/HomePage.jsx';
import ShowAllEvents from './pages/ShowAllEvents.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
import ContactUsPage from './pages/ContactUsPage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import PurchasePolicy from './pages/PurchasePolicy.jsx';
import PageNotFound from './pages/PageNotFound.jsx'; // Optional: For handling 404 errors

const routes = [
  { path: '/', component: HomePage },
  { path: '/events', component: ShowAllEvents }, // Updated route with dynamic category
  { path: '/explore', component: ExplorePage },
  { path: '/profile', component: ProfilePage },
  { path: '/login', component: LogInPage },
  { path: '/signup', component: SignUpForm },
  { path: '/contact', component: ContactUsPage },
  { path: '/about', component: AboutUs },
  { path: '/privacy', component: PrivacyPolicy },
  { path: '/purchase-policy', component: PurchasePolicy },
  { path: '*', component: PageNotFound }, // Optional: Catch-all for undefined routes
];

export default routes;
