import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { formatDate } from '../utils';
import { LogOut, Plus, Edit, Users, Loader2, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('events'); // events, create

    // Form State
    const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', capacity: '' });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Registrations state
    const [registrations, setRegistrations] = useState([]);
    const [viewingEvent, setViewingEvent] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/admin/login');
            return;
        }
        fetchEvents();
    }, [navigate]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/events');
            setEvents(data.data);
        } catch (err) {
            setError('Failed to load events');
            if (err.response?.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin/login');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');
        setFormSuccess('');

        try {
            if (editingId) {
                await api.put(`/admin/events/${editingId}`, formData);
                setFormSuccess('Event updated successfully');
            } else {
                await api.post('/admin/events', formData);
                setFormSuccess('Event created successfully');
            }

            setFormData({ title: '', description: '', date: '', location: '', capacity: '' });
            setEditingId(null);
            fetchEvents();
            setTimeout(() => setActiveTab('events'), 1500);

        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to save event');
        } finally {
            setFormLoading(false);
        }
    };

    const handleEdit = (event) => {
        // Format date for datetime-local input
        const dateObj = new Date(event.date);
        const dateStr = dateObj.toISOString().slice(0, 16);

        setFormData({
            title: event.title,
            description: event.description,
            date: dateStr,
            location: event.location,
            capacity: event.capacity
        });
        setEditingId(event.id);
        setActiveTab('create');
    };

    const loadRegistrations = async (event) => {
        setViewingEvent(event);
        try {
            const { data } = await api.get(`/admin/events/${event.id}/registrations`);
            setRegistrations(data.data);
        } catch (err) {
            alert('Failed to load registrations');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--accent-primary)" />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Admin Dashboard</h2>
                <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LogOut size={16} /> Logout
                </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <button
                    className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => { setActiveTab('events'); setViewingEvent(null); }}
                >
                    Manage Events
                </button>
                <button
                    className={`btn ${activeTab === 'create' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('create')}
                >
                    {editingId ? 'Edit Event' : 'Create New Event'}
                </button>
            </div>

            {activeTab === 'events' && !viewingEvent && (
                <div className="card" style={{ overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Title</th>
                                <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Date</th>
                                <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Capacity</th>
                                <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No events created yet.</td>
                                </tr>
                            ) : (
                                events.map(event => (
                                    <tr key={event.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{event.title}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{formatDate(event.date)}</td>
                                        <td style={{ padding: '1rem' }}>{event.capacity}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button onClick={() => loadRegistrations(event)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', gap: '0.25rem' }}>
                                                <Users size={14} /> View
                                            </button>
                                            <button onClick={() => handleEdit(event)} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', gap: '0.25rem' }}>
                                                <Edit size={14} /> Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'events' && viewingEvent && (
                <div className="animate-fade-in">
                    <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={() => setViewingEvent(null)} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>Back</button>
                        <h3 style={{ margin: 0 }}>Registrations for "{viewingEvent.title}"</h3>
                    </div>

                    <div className="card" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
                                <tr>
                                    <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Name</th>
                                    <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Email</th>
                                    <th style={{ padding: '1rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Registered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No registrations yet.</td>
                                    </tr>
                                ) : (
                                    registrations.map(reg => (
                                        <tr key={reg.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem', fontWeight: '500' }}>{reg.name}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{reg.email}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{formatDate(reg.registered_at)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'create' && (
                <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Event' : 'Create New Event'}</h3>

                    {formError && <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{formError}</div>}
                    {formSuccess && <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: 'var(--success)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{formSuccess}</div>}

                    <form onSubmit={handleFormSubmit}>
                        <div className="input-group">
                            <label className="input-label">Title</label>
                            <input type="text" className="input-field" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Description</label>
                            <textarea className="input-field" rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label className="input-label">Date & Time</label>
                                <input type="datetime-local" className="input-field" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Capacity</label>
                                <input type="number" min="1" className="input-field" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Location</label>
                            <input type="text" className="input-field" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={formLoading}>
                                {formLoading ? 'Saving...' : 'Save Event'}
                            </button>
                            {editingId && (
                                <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', date: '', location: '', capacity: '' }); setActiveTab('events'); }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;
