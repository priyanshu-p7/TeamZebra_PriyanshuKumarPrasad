import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, bookTicket } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LocationPicker from '../components/LocationPicker';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(1);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data } = await getEventById(id);
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const isEligible = () => {
    if (!user) return false;
    if (user.role !== 'attendee') return false;
    if (event.eventType === 'collegeOnlyEvent') {
      return user.college === event.allowedCollege;
    }
    return true;
  };

  const handleBook = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setBooking(true);
    setMessage({ type: '', text: '' });
    try {
      const { data } = await bookTicket({ eventId: id, ticketCount });
      setMessage({ type: 'success', text: '🎉 ' + data.message + ' Check your email for the QR ticket.' });
      fetchEvent(); // refresh seats
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Booking failed' });
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-2xl font-bold">Event not found</h2>
        </div>
      </div>
    );
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const isCollegeOnly = event.eventType === 'collegeOnlyEvent';

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-slideUp">
          {/* Poster */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            {event.poster ? (
              <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <span className="text-8xl opacity-30">🎉</span>
              </div>
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`badge ${isCollegeOnly ? 'badge-college' : 'badge-open'}`}>
                  {isCollegeOnly ? `🎓 ${event.allowedCollege}` : '🌐 Open for All'}
                </span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none' }}>
                  {event.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="card p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">About this event</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{event.description}</p>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Date</p>
                      <p className="text-sm font-medium">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                    <span className="text-xl">🕐</span>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Time</p>
                      <p className="text-sm font-medium">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Location</p>
                      <p className="text-sm font-medium">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                    <span className="text-xl">👤</span>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Organized by</p>
                      <p className="text-sm font-medium">{event.organizerId?.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              {event.latitude && event.longitude && (
                <div className="card p-6 mt-6">
                  <h2 className="text-xl font-semibold mb-4">📍 Event Location</h2>
                  <LocationPicker
                    latitude={event.latitude}
                    longitude={event.longitude}
                    readOnly={true}
                  />
                </div>
              )}
            </div>

            {/* Sidebar - Booking */}
            <div>
              <div className="card p-6 sticky top-24">
                {/* Seats */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-1" style={{ color: event.availableSeats > 0 ? 'var(--success)' : 'var(--error)' }}>
                    {event.availableSeats}
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">seats available of {event.totalSeats}</p>
                  <div className="w-full h-2 rounded-full mt-3" style={{ background: 'var(--bg-surface)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${((event.totalSeats - event.availableSeats) / event.totalSeats) * 100}%`,
                        background: 'var(--gradient-primary)',
                      }}
                    />
                  </div>
                </div>

                {/* Eligibility warning */}
                {user && isCollegeOnly && !isEligible() && (
                  <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: 'var(--warning)' }}>
                    ⚠️ This event is restricted to students of {event.allowedCollege}
                  </div>
                )}

                {message.text && (
                  <div
                    className="mb-4 p-3 rounded-lg text-sm"
                    style={{
                      background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                      border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                      color: message.type === 'success' ? 'var(--success)' : 'var(--error)',
                    }}
                  >
                    {message.text}
                  </div>
                )}

                {/* Ticket selector */}
                {user?.role === 'attendee' && event.availableSeats > 0 && isEligible() && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Number of tickets
                    </label>
                    <select
                      value={ticketCount}
                      onChange={(e) => setTicketCount(Number(e.target.value))}
                      className="input-field cursor-pointer"
                    >
                      {Array.from({ length: Math.min(5, event.availableSeats) }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'ticket' : 'tickets'}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={handleBook}
                  disabled={
                    booking ||
                    event.availableSeats <= 0 ||
                    (user && !isEligible()) ||
                    (user && user.role !== 'attendee')
                  }
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {booking ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : event.availableSeats <= 0 ? (
                    'Sold Out'
                  ) : !user ? (
                    'Login to Book'
                  ) : user.role !== 'attendee' ? (
                    'Attendees Only'
                  ) : (
                    '🎫 Book Now'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
