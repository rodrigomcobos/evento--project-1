import React, { useState, useEffect } from 'react';
import { searchEvents } from '../services/ticketmasterApi';

const TicketmasterTest = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const result = await searchEvents({
                    city: 'New York',
                    startDateTime: '2023-06-01T00:00:00Z',
                    size: 10
                });
                setEvents(result._embedded?.events || []);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err.message || 'An error occurred while fetching events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Ticketmaster Events</h2>
            {events.length === 0 ? (
                <p>No events found</p>
            ) : (
                <ul>
                    {events.map(event => (
                        <li key={event.id}>{event.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TicketmasterTest;