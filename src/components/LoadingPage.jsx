import React from 'react';
import backgroundImage from '../assets/slides/loginbackground.png';
import { ImSpinner2 } from 'react-icons/im';

const LoadingPage = () => {
    return (
        <div
            className="w-screen h-screen flex items-center justify-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Spinner */}
            <ImSpinner2 className="text-white text-6xl animate-spin" />
        </div>
    );
};

export default LoadingPage;