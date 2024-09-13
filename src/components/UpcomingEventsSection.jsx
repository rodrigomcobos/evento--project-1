import React from 'react'
import { FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';
import placeholderImage from '../assets/slides/placeholder.png';

const UpcomingEventsSection = () => {
    // TEST-DATA
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
        <>{/* Upcoming Events Section */}
            <section className="max-w-6xl mx-auto mb-14">
                <div className=" mx-auto">
                    {/* Title and Location Button */}
                    <div className="flex items-center justify-between px-4 mb-8">
                        <h2 className="text-2xl font-bold">Upcoming Events</h2>
                        <a href="#upcoming-events" className="hover:text-indigo-500 transition duration-300 text-md font-bold">
                            See all upcoming events
                        </a>
                    </div>

                    {/* Upcoming Events Cards Grid */}
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12 px-10 ">
                            {upcoming.map((event, index) => (

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

                                        {/* Seat Details */}
                                        <div className="flex items-center justify-between text-md pb-14">
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
                    </section>

                </div>
            </section>
        </>
    )
}

export default UpcomingEventsSection