import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../services/api';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, LayoutDashboard, Calendar, Users, Ticket, CheckSquare, Pencil, Trash2 } from 'lucide-react';

const OrganizerDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalEvents: 0,
    totalSeats: 0,
    bookedSeats: 0,
    checkedIn: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await getEvents();
      // Filter events to only show those owned by the current organizer
      const myEvents = data.filter(e => e.organizerId?._id === user?._id || e.organizerId === user?._id);
      setEvents(myEvents);

      const stats = myEvents.reduce(
        (acc, event) => {
          acc.totalEvents += 1;
          acc.totalSeats += event.totalSeats;
          acc.bookedSeats += event.bookedSeats;
          return acc;
        },
        { totalEvents: 0, totalSeats: 0, bookedSeats: 0, checkedIn: 0 }
      );
      setAnalytics(stats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await deleteEvent(eventId);
        setEvents(events.filter((e) => e._id !== eventId));
        fetchDashboardData(); // Refresh analytics
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      }
    }
  };

  const isEventExpired = (dateStr) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to midnight
    return eventDate < today;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header spanning exactly like the reference UI top section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <LayoutDashboard size={32} className="text-[var(--primary)]" />
              Dashboard
            </h1>
            <p className="text-[var(--text-secondary)]">Manage your events and track analytics in real-time.</p>
          </div>
          <Link to="/create-event" className="btn-primary !py-3 !px-6 no-underline flex items-center justify-center gap-2 shrink-0">
            <PlusCircle size={20} /> Create New Event
          </Link>
        </div>

        {/* Analytics (Styled like Reference Clean Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slideUp">
          {[
            { label: 'Total Events', value: analytics.totalEvents, icon: <Calendar className="text-blue-500" size={24} />, bg: 'bg-blue-50' },
            { label: 'Total Capacity', value: analytics.totalSeats, icon: <Users className="text-indigo-500" size={24} />, bg: 'bg-indigo-50' },
            { label: 'Tickets Booked', value: analytics.bookedSeats, icon: <Ticket className="text-emerald-500" size={24} />, bg: 'bg-emerald-50' },
            { label: 'Checked In', value: '0', icon: <CheckSquare className="text-amber-500" size={24} />, bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="card p-6 flex flex-col justify-between bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wide">{stat.label}</p>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg}`}>
                   {stat.icon}
                </div>
              </div>
              <h2 className="text-4xl font-black text-[var(--text-primary)]">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* My Events List */}
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6">Your Organized Events</h2>

          {events.length === 0 ? (
            <div className="text-center py-24 card bg-white">
              <div className="flex justify-center mb-4">
                 <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                   <Calendar size={32} className="text-[var(--primary)]" />
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-2">No events created yet</h3>
              <p className="text-[var(--text-secondary)] mb-6">Create your first event and start managing attendees.</p>
              <Link to="/create-event" className="btn-primary !py-2.5 !px-6 no-underline inline-flex items-center gap-2">
                <PlusCircle size={18} /> Create Event
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {events.map((event) => {
                const expired = isEventExpired(event.date);
                
                return (
                  <div key={event._id} className="relative group">
                    <EventCard event={event} />
                    
                    {/* Action Overlay */}
                    <div className={`absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 
                      ${expired ? 'grayscale-[0.5]' : ''}`}>
                      <Link
                        to={`/edit-event/${event._id}`}
                        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit Event"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(event._id);
                        }}
                        className="w-10 h-10 rounded-full bg-white shadow-lg border-none flex items-center justify-center text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Stats overlay at bottom on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-white/90 backdrop-blur-sm border-t border-[var(--border)] translate-y-full group-hover:translate-y-0 transition-transform z-10 rounded-b-xl flex justify-between items-center opacity-0 group-hover:opacity-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                      <div className="text-center w-1/2 border-r border-[var(--border)]">
                        <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">Booked</p>
                        <p className="font-bold text-lg text-[var(--primary)]">
                          {event.bookedSeats} <span className="text-sm font-medium text-[var(--text-secondary)]">/ {event.totalSeats}</span>
                        </p>
                      </div>
                      <div className="text-center w-1/2">
                         <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">Revenue</p>
                         <p className="font-bold text-lg text-emerald-600">Free</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
