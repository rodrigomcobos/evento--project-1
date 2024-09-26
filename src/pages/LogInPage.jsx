import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const LogInPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            const params = new URLSearchParams(location.search);
            const redirectUrl = params.get('redirect') || '/';
            navigate(redirectUrl);
        }
    }, [currentUser, navigate, location]);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
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