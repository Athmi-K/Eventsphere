import { useState, useEffect } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { Loader2 } from 'lucide-react';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await api.get('/events');
                if (data.success) {
                    setEvents(data.data);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--accent-light)', color: 'var(--error)', borderRadius: 'var(--radius-lg)' }}>
                <h3>Error loading events</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Upcoming Events</h1>
                <p className="text-muted">Browse and register for upcoming sessions and workshops.</p>
            </div>

            {events.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }} className="text-muted">
                    No events found. Check back later!
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventsPage;
