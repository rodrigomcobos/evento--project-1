import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../CustomCSS/CustomSlider.css';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const CACHE_KEY = 'homeSliderEvents';

const CATEGORIES = [
    { name: 'Music', id: 'KZFzniwnSyZfZ7v7nJ' },
    { name: 'Sports', id: 'KZFzniwnSyZfZ7v7nE' },
    { name: 'Arts & Theatre', id: 'KZFzniwnSyZfZ7v7na' },
    { name: 'Film', id: 'KZFzniwnSyZfZ7v7nn' },
    { name: 'Miscellaneous', id: 'KZFzniwnSyZfZ7v7n1' },
];

const HomeSlider = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

            if (cachedData && cachedTimestamp) {
                const now = new Date().getTime();
                if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
                    setEvents(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }
            }

            try {
                const fetchedEvents = await Promise.all(CATEGORIES.map(async (category) => {
                    const response = await axios.get('http://localhost:5001/api/ticketmaster/events', {
                        params: {
                            segmentId: category.id,
                            size: 1,
                            sort: 'random'
                        }
                    });
                    return response.data._embedded?.events[0] || null;
                }));

                const validEvents = fetchedEvents.filter(event => event !== null);
                setEvents(validEvents);
                setLoading(false);

                // Cache the fetched data
                localStorage.setItem(CACHE_KEY, JSON.stringify(validEvents));
                localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime().toString());
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const settings = {
        dots: true,
        dotsClass: 'slick-dots',
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        swipeToSlide: true,
        adaptiveHeight: true,
        fade: true,
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className='px-4'>
            <div className="mt-8 max-w-6xl mx-auto">
                <div className="relative max-w-[75rem] h-[27rem] mx-auto rounded-[2rem] overflow-hidden shadow-lg">
                    <Slider {...settings}>
                        {events.map((event, index) => (
                            <div key={index} className="relative h-[27rem] bg-right bg-cover bg-clip-border">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.images[0].url})`, filter: 'brightness(0.7)' }}></div>
                                <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                    {/* Left side content with slanted edge */}
                                    <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 w-1/2 sm:w-[90%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                        <p className='text-white [text-shadow:_0_2px_0_rgb(0_0_0_/25%)]'>{event.classifications[0].segment.name}</p>
                                        <h2 className="text-white [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] text-xl sm:text-3xl font-bold mb-4 mr-14">
                                            {event.name}
                                        </h2>
                                        <Link to={`/event/${event.id}`} className="w-auto max-w-fit text-md px-6 py-2 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">
                                            <div className='flex align-middle justify-center items-center sm:px-2'>
                                                See Tickets
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Right side content */}
                                    <div className="w-screen h-full relative flex items-center justify-end pr-20 sm:pr-6">
                                        <div className="absolute bottom-5 right-5 text-sm bg-black bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center z-10">
                                            <FaCalendarAlt className="mr-2" />
                                            {new Date(event.dates.start.dateTime).toLocaleDateString()}
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