import React from 'react'
import SearchNavbar from '../components/SearchNavBar'
import Footer from '../components/Footer'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';
import placeholderImage from '../assets/slides/placeholder.png';


const ExplorePage = () => {
    // This will have to be the current location
    const location = 'Lehi';

    // TEST-DATA
    const events = [
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 15 - 4:00PM MDT',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 16 - 4:00PM MDT',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 17 - 4:00PM MDT',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 18 - 4:00PM MDT',

        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 19 - 4:00PM MDT',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 20 - 4:00PM MDT',
        },
    ];

    return (
        <>
            <SearchNavbar />
            <section className='px-4 pb-14 mt-14'>
                <div className="mt-8 max-w-6xl mx-auto">
                    <div className="relative max-w-[75rem] h-[27rem] mx-auto rounded-[2rem] overflow-hidden shadow-lg">
                        <div className='relative h-[27rem] bg-right bg-cover bg-clip-border bg-events-background'>
                            <div className="absolute inset-0 flex flex-col-reverse md:flex-row h-full">
                                {/* Left side content with slanted edge */}
                                <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 w-3/5 sm:w-[50%] h-full flex flex-col justify-center p-6 sm:p-10 clip-slant">
                                    <p className='text-white sm:text-3xl text-lg font-semibold [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] mb-4'>Best Events in</p>
                                    <h2 className="text-white [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] text-4xl sm:text-5xl font-bold mb-4 mr-14">
                                        Sandy
                                    </h2>
                                    <p className='text-white max-w-sm mb-6 [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] text-sm sm:text-[1.05rem]'>
                                        Looking for something to do in {location}? Whether you're a local, new in town or just cruising through we've got loads of great tips and events.
                                    </p>
                                    <button className="w-auto max-w-fit text-md px-6 py-2 min-w-min bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">
                                        <div className='flex align-middle items-center gap-2 sm:px-2'>
                                            <FaMapMarkerAlt />
                                            <p>
                                                {location}
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto mt-24 mb-24">
                {/* Events Near Me Section */}
                {/* Title and Location Button */}
                <section className="flex items-center justify-between px-4 mb-9">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold">Sports</h2>
                    </div>
                    <a href="#all-events" className="hover:text-indigo-500  transition duration-300 text-md font-bold">
                        See all events
                    </a>
                </section>

                {/* Events Cards Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10">
                    {events.map((event, index) => (

                        // Wrap the card in a link
                        <div className='border-[10px] border-white' key={index}>
                            <a href="#" key={index} className="block bg-white rounded-lg hover:text-indigo-600">
                                <img
                                    src={event.image}
                                    alt="Event"
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />

                                {/* Event Title */}
                                <h3 className="font-bold text-lg mb-2">
                                    {event.title}
                                </h3>

                                {/* Hosted By */}
                                <p className="text-sm text-gray-500 mb-4">
                                    Hosted by: {event.hostedBy}
                                </p>

                                {/* Event Date */}
                                <div className="flex items-center mb-2 text-gray-600 text-md">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>{event.date}</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </section>
            </section>

            <section className="max-w-6xl mx-auto mt-24 mb-24">
                {/* Events Near Me Section */}
                {/* Title and Location Button */}
                <section className="flex items-center justify-between px-4 mb-9">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold">Concerts</h2>
                    </div>
                    <a href="#all-events" className="hover:text-indigo-500  transition duration-300 text-md font-bold">
                        See all events
                    </a>
                </section>

                {/* Events Cards Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10">
                    {events.map((event, index) => (

                        // Wrap the card in a link
                        <div className='border-[10px] border-white' key={index}>
                            <a href="#" key={index} className="block bg-white rounded-lg hover:text-indigo-600">
                                <img
                                    src={event.image}
                                    alt="Event"
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />

                                {/* Event Title */}
                                <h3 className="font-bold text-lg mb-2">
                                    {event.title}
                                </h3>

                                {/* Hosted By */}
                                <p className="text-sm text-gray-500 mb-4">
                                    Hosted by: {event.hostedBy}
                                </p>

                                {/* Event Date */}
                                <div className="flex items-center mb-2 text-gray-600 text-md">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>{event.date}</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </section>
            </section>

            <section className="max-w-6xl mx-auto mt-24 mb-24">
                {/* Events Near Me Section */}
                {/* Title and Location Button */}
                <section className="flex items-center justify-between px-4 mb-9">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold">Theater</h2>
                    </div>
                    <a href="#all-events" className="hover:text-indigo-500  transition duration-300 text-md font-bold">
                        See all events
                    </a>
                </section>

                {/* Events Cards Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10">
                    {events.map((event, index) => (

                        // Wrap the card in a link
                        <div className='border-[10px] border-white' key={index}>
                            <a href="#" key={index} className="block bg-white rounded-lg hover:text-indigo-600">
                                <img
                                    src={event.image}
                                    alt="Event"
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />

                                {/* Event Title */}
                                <h3 className="font-bold text-lg mb-2">
                                    {event.title}
                                </h3>

                                {/* Hosted By */}
                                <p className="text-sm text-gray-500 mb-4">
                                    Hosted by: {event.hostedBy}
                                </p>

                                {/* Event Date */}
                                <div className="flex items-center mb-2 text-gray-600 text-md">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>{event.date}</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </section>
            </section>

            <section className="max-w-6xl mx-auto mt-24 mb-24">
                {/* Events Near Me Section */}
                {/* Title and Location Button */}
                <section className="flex items-center justify-between px-4 mb-9">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold">Festivals</h2>
                    </div>
                    <a href="#all-events" className="hover:text-indigo-500  transition duration-300 text-md font-bold">
                        See all events
                    </a>
                </section>

                {/* Events Cards Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10">
                    {events.map((event, index) => (

                        // Wrap the card in a link
                        <div className='border-[10px] border-white' key={index}>
                            <a href="#" key={index} className="block bg-white rounded-lg hover:text-indigo-600">
                                <img
                                    src={event.image}
                                    alt="Event"
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />

                                {/* Event Title */}
                                <h3 className="font-bold text-lg mb-2">
                                    {event.title}
                                </h3>

                                {/* Hosted By */}
                                <p className="text-sm text-gray-500 mb-4">
                                    Hosted by: {event.hostedBy}
                                </p>

                                {/* Event Date */}
                                <div className="flex items-center mb-2 text-gray-600 text-md">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>{event.date}</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </section>
            </section>
            <Footer />
        </>
    )
}

export default ExplorePage