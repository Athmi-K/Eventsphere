import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';
import { formatDate } from '../utils';

const EventCard = ({ event }) => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '1.5rem', flex: 1 }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{event.title}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        <CalendarIcon size={16} />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        <MapPin size={16} />
                        <span>{event.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        <Users size={16} />
                        <span>Capacity: {event.capacity}</span>
                    </div>
                </div>

                <p className="text-muted" style={{
                    fontSize: '0.875rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {event.description}
                </p>
            </div>

            <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
                <Link to={`/events/${event.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
