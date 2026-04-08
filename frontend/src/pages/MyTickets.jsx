import { useState, useEffect } from 'react';
import { getMyBookings } from '../services/api';
import LocationPicker from '../components/LocationPicker';

const MyTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Tickets</span>
          </h1>
          <p className="text-[var(--text-secondary)]">Your booked events and QR entry passes</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="text-5xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
            <p className="text-[var(--text-secondary)]">Book an event to see your tickets here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="card p-6 animate-fadeIn">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      {booking.eventId?.title || 'Event'}
                    </h3>
                    <div className="flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
                      <span>📅 {booking.eventId?.date ? formatDate(booking.eventId.date) : 'N/A'}</span>
                      <span>📍 {booking.eventId?.location || 'N/A'}</span>
                      <span>🎟️ {booking.ticketCount} {booking.ticketCount === 1 ? 'ticket' : 'tickets'}</span>
                    </div>
                  </div>
                  <span className={`badge ${booking.status === 'checked-in' ? 'badge-checked-in' : 'badge-confirmed'}`}>
                    {booking.status === 'checked-in' ? '✅ Checked In' : '🎫 Confirmed'}
                  </span>
                </div>

                {/* QR Code */}
                <div className="text-center p-4 rounded-xl mb-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-wider font-semibold">
                    Your Entry Pass
                  </p>
                  <img
                    src={booking.qrCodeImage}
                    alt="QR Ticket"
                    className="mx-auto rounded-lg"
                    style={{ width: '180px', height: '180px' }}
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-3">
                    Show this QR code at the venue entrance
                  </p>
                </div>

                {/* Mini Map */}
                {booking.eventId?.latitude && booking.eventId?.longitude && (
                  <div className="rounded-xl overflow-hidden">
                    <LocationPicker
                      latitude={booking.eventId.latitude}
                      longitude={booking.eventId.longitude}
                      readOnly={true}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
