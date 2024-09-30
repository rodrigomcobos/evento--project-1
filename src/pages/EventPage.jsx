import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SearchNavbar from '../components/SearchNavBar';
import Footer from '../components/Footer';
import EventDetails from '../components/EventDetails';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import EventSeatModal from '../components/EventSeatModal';
import EventDisclaimer from '../components/EventDisclaimer';
import ReviewList from '../components/ReviewList';
import ReviewModal from '../components/ReviewModal';
import LoadingPage from '../components/LoadingPage';

const EventPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/ticketmaster/events/${id}`);
                setEvent(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching event details:", err);
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleReviewClick = () => {
        if (currentUser) {
            setIsReviewModalOpen(true);
        } else {
            navigate(`/login?redirect=/event/${id}`);
        }
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    if (loading) return <LoadingPage />;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <SearchNavbar />
            {event && <EventDetails event={event} openModal={openModal} />}
            <ReviewList
                eventId={id}
                openReviewModal={handleReviewClick}
                isUserLoggedIn={!!currentUser}
            />
            <EventDisclaimer />
            <UpcomingEventsSection />
            {isModalOpen && <EventSeatModal isOpen={isModalOpen} closeModal={closeModal} event={event} />}
            {isReviewModalOpen && (
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={closeReviewModal}
                    eventId={id}
                />
            )}
            <Footer />
        </>
    );
};

export default EventPage;