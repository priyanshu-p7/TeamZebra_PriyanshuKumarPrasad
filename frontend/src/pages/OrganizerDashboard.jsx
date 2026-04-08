import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, getEventAnalytics, deleteEvent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OrganizerDashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await getEvents();
      // Filter events by organizer
      const myEvents = data.filter(
        (e) => e.organizerId?._id === user?.id || e.organizerId === user?.id
      );
      setEvents(myEvents);
      if (myEvents.length > 0) {
        loadAnalytics(myEvents[0]._id);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async (eventId) => {
    setSelectedEvent(eventId);
    setAnalyticsLoading(true);
    try {
      const { data } = await getEventAnalytics(eventId);
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteEvent(eventId);
      fetchEvents();
      if (selectedEvent === eventId) {
        setAnalytics(null);
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
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

  // Chart data
  const seatsDoughnut = analytics
    ? {
        labels: ['Sold', 'Available'],
        datasets: [
          {
            data: [analytics.ticketsSold, analytics.availableSeats],
            backgroundColor: ['#6366f1', '#1e1e2e'],
            borderColor: ['#818cf8', '#2a2a3e'],
            borderWidth: 2,
          },
        ],
      }
    : null;

  const attendanceBar = analytics
    ? {
        labels: ['Total Bookings', 'Checked In', 'Not Yet'],
        datasets: [
          {
            label: 'Count',
            data: [
              analytics.totalBookings,
              analytics.attendanceCount,
              analytics.totalBookings - analytics.attendanceCount,
            ],
            backgroundColor: ['#6366f1', '#10b981', '#f59e0b'],
            borderRadius: 8,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#9ca3b0', font: { family: 'Inter' } } },
    },
    scales: {
      x: { ticks: { color: '#6b7280' }, grid: { color: '#1e1e2e' } },
      y: { ticks: { color: '#6b7280' }, grid: { color: '#1e1e2e' } },
    },
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 animate-fadeIn">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Organizer <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-[var(--text-secondary)]">Manage your events and track performance</p>
          </div>
          <Link to="/create-event" className="btn-primary no-underline">
            ➕ Create Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No events yet</h3>
            <p className="text-[var(--text-secondary)] mb-6">Create your first event to get started</p>
            <Link to="/create-event" className="btn-primary no-underline">Create Event</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Events List */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold mb-4">Your Events</h2>
              <div className="flex flex-col gap-3">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className={`card p-4 cursor-pointer transition-all ${
                      selectedEvent === event._id ? '!border-[var(--primary)]' : ''
                    }`}
                    onClick={() => loadAnalytics(event._id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{event.title}</h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">📅 {formatDate(event.date)}</p>
                        <p className="text-xs text-[var(--text-muted)]">📍 {event.location}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--primary-light)' }}>
                            {event.totalSeats - event.availableSeats} sold
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--success)' }}>
                            {event.availableSeats} left
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(event._id);
                        }}
                        className="text-[var(--text-muted)] hover:text-[var(--error)] text-xs bg-transparent border-none cursor-pointer p-1"
                        title="Delete event"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Panel */}
            <div className="lg:col-span-2">
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : analytics ? (
                <div className="animate-fadeIn">
                  <h2 className="text-lg font-semibold mb-4">
                    Analytics: <span className="text-[var(--primary-light)]">{analytics.eventTitle}</span>
                  </h2>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Total Seats', value: analytics.totalSeats, icon: '💺' },
                      { label: 'Tickets Sold', value: analytics.ticketsSold, icon: '🎫' },
                      { label: 'Available', value: analytics.availableSeats, icon: '✅' },
                      { label: 'Checked In', value: analytics.attendanceCount, icon: '📷' },
                    ].map((stat, i) => (
                      <div key={i} className="card p-4 text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                        <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="card p-4">
                      <h3 className="text-sm font-semibold mb-4 text-[var(--text-secondary)]">Seat Distribution</h3>
                      <div className="max-w-[200px] mx-auto">
                        {seatsDoughnut && <Doughnut data={seatsDoughnut} />}
                      </div>
                    </div>
                    <div className="card p-4">
                      <h3 className="text-sm font-semibold mb-4 text-[var(--text-secondary)]">Attendance Overview</h3>
                      {attendanceBar && <Bar data={attendanceBar} options={chartOptions} />}
                    </div>
                  </div>

                  {/* Attendees Table */}
                  <div className="card overflow-hidden">
                    <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
                      <h3 className="text-sm font-semibold text-[var(--text-secondary)]">
                        Attendees ({analytics.attendees?.length || 0})
                      </h3>
                    </div>
                    {analytics.attendees?.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr style={{ background: 'var(--bg-surface)' }}>
                              <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs uppercase tracking-wider">Name</th>
                              <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs uppercase tracking-wider">Email</th>
                              <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs uppercase tracking-wider">College</th>
                              <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs uppercase tracking-wider">Tickets</th>
                              <th className="text-left p-3 text-[var(--text-muted)] font-medium text-xs uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {analytics.attendees.map((attendee, i) => (
                              <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                                <td className="p-3 text-[var(--text-primary)]">{attendee.userName}</td>
                                <td className="p-3 text-[var(--text-secondary)]">{attendee.userEmail}</td>
                                <td className="p-3 text-[var(--text-secondary)]">{attendee.userCollege}</td>
                                <td className="p-3 text-[var(--text-primary)]">{attendee.ticketCount}</td>
                                <td className="p-3">
                                  <span className={`badge ${attendee.status === 'checked-in' ? 'badge-checked-in' : 'badge-confirmed'}`}>
                                    {attendee.status === 'checked-in' ? '✅ Checked In' : '🎫 Confirmed'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-[var(--text-muted)]">
                        No attendees yet
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-[var(--text-muted)]">
                  Select an event to view analytics
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
