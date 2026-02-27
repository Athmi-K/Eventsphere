import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="page-wrapper">
            <nav className="navbar">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <Calendar size={24} />
                        EventSphere
                    </Link>
                    <div className="nav-links">
                        <Link
                            to="/events"
                            className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}
                        >
                            Browse Events
                        </Link>
                        <Link
                            to="/admin/login"
                            className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="main-content">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <div className="container">
                    &copy; {new Date().getFullYear()} EventSphere. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
