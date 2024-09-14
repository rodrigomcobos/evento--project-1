import React, { useState, useEffect, useRef } from 'react';

const EventSeatModal = ({ isOpen, closeModal }) => {
    const [tickets, setTickets] = useState(1);
    const [seatZone, setSeatZone] = useState('WU');
    const [zoneNumber, setZoneNumber] = useState(1);

    const modalRef = useRef();

    // Function to get zone numbers based on selected seat zone
    const getZoneNumbers = (zone) => {
        switch (zone.charAt(0)) {
            case 'W':
            case 'N':
            case 'S':
                return Array.from({ length: 8 }, (_, i) => i + 1);
            case 'E':
                return [1, 2, 7, 8];
            default:
                return [];
        }
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Handle "Continue" button click
    //Will use this to push the data to the booking confirmation page
    const handleContinue = () => {
        console.log({
            tickets: tickets,
            seatZone: seatZone,
            zoneNumber: zoneNumber,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div ref={modalRef} className="bg-white p-14 rounded-3xl max-w-6xl w-full mx-8 relative">

                {/* Close Button (X) */}
                <button
                    onClick={closeModal}
                    className="absolute top-6 right-7 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <span className="text-4xl">&times;</span>
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Side - Arena Map Image with Zoom Effect */}
                    <div className="col-span-2">
                        <div className="overflow-hidden rounded-lg">
                            <img
                                src="src/assets/slides/arenamap.png"
                                alt="Arena Map"
                                className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-125"
                            />
                        </div>
                    </div>

                    {/* Right Side - Seat Selection */}
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-2xl font-bold">How Many Tickets?</h2>
                        <select
                            className="border p-3 rounded-md"
                            value={tickets}
                            onChange={(e) => setTickets(e.target.value)}
                        >
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>

                        <h2 className="text-2xl font-bold">Where do you want to sit?</h2>
                        <select
                            className="border p-3 rounded-md"
                            value={seatZone}
                            onChange={(e) => setSeatZone(e.target.value)}
                        >
                            <option value="WU">WU - $199</option>
                            <option value="NU">NU - $199</option>
                            <option value="SU">SU - $199</option>
                            <option value="EU">EU - $199</option>
                            <option value="WM">WM - $299</option>
                            <option value="NM">NM - $299</option>
                            <option value="SM">SM - $299</option>
                            <option value="EM">EM - $299</option>
                            <option value="WL">WL - $499</option>
                            <option value="NL">NL - $499</option>
                            <option value="SL">SL - $499</option>
                            <option value="EL">EL - $499</option>
                            <option value="FLOOR">FLOOR - $699</option>
                        </select>

                        {/* Zone Number Dropdown */}
                        <h2 className="text-2xl font-bold">Select Zone Number</h2>
                        <select
                            className="border p-3 rounded-md"
                            value={zoneNumber}
                            onChange={(e) => setZoneNumber(e.target.value)}
                        >
                            {getZoneNumbers(seatZone).map((num) => (
                                <option key={num} value={num}>
                                    Zone {seatZone.charAt(0)} {num}
                                </option>
                            ))}
                        </select>

                        {/* Legend */}
                        <p className="text-sm text-gray-500 mt-2">
                            <span className="text-gray-700 font-bold">U</span> $ -{' '}
                            <span className="text-gray-700 font-bold">M</span> $$ -{' '}
                            <span className="text-gray-700 font-bold">L</span> $$$ -{' '}
                            <span className="text-gray-700 font-bold">FLOOR</span> $$$$
                        </p>

                        <button
                            onClick={() => {
                                handleContinue();
                                closeModal();
                            }}
                            className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventSeatModal;