import { useState, useEffect } from 'react';
import { getMyBookings } from '../services/api';
import LocationPicker from '../components/LocationPicker';
import { Ticket, Calendar, MapPin, TicketCheck, CheckCircle } from 'lucide-react';

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
        <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin shadow-sm" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            My <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Tickets</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Your booked events and QR entry passes</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-24 animate-fadeIn bg-white rounded-3xl border border-[var(--border)] shadow-sm">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--primary)]">
                <Ticket size={40} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">No tickets yet</h3>
            <p className="text-lg text-[var(--text-secondary)]">Book an event to see your tickets here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="card p-6 md:p-8 animate-fadeIn flex flex-col md:flex-row gap-6">
                
                {/* Info side */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">
                      {booking.eventId?.title || 'Event'}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col gap-3 text-sm font-medium text-[var(--text-secondary)] mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary)]">
                         <Calendar size={16} />
                      </div>
                      <span>{booking.eventId?.date ? formatDate(booking.eventId.date) : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary)]">
                        <MapPin size={16} />
                      </div>
                      <span className="line-clamp-1">{booking.eventId?.location || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary)]">
                        <Ticket size={16} />
                      </div>
                      <span>{booking.ticketCount} {booking.ticketCount === 1 ? 'ticket' : 'tickets'}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[var(--border)]">
                    <span className={`badge ${booking.status === 'checked-in' ? 'badge-checked-in' : 'badge-confirmed'} px-3 py-1.5`}>
                      {booking.status === 'checked-in' ? <><CheckCircle size={14} className="mr-1.5"/> Checked In</> : <><TicketCheck size={14} className="mr-1.5"/> Confirmed</>}
                    </span>
                  </div>
                </div>

                {/* QR Code Side */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="text-center p-4 rounded-2xl bg-white border border-[var(--border)] shadow-sm">
                    <p className="text-[10px] text-[var(--text-muted)] mb-3 uppercase tracking-widest font-bold">
                      Entry Pass
                    </p>
                    <img
                      src={booking.qrCodeImage}
                      alt="QR Ticket"
                      className="mx-auto rounded-xl"
                      style={{ width: '160px', height: '160px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
