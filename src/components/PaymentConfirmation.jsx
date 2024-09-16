import React from 'react'
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

import '../CustomCSS/CustomSlider.css';
import TransparentLogo from '../assets/slides/transparentlogo.png';
import placeholderImage from '../assets/slides/slide-1.png';


const PaymentConfirmation = () => {
    const today = new Date().toLocaleDateString();
    const billingAddress = {
        streetAddress: '123 Main St',
        city: 'Anytown',
        state: 'UT',
        zipCode: '12345',
    }
    const confirmation = {
        confirmationNumber: '123456789',
        customerName: 'John Doe',
        billingAddress: '123 Main St, Anytown, USA',
        ticketAmount: 2,
        seatZone: 'WM',
        zone: 'Zone W1',
        totalPrice: 299,
        eventTitle: 'Music Festival 2024',
        eventDate: 'May 18, 2024',
        eventTime: '7:00 PM',
        eventLocation: 'Salt Lake City, UT',
    }

    return (
        <>
            {/* Payment Strip */}
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">Payment Confirmation</h1>

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

            <section className="max-w-7xl px-4 mx-auto p-6 md:px-20 md:py-10 flex flex-col md:flex-row gap-10 mb-24 mt-14">
                {/* Left Column (Wider) */}
                <div className="md:w-2/3 w-full p-6">
                    <h2 className="text-3xl font-bold mb-4">Thank you for your order!</h2>

                    {/* Confirmation Number */}
                    <p className="text-lg mb-2">Confirmation Number: <span className="font-semibold">{confirmation.confirmationNumber}</span></p>

                    {/* Order Date */}
                    <p className="text-lg mb-2">Order Date: <span className="font-semibold">{today}</span></p>

                    {/* Customer Name */}
                    <p className="text-lg mb-4">Customer: <span className="font-semibold">{confirmation.customerName}</span></p>

                    {/* Information Paragraph */}
                    <p className="text-gray-600 mb-6">
                        Please keep the above numbers for your reference. We'll also send a confirmation to the email address you used for this order.
                        If there are any questions or concerns about this order, please contact us.
                    </p>

                    {/* Separation Line */}
                    <hr className="my-6" />

                    {/* Billing Address */}
                    <div className='flex gap-4 mb-14'>
                        <p className="text-lg mb-6">Billing Address:</p>
                        <div>
                            <p className="font-semibold">{billingAddress.streetAddress}</p>
                            <p className="font-semibold">{billingAddress.city}, {billingAddress.state}</p>
                            <p className="font-semibold">{billingAddress.zipCode}</p>
                        </div>

                    </div>

                    {/* Continue Shopping Button */}
                    <button className="px-6 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md rounded-full transition">
                        Continue Shopping
                    </button>
                </div>

                {/* Right Column (Order Summary) */}
                <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-lg shadow-inner shadow-gray-400">
                    <h3 className="text-2xl font-bold mb-4">Order Summary</h3>

                    {/* Ticket Amount, Seat Zone, Zone */}
                    <p className="text-lg mb-2">Ticket Amount: <span className="font-semibold">{confirmation.ticketAmount}</span></p>
                    <p className="text-lg mb-2">Seat Zone: <span className="font-semibold">{confirmation.seatZone}</span></p>
                    <p className="text-lg mb-2">Zone: <span className="font-semibold">{confirmation.zone}</span></p>

                    {/* Total Price */}
                    <p className="text-lg mb-6">Total: <span className="font-semibold">{confirmation.totalPrice}</span></p>

                    {/* Separation Line */}
                    <hr className="my-6" />

                    {/* Tickets Ordered */}
                    <h3 className="text-2xl font-semibold mb-4">Tickets Ordered</h3>

                    {/* Event Title */}
                    <p className="text-lg font-semibold mb-2">{confirmation.eventTitle}</p>

                    {/* Event Image */}
                    <img
                        src={placeholderImage}
                        alt="Event"
                        className="w-full h-auto rounded-lg mb-4"
                    />

                    {/* Event Details (Date, Time, Location) */}
                    <div className="flex items-center mb-2">
                        <FaCalendarAlt className="text-indigo-600" />
                        <span className="ml-2 text-md">{confirmation.eventDate}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaClock className="text-indigo-600" />
                        <span className="ml-2 text-md">{confirmation.eventTime}</span>
                    </div>
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="text-indigo-600" />
                        <span className="ml-2 text-md">{confirmation.eventLocation}</span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PaymentConfirmation