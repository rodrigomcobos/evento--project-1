import React from 'react';
import placeholderImage from '../assets/slides/adbanner.jpg';

const AdBanner = () => {
    return (
        <div className="flex justify-center items-center w-full pb-16 px-4">
            <div
                className="relative w-[54rem] h-[20rem] bg-cover bg-center text-white rounded-2xl shadow-lg"
                style={{ backgroundImage: `url(${placeholderImage})` }}
            >
                {/* Text Section */}
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                    <h2 className="text-3xl font-bold">Imagine Dragons</h2>
                    <h3 className="text-2xl">LOOM</h3>
                    <h2 className='text-lg font-light'>WORLD TOUR</h2>
                    <p className="text-sm mt-2">with Special Guest <span className="font-bold uppercase">Declan McKenna</span></p>
                    <p className="text-md mt-2 font-bold">Sat 26th July 2025</p>
                    <p className="text-md mt-2">Salt Lake City Stadium Utah</p>
                    <button className="mt-4 px-6 py-2 bg-red-500 text-white font-bold text-sm rounded-full hover:bg-red-700 transition duration-300">
                        Get Tickets Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdBanner;