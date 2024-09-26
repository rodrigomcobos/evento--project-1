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
import PageNotFound from './pages/PageNotFound.jsx';
import EventPage from './pages/EventPage.jsx';

// Testing page
import LoadingPage from './components/LoadingPage.jsx';

const routes = [
  { path: '/', component: HomePage },
  { path: '/events', component: ShowAllEvents },
  { path: '/explore', component: ExplorePage },
  { path: '/profile', component: ProfilePage },
  { path: '/login', component: LogInPage },
  { path: '/signup', component: SignUpForm },
  { path: '/contact', component: ContactUsPage },
  { path: '/about', component: AboutUs },
  { path: '/privacy', component: PrivacyPolicy },
  { path: '/purchase-policy', component: PurchasePolicy },
  { path: '/event/:id', component: EventPage },
  { path: '*', component: PageNotFound },

  // Testing page
  { path: '/loading', component: LoadingPage },
];

export default routes;
