// Slider.jsx
import React, { Component } from 'react';
import Slider from 'react-slick';
import { FaRegStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CustomCSS/CustomSlider.css'; // Import the custom CSS

const CustomSlider = () => {
    const settings = {
        dots: true,
        dotsClass: 'slick-dots',
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        swipeToSlide: true,
        adaptiveHeight: true,
        fade: true,
    };

    return (
        <div className='px-4'>
            <div className="mt-8 max-w-[54rem] mx-auto">
                <div className="relative max-w-[75rem] mx-auto rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-indigo-800 to-blue-400">
                    <Slider {...settings}>
                        {/* Slide 1 */}
                        <div className="relative h-[27rem] bg-right bg-cover bg-clip-border bg-image-1">
                            <div className="absolute inset-0 flex h-auto">
                                {/* Left side content */}
                                <div className="bg-gradient-to-r from-indigo-800 to-blue-400 w-3/4 h-full flex flex-col justify-center p-10">
                                    <p className='text-white'>Concerts</p>
                                    <h2 className="text-white text-3xl font-bold mb-4">
                                        Salt Lake City Annual Music Festival
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white font-bold hover:text-indigo-900 transition duration-300">
                                        See Tickets
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end">
                                    {/* Likes count */}
                                    <div className="absolute text-[0.6rem] top-4 right-6 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                                        2.1K <FaRegStar className="ml-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2 */}
                        <div className="relative h-[27rem] flex bg-cover bg-center bg-image-2">
                            <div className="absolute inset-0 flex">
                                {/* Left side content */}
                                <div className="bg-gradient-to-r from-indigo-800 to-blue-400 w-3/4 h-full flex flex-col justify-center p-10">
                                    <p className='text-white'>Sports</p>
                                    <h2 className="text-white text-3xl font-bold mb-4">
                                        FIFA World Cup Championship 2024
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white font-bold hover:text-indigo-900 transition duration-300">
                                        See Tickets
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end">
                                    {/* Likes count */}
                                    <div className="absolute text-[0.6rem] top-4 right-6 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                                        2.1K <FaRegStar className="ml-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 3 */}
                        <div className="relative h-[27rem] flex bg-cover bg-center bg-image-3">
                            <div className="absolute inset-0 flex">
                                {/* Left side content */}
                                <div className="bg-gradient-to-r from-indigo-800 to-blue-400 w-3/4 h-full flex flex-col justify-center p-10">
                                    <p className='text-white'>Rodeo</p>
                                    <h2 className="text-white text-3xl font-bold mb-4">
                                        National Rodeo Finals
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white font-bold hover:text-indigo-900 transition duration-300">
                                        See Tickets
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end">
                                    {/* Likes count */}
                                    <div className="absolute text-[0.6rem] top-4 right-6 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                                        2.1K <FaRegStar className="ml-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 4 */}
                        <div className="relative h-[27rem] flex bg-cover bg-center bg-image-4">
                            <div className="absolute inset-0 flex">
                                {/* Left side content */}
                                <div className="bg-gradient-to-r from-indigo-800 to-blue-400 w-3/4 h-full flex flex-col justify-center p-10">
                                    <p className='text-white'>Racing</p>
                                    <h2 className="text-white text-3xl font-bold mb-4">
                                        Nascar National Championship Semi-Finals
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white  hover:text-indigo-900 font-bold transition duration-300">
                                        See Tickets
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end">
                                    {/* Likes count */}
                                    <div className="absolute text-[0.6rem] top-4 right-6 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                                        2.1K <FaRegStar className="ml-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CustomSlider;
