import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <LoginForm /> */}
    {/* <SignupForm /> */}
    {/* <ProfilePage /> */}
  </StrictMode>,
)
