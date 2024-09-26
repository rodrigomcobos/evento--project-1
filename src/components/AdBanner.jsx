import React from 'react';
import { Link } from 'react-router-dom';
import placeholderImage from '../assets/slides/adbanner.jpg';

const AdBanner = () => {
    return (
        <section className="flex justify-center items-center w-full pb-16 px-4">
            <div
                className="relative w-[72rem] h-[24rem] bg-cover text-white rounded-[2rem] shadow-lg bg-left"
                style={{ backgroundImage: `url(${placeholderImage})` }}
            >
                {/* Text Section */}
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                    <h2 className="text-3xl mb-2 font-bold">Imagine Dragons</h2>
                    <h3 className="text-4xl mb-2 font-extralight">LOOM</h3>
                    <h2 className='text-2xl mb-2'>WORLD TOUR</h2>
                    <p className="text-lg mt-2">with Special Guest <span className="font-bold uppercase">Declan McKenna</span></p>
                    <Link
                        to="/search-results?q=Imagine Dragons"
                        className="mt-8 px-6 py-2 bg-red-500 text-white font-bold text-md rounded-full hover:bg-red-700 transition duration-300"
                    >
                        Get Tickets Today
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AdBanner;