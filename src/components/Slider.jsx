// Slider.jsx
import React from 'react';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CustomCSS/CustomSlider.css'; // Import the custom CSS
import image from '../assets/slides/slide-1.jpg'

console.log(image)

const CustomSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
    };

    return (
        <div className="w-full h-auto mt-8 px-4">
            <div className="relative max-w-[75rem] mx-auto rounded-lg overflow-hidden shadow-lg">
                <Slider {...settings}>

                    {/* Slide 1 */}
                    <div className="relative h-[27rem] flex bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                        <div className="absolute inset-0 flex">

                            {/* Left side content */}
                            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 w-1/2 h-full flex flex-col justify-center p-8">
                                <h2 className="text-white text-3xl font-bold mb-4">Salt Lake City Festival</h2>
                                <button className="w-1/2 text-sm px-6 py-2 border border-white text-white rounded-2xl hover:bg-white hover:text-indigo-900 transition">
                                    See Tickets
                                </button>
                            </div>

                            {/* Right side image */}
                            <div className="w-screen h-full relative flex items-center justify-end">

                                {/* Likes count */}
                                <div className="absolute top-4 right-6 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                                    2.1K <FaStar className="ml-2 text-yellow-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="relative h-[27rem] flex bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                        <div className="absolute inset-0 flex">

                            {/* Left side content */}
                            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 w-1/2 h-full flex flex-col justify-center p-8">
                                <h2 className="text-white text-3xl font-bold mb-4">Salt Lake City Festival</h2>
                                <button className="w-1/2 text-sm px-6 py-2 border border-white text-white rounded-2xl hover:bg-white hover:text-indigo-900 transition">
                                    See Tickets
                                </button>
                            </div>

                            {/* Right side image */}
                            <div className="w-screen h-full relative flex items-center justify-end">

                                {/* Likes count */}
                                <div className="absolute top-4 right-6 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                                    2.1K <FaStar className="ml-2 text-yellow-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="relative h-[27rem] flex bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                        <div className="absolute inset-0 flex">

                            {/* Left side content */}
                            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 w-1/2 h-full flex flex-col justify-center p-8">
                                <h2 className="text-white text-3xl font-bold mb-4">Salt Lake City Festival</h2>
                                <button className="w-1/2 text-sm px-6 py-2 border border-white text-white rounded-2xl hover:bg-white hover:text-indigo-900 transition">
                                    See Tickets
                                </button>
                            </div>

                            {/* Right side image */}
                            <div className="w-screen h-full relative flex items-center justify-end">

                                {/* Likes count */}
                                <div className="absolute top-4 right-6 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                                    2.1K <FaStar className="ml-2 text-yellow-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 4 */}
                    <div className="relative h-[27rem] flex bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                        <div className="absolute inset-0 flex">

                            {/* Left side content */}
                            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 w-1/2 h-full flex flex-col justify-center p-8">
                                <h2 className="text-white text-3xl font-bold mb-4">Salt Lake City Festival</h2>
                                <button className="w-1/2 text-sm px-6 py-2 border border-white text-white rounded-2xl hover:bg-white hover:text-indigo-900 transition">
                                    See Tickets
                                </button>
                            </div>

                            {/* Right side image */}
                            <div className="w-screen h-full relative flex items-center justify-end">

                                {/* Likes count */}
                                <div className="absolute top-4 right-6 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center">
                                    2.1K <FaStar className="ml-2 text-yellow-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default CustomSlider;