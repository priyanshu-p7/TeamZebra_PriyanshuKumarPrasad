import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Ticket, Menu, X, LogOut, LayoutDashboard, PlusCircle, ScanLine, Search, CalendarHeart } from 'lucide-react';

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
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: 'var(--gradient-primary)' }}>
              <Ticket size={22} className="transform -rotate-12" />
            </div>
            <span className="text-xl font-black tracking-tight text-[var(--text-primary)]">
              Eventra
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline text-sm font-semibold">
              <Search size={16} /> Explore Events
            </Link>

            {user ? (
              <>
                {user.role === 'attendee' && (
                  <Link to="/my-tickets" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline text-sm font-semibold">
                    <CalendarHeart size={16} /> My Tickets
                  </Link>
                )}
                {user.role === 'organizer' && (
                  <>
                    <Link to="/dashboard" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline text-sm font-semibold">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <Link to="/create-event" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline text-sm font-semibold">
                      <PlusCircle size={16} /> Create Event
                    </Link>
                    <Link to="/scan" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors no-underline text-sm font-semibold">
                      <ScanLine size={16} /> Scan QR
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-4 ml-4 pl-6" style={{ borderLeft: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm" style={{ background: 'var(--gradient-primary)' }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="flex items-center justify-center p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--error)] hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-[var(--text-primary)] font-semibold hover:text-[var(--primary)] text-sm transition-colors no-underline px-2">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary text-sm !py-2.5 !px-5 no-underline">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden bg-transparent border-none text-[var(--text-primary)] cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 animate-fadeIn" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex flex-col gap-2">
              <Link to="/explore" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-white rounded-xl p-3 no-underline text-sm font-medium transition-all">
                <Search size={18} /> Explore Events
              </Link>
              {user ? (
                <>
                  {user.role === 'attendee' && (
                    <Link to="/my-tickets" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-white rounded-xl p-3 no-underline text-sm font-medium transition-all">
                      <CalendarHeart size={18} /> My Tickets
                    </Link>
                  )}
                  {user.role === 'organizer' && (
                    <>
                      <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-white rounded-xl p-3 no-underline text-sm font-medium transition-all">
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                      <Link to="/create-event" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-white rounded-xl p-3 no-underline text-sm font-medium transition-all">
                        <PlusCircle size={18} /> Create Event
                      </Link>
                      <Link to="/scan" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-white rounded-xl p-3 no-underline text-sm font-medium transition-all">
                        <ScanLine size={18} /> Scan QR
                      </Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left text-[var(--error)] hover:bg-red-50 rounded-xl p-3 bg-transparent border-none cursor-pointer text-sm font-medium transition-all">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 px-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full text-center !py-3">
                    Log In
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center !py-3">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
