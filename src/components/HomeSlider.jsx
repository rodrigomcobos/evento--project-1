import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaRegStar, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CustomCSS/CustomSlider.css';

const HomeSlider = () => {
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

    const slides = [
        {
            category: 'Concerts',
            title: 'Salt Lake City Annual Music Festival',
            image: 'bg-image-1',
            likes: '2.1K',
        },
        {
            category: 'Sports',
            title: 'FIFA World Cup Championship Semi-Finals',
            image: 'bg-image-2',
            likes: '2.1K',
        },
        {
            category: 'Racing',
            title: 'PBR National Rodeo 2025',
            image: 'bg-image-3',
            likes: '2.1K',
        },
        {
            category: 'Tech',
            title: 'NASCAR National Championship Finals',
            image: 'bg-image-4',
            likes: '2.1K',
        },
        {
            category: 'Music',
            title: 'Wrestlemania 2025 - Salt Lake City Stadium',
            image: 'bg-image-5',
            likes: '2.1K',
        },
    ];

    return (
        <section className='px-4'>
            <div className="mt-8 max-w-6xl mx-auto">
                <div className="relative max-w-[75rem] h-[27rem] mx-auto rounded-[2rem] overflow-hidden shadow-lg">
                    <Slider {...settings}>
                        {slides.map((slide, index) => (
                            <div key={index} className={`relative h-[27rem] bg-right bg-cover bg-clip-border ${slide.image}`}>
                                <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                    {/* Left side content with slanted edge */}
                                    <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 w-1/2 sm:w-[90%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                        <p className='text-white [text-shadow:_0_2px_0_rgb(0_0_0_/25%)]'>{slide.category}</p>
                                        <h2 className="text-white [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] text-xl sm:text-3xl font-bold mb-4 mr-14">
                                            {slide.title}
                                        </h2>
                                        <button className="w-auto max-w-fit text-md px-6 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">
                                            <div className='flex align-middle justify-center items-center sm:px-2'>
                                                See Tickets
                                            </div>
                                        </button>
                                    </div>

                                    {/* Right side content */}
                                    <div className="w-screen h-full relative flex items-center justify-end pr-20 sm:pr-6">
                                        {/* Likes count */}
                                        <div className="absolute top-5 text-sm bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center z-10">
                                            {slide.likes} <FaRegStar className="ml-2 border-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default HomeSlider;