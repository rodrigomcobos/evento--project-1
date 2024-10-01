import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import TransparentLogo from '../assets/slides/transparentlogo.png';

const api = axios.create({
    baseURL: 'http://localhost:5001',
    withCredentials: true,
});

const PaymentConfirmation = ({ paymentDetails }) => {
    const dispatch = useDispatch();
    // console.log("Received payment details:", paymentDetails);

    if (!paymentDetails) {
        return <div>No payment details available</div>;
    }

    useEffect(() => {
        const saveBooking = async () => {
            try {
                const bookingData = {
                    event_id: paymentDetails.eventId,
                    transaction_id: paymentDetails.transactionId,
                    event_name: paymentDetails.eventName,
                    event_date: paymentDetails.eventDate,
                    event_time: paymentDetails.eventTime,
                    event_location: paymentDetails.eventLocation,
                    ticket_quantity: paymentDetails.tickets,
                    seat_zone: paymentDetails.seatZone,
                    zone_number: paymentDetails.zoneNumber,
                    image_url: paymentDetails.eventImage,
                };

                // console.log('Sending booking data:', bookingData);

                const response = await api.post('/api/bookings', bookingData);
                // console.log('Booking saved successfully:', response.data);
            } catch (error) {
                console.error('Failed to save booking:', error.response?.data || error.message);
            }
        };

        if (paymentDetails) {
            saveBooking();
        }
    }, [paymentDetails]);


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
        totalPrice,
        firstName,
        lastName,
        email,
        phone,
        streetAddress,
        city,
        state,
        zipCode,
        transactionId,
        paymentDate
    } = paymentDetails;

    return (
        <>
            <section className='relative px-4'>
                <div className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 text-white text-center [text-shadow:_0_2px_0_rgb(0_0_0_/25%)] sm:py-24 py-14 mt-8 px-6 max-w-6xl mx-auto rounded-3xl">
                    <h1 className="text-4xl font-bold">Payment Confirmation</h1>
                    <div className="absolute bottom-0 right-0 h-full w-full pointer-events-none overflow-hidden">
                        <img src={TransparentLogo} alt="Logo" className="object-cover opacity-25%" style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '50%', maxWidth: '275px' }} />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl px-4 mx-auto p-6 md:px-20 md:py-10 flex flex-col md:flex-row gap-10 mb-24 mt-14">
                {/* Left Column (Wider) */}
                <div className="md:w-2/3 w-full p-6">
                    <h2 className="text-3xl font-bold mb-4">Thank you for your order!</h2>

                    <p className="text-lg mb-2">Confirmation Number: <span className="font-semibold">{transactionId}</span></p>
                    <p className="text-lg mb-2">Order Date: <span className="font-semibold">{new Date(paymentDate).toLocaleString()}</span></p>
                    <p className="text-lg mb-4">Customer: <span className="font-semibold">{`${firstName} ${lastName}`}</span></p>

                    <p className="text-gray-600 mb-6">
                        Please keep the above numbers for your reference. We'll also send a confirmation to the email address you used for this order.
                        If there are any questions or concerns about this order, please contact us.
                    </p>

                    <hr className="my-6" />

                    <div className='flex gap-4 mb-14'>
                        <p className="text-lg mb-6">Billing Address:</p>
                        <div>
                            <p className="font-semibold">{streetAddress}</p>
                            <p className="font-semibold">{`${city}, ${state} ${zipCode}`}</p>
                            <p className="font-semibold">{email}</p>
                            <p className="font-semibold">{phone}</p>
                        </div>
                    </div>

                    <button className="px-6 py-3 bg-indigo-500 text-white text-md hover:bg-indigo-600 hover:shadow-md rounded-full transition">
                        Continue Shopping
                    </button>
                </div>

                {/* Right Column (Order Summary) */}
                <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-lg shadow-inner shadow-gray-400">
                    <h3 className="text-2xl font-bold mb-4">Order Summary</h3>

                    <p className="text-lg mb-2">Ticket Amount: <span className="font-semibold">{tickets}</span></p>
                    <p className="text-lg mb-2">Seat Zone: <span className="font-semibold">{seatZone}</span></p>
                    <p className="text-lg mb-2">Zone: <span className="font-semibold">{zoneNumber}</span></p>
                    <p className="text-lg mb-6">Total: <span className="font-semibold">${totalPrice}</span></p>

                    <hr className="my-6" />

                    <h3 className="text-2xl font-semibold mb-4">Tickets Ordered</h3>

                    <p className="text-lg font-semibold mb-2">{eventName}</p>

                    <img src={eventImage} alt="Event" className="w-full h-auto rounded-lg mb-4" />

                    <div className="flex items-center mb-2">
                        <FaCalendarAlt className="text-indigo-600" />
                        <span className="ml-2 text-md">{eventDate}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaClock className="text-indigo-600" />
                        <span className="ml-2 text-md">{eventTime}</span>
                    </div>
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="text-indigo-600" />
                        <span className="ml-2 text-md">{eventLocation}</span>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PaymentConfirmation;