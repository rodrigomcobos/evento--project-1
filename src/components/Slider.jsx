import React from 'react';
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
                <div className="relative max-w-[75rem] h-[27rem] mx-auto rounded-2xl overflow-hidden shadow-lg">
                    <Slider {...settings}>
                        {/* Slide 1 */}
                        <div className="relative h-[27rem] bg-right bg-cover bg-clip-border bg-image-1">
                            <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                {/* Left side content with slanted edge */}
                                <div className="bg-gradient-to-r from-indigo-900 via-blue-500 to-blue-400 w-1/2 sm:w-[80%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                    <p className='text-white'>Concerts</p>
                                    <h2 className="text-white text-xl sm:text-3xl font-bold mb-4 mr-5">
                                        Salt Lake City Annual Music Festival
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white font-bold hover:text-indigo-900 transition duration-300">
                                        <div className='flex align-middle justify-center items-center sm:px-2'>
                                            See Tickets
                                        </div>
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end pr-20 sm:pr-6">
                                    {/* Likes count */}
                                    <div className="absolute top-4 text-[0.6rem] bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center z-10">
                                        2.1K <FaRegStar className="ml-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2 */}
                        <div className="relative h-[27rem] bg-right bg-cover bg-clip-border bg-image-2">
                            <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                {/* Left side content with slanted edge */}
                                <div className="bg-gradient-to-r from-indigo-900 via-blue-500 to-blue-400 w-1/2 sm:w-[80%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                    <p className='text-white'>Sports</p>
                                    <h2 className="text-white text-xl sm:text-3xl font-bold mb-4 mr-5">
                                        FIFA Worldcup Championship Semi-Finals
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white font-bold hover:text-indigo-900 transition duration-300">
                                        <div className='flex align-middle justify-center items-center sm:px-2'>
                                            See Tickets
                                        </div>
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end pr-20 sm:pr-6">
                                    {/* Likes count */}
                                    <div className="absolute top-4 text-[0.6rem] bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center z-10">
                                        2.1K <FaRegStar className="ml-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 3 */}
                        <div className="relative h-[27rem] bg-right bg-cover bg-clip-border bg-image-3">
                            <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                {/* Left side content with slanted edge */}
                                <div className="bg-gradient-to-r from-indigo-900 via-blue-500 to-blue-400 w-1/2 sm:w-[80%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                    <p className='text-white'>Rodeo</p>
                                    <h2 className="text-white text-xl sm:text-3xl font-bold mb-4 mr-5">
                                        PBR National Rodeo 2025
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white font-bold hover:text-indigo-900 transition duration-300">
                                        <div className='flex align-middle justify-center items-center sm:px-2'>
                                            See Tickets
                                        </div>
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end pr-20 sm:pr-6">
                                    {/* Likes count */}
                                    <div className="absolute top-4  text-[0.6rem] bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center z-10">
                                        2.1K <FaRegStar className="ml-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 4 */}
                        <div className="relative h-[27rem] bg-right bg-cover bg-clip-border bg-image-4">
                            <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                {/* Left side content with slanted edge */}
                                <div className="bg-gradient-to-r from-indigo-900 via-blue-500 to-blue-400 w-1/2 sm:w-[80%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                    <p className='text-white'>Racing</p>
                                    <h2 className="text-white text-xl sm:text-3xl font-bold mb-4 mr-5">
                                        NASCAR National Championship Finals
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white font-bold hover:text-indigo-900 transition duration-300">
                                        <div className='flex align-middle justify-center items-center sm:px-2'>
                                            See Tickets
                                        </div>
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end pr-20 sm:pr-6">
                                    {/* Likes count */}
                                    <div className="absolute top-4 text-[0.6rem] bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center z-10">
                                        2.1K <FaRegStar className="ml-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 5 */}
                        <div className="relative h-[27rem] bg-right bg-cover bg-clip-border bg-image-5">
                            <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                {/* Left side content with slanted edge */}
                                <div className="bg-gradient-to-r from-indigo-900 via-blue-500 to-blue-400 w-1/2 sm:w-[80%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                    <p className='text-white'>Wrestling</p>
                                    <h2 className="text-white text-xl sm:text-3xl font-bold mb-4 mr-5">
                                        Wrestlemania 2025 - Salt Lake City Stadium
                                    </h2>
                                    <button className="w-auto max-w-fit text-xs px-6 py-2 border border-white text-white rounded-full hover:bg-white font-bold hover:text-indigo-900 transition duration-300">
                                        <div className='flex align-middle justify-center items-center sm:px-2'>
                                            See Tickets
                                        </div>
                                    </button>
                                </div>

                                {/* Right side content */}
                                <div className="w-screen h-full relative flex items-center justify-end pr-20 sm:pr-6">
                                    {/* Likes count */}
                                    <div className="absolute top-4 text-[0.6rem] bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center z-10">
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