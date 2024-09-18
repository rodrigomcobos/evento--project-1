import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LogInPage from './pages/LogInPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import EventPage from './pages/EventPage.jsx'
import AboutUs from './pages/AboutUs.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import ContactUsPage from './pages/ContactUsPage.jsx'
import ExplorePage from './pages/ExplorePage.jsx'
import SearchResults from './pages/SearchResults.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <HomePage /> */}
    <App />
    {/* <AboutUs /> */}
    {/* <LogInPage /> */}
    {/* <EventPage /> */}
    {/* <ExplorePage /> */}
    {/* <SearchResults /> */}
    {/* <ProfilePage /> */}
    {/* <PaymentPage /> */}
    {/* <ContactUsPage /> */}
  </StrictMode>,
)
