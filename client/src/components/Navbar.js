import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, LogOut, LayoutDashboard, Store } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-brand">
                    <Sprout size={28} color="var(--primary-color)" />
                    AgriConnect
                </Link>
                {user && (
                    <div className="navbar-links">
                        <Link
                            to="/dashboard"
                            className={`nav-link flex items-center gap-1 ${location.pathname === '/dashboard' ? 'active' : ''}`}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        <Link
                            to="/connect"
                            className={`nav-link flex items-center gap-1 ${location.pathname === '/connect' ? 'active' : ''}`}
                        >
                            <Store size={18} />
                            Market Connect
                        </Link>
                        <div className="badge badge-green" style={{ marginLeft: '1rem' }}>
                            {user.role}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary flex items-center gap-1"
                            style={{ padding: '0.4rem 1rem', marginLeft: '0.5rem' }}
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
