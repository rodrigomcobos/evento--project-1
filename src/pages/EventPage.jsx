import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import EventDetails from '../components/EventDetails';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import EventSeatModal from '../components/EventSeatModal';

const EventPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Navbar />
            <EventDetails openModal={openModal} />
            <UpcomingEventsSection />
            {/* Passing the isOpen prop to the EventSeatModal */}
            {/* <EventSeatModal isOpen={isModalOpen} closeModal={closeModal} /> */}
            {isModalOpen && <EventSeatModal isOpen={isModalOpen} closeModal={closeModal} />}
            <Footer />
        </>
    );
};

export default EventPage;