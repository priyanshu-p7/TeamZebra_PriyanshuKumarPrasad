import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventById, bookTicket, getMyBookings, getEventAnalytics } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LocationPicker from '../components/LocationPicker';
import { Frown, PartyPopper, Clock4, GraduationCap, Globe, Calendar, Clock, MapPin, User, Ticket, AlertTriangle, CheckCircle, Users, ExternalLink } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasBooked, setHasBooked] = useState(false);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchEvent();
    if (user && user.role === 'attendee') {
      checkBookingStatus();
    }
    // eslint-disable-next-line
  }, [id, user]);

  const fetchEvent = async () => {
    try {
      const { data } = await getEventById(id);
      setEvent(data);
      
      // If user is organizer of this event, fetch analytics peek
      if (user && user.role === 'organizer' && (data.organizerId?._id === user._id || data.organizerId?._id === user.id || data.organizerId === user._id || data.organizerId === user.id)) {
        fetchOrganizerAnalytics();
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      if (!user || user.role !== 'attendee') {
        setLoading(false);
      }
    }
  };

  const fetchOrganizerAnalytics = async () => {
    try {
      const { data } = await getEventAnalytics(id);
      setAttendees(data.attendees || []);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  };

  const checkBookingStatus = async () => {
    try {
      const { data } = await getMyBookings();
      // Check if any of the user's bookings correspond to this event
      const alreadyBooked = data.some(b => b.eventId?._id === id || b.eventId === id);
      setHasBooked(alreadyBooked);
    } catch (err) {
      console.error('Error checking bookings:', err);
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
      const { data } = await bookTicket({ eventId: id, ticketCount: 1 });
      setMessage({ type: 'success', text: data.message + ' Check your email for the QR ticket.' });
      setHasBooked(true);
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
        <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin shadow-sm" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center card p-10 bg-white shadow-sm">
          <div className="flex justify-center mb-5">
             <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center text-[var(--error)]">
               <Frown size={40} />
             </div>
          </div>
          <h2 className="text-3xl font-black mb-2 text-[var(--text-primary)]">Event not found</h2>
          <p className="text-[var(--text-secondary)]">The event you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const isCollegeOnly = event.eventType === 'collegeOnlyEvent';
  const isExpired = new Date(event.date) < new Date(new Date().setHours(0,0,0,0));
  const isOrganizer = user?.role === 'organizer' && (event.organizerId?._id === user?.id || event.organizerId?._id === user?._id || event.organizerId === user?.id || event.organizerId === user?._id);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-slideUp">
          
          {/* Poster */}
          <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-8 shadow-sm">
            {event.poster ? (
              <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <PartyPopper size={120} className="text-white opacity-40" />
              </div>
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }} />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {isExpired && (
                  <span className="badge px-4 py-2" style={{ background: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none' }}>
                    <Clock4 size={14} className="mr-1.5" /> Event Expired
                  </span>
                )}
                <span className={`badge px-4 py-2 shadow-sm`} style={{ background: 'rgba(255,255,255,0.95)', color: isCollegeOnly ? '#d97706' : '#059669' }}>
                   {isCollegeOnly ? <><GraduationCap size={14} className="mr-1.5" /> {event.allowedCollege}</> : <><Globe size={14} className="mr-1.5" /> Open for All</>}
                </span>
                <span className="badge px-4 py-2 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  {event.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">{event.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              
              <div className="card p-8 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-5 flex items-center gap-2"><MapPin className="text-[var(--primary)]" size={24}/> About this event</h2>
                <div className="prose prose-blue max-w-none text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap font-medium">
                  {event.description}
                </div>
              </div>

              <div className="card p-8 bg-white shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Event Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--primary-light)] transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-[var(--primary)] shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-0.5">Date</p>
                      <p className="font-semibold text-[var(--text-primary)]">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--primary-light)] transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-[var(--primary)] shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-0.5">Time</p>
                      <p className="font-semibold text-[var(--text-primary)]">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--primary-light)] transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-[var(--primary)] shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-0.5">Location</p>
                      <p className="font-semibold text-[var(--text-primary)]">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--primary-light)] transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-[var(--primary)] shrink-0">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-0.5">Organized by</p>
                      <p className="font-semibold text-[var(--text-primary)]">{event.organizerId?.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              {event.latitude && event.longitude && (
                <div className="card p-8 bg-white shadow-sm overflow-hidden">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <MapPin size={24} className="text-[var(--primary)]" /> Event Location Map
                  </h2>
                  <div className="rounded-2xl w-full">
                    <LocationPicker
                      latitude={event.latitude}
                      longitude={event.longitude}
                      readOnly={true}
                      height="300px"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Booking */}
            <div className="sticky top-28 self-start space-y-6">
              <div className="card p-8 bg-white shadow-sm border border-[var(--border)]">
                
                {/* Seats */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-black mb-2 tracking-tight" style={{ color: event.availableSeats > 0 ? 'var(--success)' : 'var(--error)' }}>
                    {event.availableSeats}
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">Seats available of {event.totalSeats}</p>
                  <div className="w-full h-3 rounded-full mt-4 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-in-out"
                      style={{
                        width: `${((event.totalSeats - event.availableSeats) / event.totalSeats) * 100}%`,
                        background: 'var(--gradient-primary)',
                      }}
                    />
                  </div>
                </div>

                {/* Eligibility warning */}
                {user && isCollegeOnly && !isEligible() && (
                  <div className="mb-6 p-4 rounded-xl flex items-start gap-3 bg-amber-50 text-amber-700 border border-amber-200">
                    <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">
                      This event is restricted strictly to students of {event.allowedCollege}
                    </span>
                  </div>
                )}

                {message.text && (
                  <div
                    className="mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2"
                    style={{
                      background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
                      border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                      color: message.type === 'success' ? '#166534' : '#991b1b',
                    }}
                  >
                    {message.type === 'success' ? <PartyPopper size={18} /> : <AlertTriangle size={18} />}
                    {message.text}
                  </div>
                )}

                {/* Ticket selector removed: Attendees can only book 1 ticket */}

                {hasBooked ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl flex items-center justify-center gap-2 bg-blue-50 text-blue-700 border border-blue-200">
                      <CheckCircle size={20} />
                      <span className="font-bold">You have booked this event</span>
                    </div>
                    <Link
                      to="/my-tickets"
                      className="btn-primary w-full flex items-center justify-center gap-2 !py-4 text-lg font-bold shadow-lg shadow-blue-500/20 no-underline"
                    >
                      <Ticket size={24} className="mr-1" /> View Ticket
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleBook}
                    disabled={
                      booking ||
                      isExpired ||
                      event.availableSeats <= 0 ||
                      (user && !isEligible()) ||
                      (user && user.role !== 'attendee')
                    }
                    className="btn-primary w-full flex items-center justify-center gap-2 !py-4 text-lg font-bold shadow-lg shadow-blue-500/20"
                  >
                    {booking ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isExpired ? (
                      <><Clock4 size={20} /> Event Expired</>
                    ) : event.availableSeats <= 0 ? (
                      'Sold Out'
                    ) : !user ? (
                      <><User size={20} /> Login to Book</>
                    ) : user.role !== 'attendee' ? (
                      'Attendees Only'
                    ) : (
                      <><Ticket size={24} className="mr-1" /> Book Now</>
                    )}
                  </button>
                )}
              </div>

              {/* Organizer Attendees Preview */}
              {isOrganizer && (
                <div className="card p-6 bg-white shadow-sm border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2"><Users size={18} className="text-[var(--primary)]" /> Recent Bookings</h3>
                    <span className="text-xs font-bold text-[var(--text-muted)] bg-slate-100 px-2 py-1 rounded-md">{attendees.length} Total</span>
                  </div>
                  
                  {attendees.length === 0 ? (
                     <div className="text-sm text-[var(--text-secondary)] text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                       No tickets booked yet.
                     </div>
                  ) : (
                    <div className="space-y-3 mb-4">
                      {attendees.slice(0, 3).map((attendee, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-[var(--primary)] shrink-0 flex items-center justify-center text-white text-xs font-bold">
                                {(attendee.userName || '').charAt(0).toUpperCase()}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-800 leading-tight">{attendee.userName}</span>
                                <span className="text-xs text-slate-500 truncate max-w-[120px]">{attendee.userEmail}</span>
                              </div>
                           </div>
                           <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md ${attendee.status === 'checked-in' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                             {attendee.status === 'checked-in' ? 'Checked' : 'Booked'}
                           </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link to={`/analytics/${event._id}`} className="btn-secondary w-full flex items-center justify-center gap-2 !py-2.5 text-sm !bg-slate-50 hover:!bg-slate-100 !border-slate-200 !text-slate-700 no-underline">
                    View Full Attendee List <ExternalLink size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
