import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import TransparentLogo from '../assets/slides/transparentlogo.png';

const BookingConfirmation = ({ bookingDetails, onConfirm }) => {
    if (!bookingDetails) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4">No booking details available</h2>
                <p className="text-gray-600">Please go back and select an event.</p>
            </div>
        );
    }

    const {
        eventName,
        eventDate,
        eventTime,
        eventLocation,
        eventImage,
        tickets,
        seatZone,
        zoneNumber,
        ticketPrice,
        totalPrice
    } = bookingDetails;

    return (
        <>
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">Booking Confirmation</h1>
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img
                            src={TransparentLogo}
                            alt="Logo"
                            className="object-cover opacity-25"
                            style={{
                                position: 'absolute',
                                bottom: '-30px',
                                right: '-30px',
                                width: '50%',
                                maxWidth: '275px',
                            }}
                        />
                    </div>
                </div>
            </section>

            <div className="flex flex-col md:flex-row mt-14 mb-32 max-w-6xl mx-auto p-6 md:p-10">
                {/* Left Column (Image and Title) */}
                <section className="md:w-2/3 w-full md:pr-8 mb-10 md:mb-0">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-4">{eventName}</h1>
                    {eventImage && (
                        <img
                            src={eventImage}
                            alt={eventName}
                            className="w-full h-auto rounded-lg mb-6"
                        />
                    )}
                </section>

                {/* Right Column (Booking Details) */}
                <section className="md:w-1/3 w-full bg-slate-50 p-6 rounded-lg shadow-inner shadow-gray-400 space-y-4">
                    {/* Date */}
                    <div className='flex items-center mb-2 gap-2'>
                        <FaCalendarAlt />
                        <p className="text-md font-semibold">Date:</p>
                        <p className="text-gray-600">{eventDate}</p>
                    </div>

                    {/* Time */}
                    <div className='flex items-center mb-2 gap-2'>
                        <FaClock />
                        <p className="text-md font-semibold">Time:</p>
                        <p className="text-gray-600">{eventTime}</p>
                    </div>

                    {/* location */}
                    <div className='flex items-center mb-2 gap-2'>
                        <FaMapMarkerAlt />
                        <p className="text-md font-semibold">Location:</p>
                        <p className="text-gray-600">{eventLocation}</p>
                    </div>

                    {/* Ticket Amount */}
                    <div className='flex items-center mb-2 gap-2'>
                        <FaTicketAlt />
                        <p className="text-md font-semibold">Tickets:</p>
                        <p className="text-gray-600">{tickets}</p>
                    </div>

                    {/* Price per Ticket */}
                    <div>
                        <p className="text-md font-semibold">Price per Ticket:</p>
                        <p className="text-gray-600">${ticketPrice.toFixed(2)}</p>
                    </div>

                    {/* Seat Zone */}
                    <div className='flex items-center mb-2 gap-2'>
                        <p className="text-md font-semibold">Seat Zone:</p>
                        <p className="text-gray-600">{seatZone}</p>
                    </div>

                    {/* Zone */}
                    <div>
                        <p className="text-md font-semibold">Zone:</p>
                        <p className="text-gray-600">{zoneNumber}</p>
                    </div>

                    {/* Total Price */}
                    <div>
                        <p className="text-md font-semibold">Total Price:</p>
                        <p className="text-xl font-bold text-green-600">${totalPrice.toFixed(2)}</p>
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={onConfirm}
                        className="w-full px-8 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md hover:shadow-indigo-300 transition rounded-full"
                    >
                        Proceed to Payment
                    </button>
                </section>
            </div>
        </>
    );
};

export default BookingConfirmation;