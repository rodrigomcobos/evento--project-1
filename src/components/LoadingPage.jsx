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
                className="absolute bottom-10 right-10 z-0 w-auto h-auto max-w-[30%] max-h-[30%]"
            />
            {/* Spinner Container */}
            <div className="relative w-[15vmin] h-[15vmin]">
                {/* Spinning Background */}
                <img
                    src={Spinner}
                    alt="Spinner"
                    className="absolute top-0 left-0 w-full h-full object-contain animate-spin"
                    style={{ animation: 'spin 2s linear infinite' }}
                />
                {/* Static Logo */}
                <img
                    src={SpinnerLogo}
                    alt="Logo"
                    className="absolute top-0 left-0 w-full h-full object-contain z-10"
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