import React from 'react';
import backgroundImage from '../assets/slides/loginbackground.png';
import transparentLogo from '../assets/slides/transparentlogo.png';
import Spinner from '../assets/slides/spinner.png';
import SpinnerLogo from '../assets/slides/whitelogo.png';

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
            {/* Transparent Logo */}
            <img
                src={transparentLogo}
                alt="Logo"
                className="absolute bottom-10 right-10 z-0 w-[30%] h-auto"
            />
            {/* Spinner Container */}
            <div className="relative w-[10%] h-[10%]">
                {/* Spinning Background */}
                <img
                    src={Spinner}
                    alt="Spinner"
                    className="absolute top-0 left-0 w-full h-full animate-spin"
                    style={{ animation: 'spin 2s linear infinite' }}
                />
                {/* Static Logo */}
                <img
                    src={SpinnerLogo}
                    alt="Logo"
                    className="absolute top-0 left-0 w-full h-full z-10"
                />
            </div>
            <style jsx="true">{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default LoadingPage;