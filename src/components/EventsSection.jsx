import React from 'react';
import { FaEdit, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';
import placeholderImage from '../assets/slides/placeholder.png';

const EventsSection = () => {

    // TEST-DATA
    const events = [
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 15 - 4:00PM MDT',
            seatsLeft: 10,
            ticketPrice: 'Free',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 16 - 4:00PM MDT',
            seatsLeft: 15,
            ticketPrice: 'Free',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 17 - 4:00PM MDT',
            seatsLeft: 8,
            ticketPrice: 'Free',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 18 - 4:00PM MDT',
            seatsLeft: 20,
            ticketPrice: 'Free',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 19 - 4:00PM MDT',
            seatsLeft: 5,
            ticketPrice: 'Free',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 20 - 4:00PM MDT',
            seatsLeft: 12,
            ticketPrice: 'Free',
        },
    ];

    const upcoming = [
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 15 - 4:00PM MDT',
            seatsLeft: 10,
            ticketPrice: 'Free',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 16 - 4:00PM MDT',
            seatsLeft: 15,
            ticketPrice: 'Free',
        },
        {
            image: placeholderImage,
            title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
            hostedBy: 'Devmountain Web Developers Social Club',
            date: 'Sep 17 - 4:00PM MDT',
            seatsLeft: 8,
            ticketPrice: 'Free',
        },
    ];

    return (
        <div className='px-4 max-w-[58rem] mx-auto'>

            {/* Events Near Me Section */}
            <section className="w-auto mt-24">
                <div className=" mx-auto">
                    {/* Title and Location Button */}
                    <div className="flex items-center justify-between px-4 mb-6">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-lg font-bold">Events near</h2>
                            <button className="text-indigo-500 border-2 border-indigo-500 rounded-full px-4 py-2 flex items-center hover:bg-gradient-to-r from-indigo-600 to-blue-400 hover:text-white font-bold transition duration-300 text-xs w-auto">
                                Lehi, UT <FaEdit className="ml-2" />
                            </button>
                        </div>
                        <a href="#all-events" className="hover:text-indigo-500  transition duration-300 text-xs font-bold">
                            See all events
                        </a>
                    </div>

                    {/* Events Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 px-8">
                        {events.map((event, index) => (

                            // Wrap the card in a link
                            <div className='border-[10px] border-white'>
                                <a href="#" key={index} className="block bg-white rounded-lg hover:text-indigo-600">
                                    <img
                                        src={event.image}
                                        alt="Event"
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />

                                    {/* Event Title */}
                                    <h3 className="font-bold text-sm mb-2 ">
                                        {event.title}
                                    </h3>

                                    {/* Hosted By */}
                                    <p className="text-xs text-gray-500 mb-4">
                                        Hosted by: {event.hostedBy}
                                    </p>

                                    {/* Event Date */}
                                    <div className="flex items-center mb-2 text-gray-600 text-xs">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>{event.date}</span>
                                    </div>

                                    {/* Seat Details */}
                                    <div className="flex items-center justify-between text-xs pb-14">
                                        <div className="flex items-center text-red-500">
                                            <MdEventSeat className="mr-1" />
                                            {event.seatsLeft} Seats Left
                                        </div>

                                        {/* Ticket Price */}
                                        <div className="flex items-center text-green-500">
                                            <FaTicketAlt className="mr-1" />
                                            {event.ticketPrice}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Upcoming Events Section */}
            <section className="w-auto mt-12 mb-16">
                <div className=" mx-auto">
                    {/* Title and Location Button */}
                    <div className="flex items-center justify-between px-4 mb-6">
                        <h2 className="text-lg font-bold">Upcoming Events</h2>
                        <a href="#upcoming-events" className="hover:text-indigo-500 transition duration-300 text-xs font-bold">
                            See all events
                        </a>
                    </div>

                    {/* Events Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10 ">
                        {upcoming.map((event, index) => (

                            // Wrap the card in a link
                            <div className='border-[10px] border-white'>
                                <a href="#" key={index} className="block bg-white rounded-lg hover:text-indigo-600">
                                    <img
                                        src={event.image}
                                        alt="Event"
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />

                                    {/* Event Title */}
                                    <h3 className="font-bold text-sm mb-2">
                                        {event.title}
                                    </h3>

                                    {/* Hosted By */}
                                    <p className="text-xs text-gray-500 mb-4">
                                        Hosted by: {event.hostedBy}
                                    </p>

                                    {/* Event Date */}
                                    <div className="flex items-center mb-2 text-gray-600 text-xs">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>{event.date}</span>
                                    </div>

                                    {/* Seat Details */}
                                    <div className="flex items-center justify-between text-xs pb-14">
                                        <div className="flex items-center text-red-500">
                                            <MdEventSeat className="mr-1" />
                                            {event.seatsLeft} Seats Left
                                        </div>

                                        {/* Ticket Price */}
                                        <div className="flex items-center text-green-500">
                                            <FaTicketAlt className="mr-1" />
                                            {event.ticketPrice}
                                        </div>
                                    </div>
                                </a>
                            </div>

                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventsSection;