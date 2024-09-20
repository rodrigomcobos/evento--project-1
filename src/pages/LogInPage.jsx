import React, { useState } from 'react';
import SignInForm from '../components/SignInForm';  // Adjust the path if needed
import SignUpForm from '../components/SignUpForm';

const LogInPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);  // Toggle between SignIn and SignUp
    };

    return (
        <div>
            {isSignIn ? (
                <SignInForm toggleForm={toggleForm} />
            ) : (
                <SignUpForm toggleForm={toggleForm} />
            )}
        </div>
    );
};

export default LogInPage;
