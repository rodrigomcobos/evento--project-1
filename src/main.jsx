import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import SignInForm from './components/SignInForm.jsx'
import SignUpForm from './components/SignUpForm.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import EventPage from './pages/EventPage.jsx'
import AboutUs from './pages/AboutUs.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import ContactUsPage from './pages/ContactUsPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <HomePage /> */}
    {/* <App /> */}
    {/* <SignInForm /> */}
    {/* <SignUpForm /> */}
    {/* <AboutUs /> */}
    {/* <EventPage /> */}
    {/* <ProfilePage /> */}
    <PaymentPage />
    {/* <ContactUsPage /> */}
  </StrictMode>,
)
