import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import EventPage from './pages/EventPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <HomePage /> */}
    {/* <App /> */}
    {/* <LoginForm /> */}
    <SignupForm />
    {/* <EventPage /> */}
    {/* <ProfilePage /> */}
  </StrictMode>,
)
