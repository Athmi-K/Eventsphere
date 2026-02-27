import { useState } from 'react';
import api from '../services/api';
import { Loader2, CheckCircle } from 'lucide-react';

const RegistrationForm = ({ eventId, onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await api.post(`/events/${eventId}/register`, formData);
            if (data.success) {
                setSuccess(true);
                if (onSuccess) onSuccess();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="card animate-fade-in" style={{ padding: '2rem', textAlign: 'center', border: '1px solid var(--success)' }}>
                <CheckCircle size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Registration Successful!</h3>
                <p className="text-muted">You have been registered for this event. Check your email for details.</p>
            </div>
        );
    }

    return (
        <div className="card animate-fade-in" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Register Now</h3>

            {error && (
                <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name" className="input-label">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        className="input-field"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="input-field"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.75rem', marginTop: '1rem' }}
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : 'Confirm Registration'}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
