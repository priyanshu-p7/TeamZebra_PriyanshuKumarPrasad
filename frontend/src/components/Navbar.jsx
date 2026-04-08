import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav className="glass sticky top-0 z-50" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">🎫</span>
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              Eventra
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline text-sm font-medium">
              Explore Events
            </Link>

            {user ? (
              <>
                {user.role === 'attendee' && (
                  <Link to="/my-tickets" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline text-sm font-medium">
                    My Tickets
                  </Link>
                )}
                {user.role === 'organizer' && (
                  <>
                    <Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link to="/create-event" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline text-sm font-medium">
                      Create Event
                    </Link>
                    <Link to="/scan" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline text-sm font-medium">
                      Scan QR
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-3 ml-2 pl-4" style={{ borderLeft: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'var(--gradient-primary)' }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="text-xs text-[var(--text-muted)] hover:text-[var(--error)] transition-colors cursor-pointer bg-transparent border-none">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-secondary text-sm !py-2 !px-4 no-underline">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary text-sm !py-2 !px-4 no-underline">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden bg-transparent border-none text-[var(--text-primary)] cursor-pointer text-xl p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 animate-fadeIn" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex flex-col gap-3">
              <Link to="/explore" onClick={() => setMobileOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline py-2 text-sm">
                Explore Events
              </Link>
              {user ? (
                <>
                  {user.role === 'attendee' && (
                    <Link to="/my-tickets" onClick={() => setMobileOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline py-2 text-sm">
                      My Tickets
                    </Link>
                  )}
                  {user.role === 'organizer' && (
                    <>
                      <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline py-2 text-sm">
                        Dashboard
                      </Link>
                      <Link to="/create-event" onClick={() => setMobileOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline py-2 text-sm">
                        Create Event
                      </Link>
                      <Link to="/scan" onClick={() => setMobileOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline py-2 text-sm">
                        Scan QR
                      </Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="text-left text-[var(--error)] bg-transparent border-none cursor-pointer py-2 text-sm">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline py-2 text-sm">
                    Log In
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline py-2 text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
