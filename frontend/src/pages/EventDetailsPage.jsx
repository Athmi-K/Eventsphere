import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import RegistrationForm from '../components/RegistrationForm';
import { formatDate } from '../utils';
import { CalendarIcon, MapPin, Users, ArrowLeft, Loader2 } from 'lucide-react';

const EventDetailsPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                if (data.success) {
                    setEvent(data.data);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch event details');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fee2e2', color: 'var(--error)', borderRadius: 'var(--radius-lg)' }}>
                <h3>Error</h3>
                <p>{error || 'Event not found'}</p>
                <Link to="/events" className="btn btn-outline" style={{ marginTop: '1rem' }}>Back to Events</Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>
            {/* Event Details */}
            <div>
                <Link to="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.875rem' }}>
                    <ArrowLeft size={16} /> Back to Events
                </Link>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>{event.title}</h1>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: 'var(--accent-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
                            <CalendarIcon size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Date & Time</div>
                            <div style={{ fontWeight: '500' }}>{formatDate(event.date)}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: 'var(--accent-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
                            <MapPin size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Location</div>
                            <div style={{ fontWeight: '500' }}>{event.location}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: 'var(--accent-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
                            <Users size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Capacity</div>
                            <div style={{ fontWeight: '500' }}>{event.capacity} total seats</div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>About this Event</h3>
                    <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                        {event.description}
                    </p>
                </div>
            </div>

            {/* Registration Form Sidebar */}
            <div style={{ position: 'sticky', top: '100px' }}>
                <RegistrationForm eventId={event.id} />
            </div>

        </div>
    );
};

export default EventDetailsPage;
