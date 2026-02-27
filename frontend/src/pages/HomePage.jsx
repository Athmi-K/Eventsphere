import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, ShieldCheck } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="animate-fade-in">
            <section style={{ textAlign: 'center', padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    Elevate Your Campus Events
                </h1>
                <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '2.5rem' }}>
                    EventSphere is the centralized registration platform that brings
                    seamless organization and beautiful design to your institutional events.
                </p>
                <Link to="/events" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>
                    Browse Events <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                </Link>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Calendar size={24} />
                    </div>
                    <h3 style={{ marginBottom: '1rem' }}>Seamless Scheduling</h3>
                    <p className="text-muted">Discover events happening on campus with a clean, easy-to-read schedule tailored for you.</p>
                </div>
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Users size={24} />
                    </div>
                    <h3 style={{ marginBottom: '1rem' }}>Effortless Registration</h3>
                    <p className="text-muted">Register for events in seconds. Our minimal interface ensures you focus on what matters.</p>
                </div>
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <ShieldCheck size={24} />
                    </div>
                    <h3 style={{ marginBottom: '1rem' }}>Secure & Reliable</h3>
                    <p className="text-muted">Built on enterprise-grade infrastructure. Your event data and registrations are always safe.</p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
