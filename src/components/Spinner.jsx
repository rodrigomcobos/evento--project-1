import React from 'react'

// Spinner images
import Spinner from '../assets/slides/colorspinner.png';
import Logo from '../assets/slides/colorlogo.png';

const SpinnerLogo = () => {
    return (
        <section>
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
                    src={Logo}
                    alt="Logo"
                    className="absolute top-0 left-0 w-full h-full z-10"
                />
            </div>
            <style jsx>{`
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`}</style>
        </section>
    )
}

export default SpinnerLogo