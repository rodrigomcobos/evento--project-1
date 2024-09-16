import React from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import TransparentLogo from '../assets/slides/transparentlogo.png';
import placeholderImage from '../assets/slides/slide-1.png';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';



const BookingConfirmation = () => {
    // Mockup data for testing
    const bookingDetails = {
        eventTitle: 'Music Festival 2024',
        eventImage: placeholderImage,
        date: 'May 18, 2024',
        location: 'Salt Lake City, UT',
        time: '7:00 PM',
        ticketAmount: 2,
        seatZone: 'WM',
        zone: 'Zone W1',
        pricePerTicket: '299',
        totalPrice: '299',
    };

    // Calculate total price
    const totalPrice = bookingDetails.ticketAmount * bookingDetails.pricePerTicket;


    return (
        <>
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">Booking Confirmation</h1>

                    {/* Transparent logo positioned at the bottom right */}
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img
                            src={TransparentLogo}
                            alt="Logo"
                            className="object-cover opacity-25%"
                            style={{
                                position: 'absolute',
                                bottom: '-30px',  // Ensures half of the logo is shown
                                right: '-30px',   // Moves it slightly off-screen
                                width: '50%',
                                maxWidth: '275px', // Control the max size of the logo
                            }}
                        />
                    </div>
                </div>
            </section>

            <div className="flex flex-col md:flex-row mt-14 mb-32 max-w-6xl mx-auto p-6 md:p-10">
                {/* Left Column (Image and Title) */}
                <section className="md:w-2/3 w-full md:pr-8 mb-10 md:mb-0">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-4">{bookingDetails.eventTitle}</h1>
                    <img
                        src={bookingDetails.eventImage}
                        alt="Event"
                        className="w-full h-auto rounded-lg mb-6"
                    />
                </section>

                {/* Right Column (Booking Details) */}
                <section className="md:w-1/3 w-full bg-slate-50 p-6 rounded-lg shadow-inner shadow-gray-400 space-y-4">
                    {/* Date */}
                    <div className='flex items-center mb-2 gap-2'>
                        <FaCalendarAlt />
                        <p className="text-md font-semibold">Date:</p>
                        <p className="text-gray-600">{bookingDetails.date}</p>
                    </div>

                    {/* Time */}
                    <div className='flex items-center mb-2 gap-2'>
                        <FaClock />
                        <p className="text-md font-semibold">Time:</p>
                        <p className="text-gray-600">{bookingDetails.time}</p>
                    </div>

                    {/* location */}
                    <div className='flex items-center mb-2 gap-2'>
                        <FaMapMarkerAlt />
                        <p className="text-md font-semibold">Location</p>
                        <p className="text-gray-600">{bookingDetails.location}</p>
                    </div>

                    {/* Ticket Amount */}
                    <div className='flex items-center mb-2 gap-2'>
                        <FaTicketAlt />
                        <p className="text-md font-semibold">Tickets:</p>
                        <p className="text-gray-600">{bookingDetails.ticketAmount}</p>
                    </div>

                    {/* Price per Ticket */}
                    <div>
                        <p className="text-md font-semibold">Price per Ticket:</p>
                        <p className="text-gray-600">${bookingDetails.pricePerTicket}</p>
                    </div>

                    {/* Seat Zone */}
                    <div className='flex items-center mb-2 gap-2'>
                        <p className="text-md font-semibold">Seat Zone:</p>
                        <p className="text-gray-600">{bookingDetails.seatZone}</p>
                    </div>

                    {/* Zone */}
                    <div>
                        <p className="text-md font-semibold">Zone:</p>
                        <p className="text-gray-600">{bookingDetails.zone}</p>
                    </div>

                    {/* Total Price */}
                    <div>
                        <p className="text-md font-semibold">Total Price:</p>
                        <p className="text-xl font-bold text-green-600">${totalPrice}</p>
                    </div>

                    {/* Checkout Button */}
                    <button className="min-w-min px-8 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full">
                        Checkout
                    </button>
                </section>
            </div>
        </>
    )
}

export default BookingConfirmation