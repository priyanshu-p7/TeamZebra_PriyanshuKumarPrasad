import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventAnalytics } from '../services/api';
import { BarChart, Users, CheckSquare, ArrowLeft, Mail, GraduationCap, Ticket, Clock } from 'lucide-react';

const EventAnalytics = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line
  }, [id]);

  const fetchAnalytics = async () => {
    try {
      const response = await getEventAnalytics(id);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin shadow-sm" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center card p-10 bg-white">
          <p className="text-[var(--error)] mb-4">{error || 'Analytics not found'}</p>
          <Link to="/dashboard" className="btn-primary no-underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 animate-fadeIn">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium mb-4 transition-colors">
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black mb-2 flex items-center gap-3 text-[var(--text-primary)]">
            <BarChart size={32} className="text-[var(--primary)]" />
            {data.eventTitle} Analytics
          </h1>
          <p className="text-[var(--text-secondary)]">Track attendees and real-time scanning status.</p>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 animate-slideUp">
          <div className="card p-6 flex flex-col justify-between bg-white shadow-sm border-t-4 border-t-indigo-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wide">Capacity</p>
              <Users className="text-indigo-500" size={24} />
            </div>
            <h2 className="text-4xl font-black text-[var(--text-primary)]">{data.totalSeats}</h2>
          </div>

          <div className="card p-6 flex flex-col justify-between bg-white shadow-sm border-t-4 border-t-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wide">Tickets Sold</p>
              <Ticket className="text-emerald-500" size={24} />
            </div>
            <h2 className="text-4xl font-black text-[var(--text-primary)]">{data.ticketsSold}</h2>
          </div>

          <div className="card p-6 flex flex-col justify-between bg-white shadow-sm border-t-4 border-t-amber-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wide">Checked In</p>
              <CheckSquare className="text-amber-500" size={24} />
            </div>
            <h2 className="text-4xl font-black text-[var(--text-primary)]">{data.attendanceCount}</h2>
          </div>
        </div>

        {/* Attendee List Table */}
        <div className="card bg-white shadow-sm animate-fadeIn overflow-hidden">
          <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-card)]">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="text-[var(--primary)]" size={20} /> Attendee List
            </h2>
            <span className="badge badge-confirmed !lowercase !capitalize">Total {data.attendees.length} Bookings</span>
          </div>
          
          <div className="overflow-x-auto">
            {data.attendees.length === 0 ? (
              <div className="p-10 text-center text-[var(--text-secondary)]">
                <Users size={48} className="mx-auto mb-3 opacity-20" />
                <p>No attendees have booked tickets yet.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-surface)] text-[var(--text-secondary)] text-sm tracking-wide uppercase border-b border-[var(--border)]">
                    <th className="p-4 font-bold">Attendee Info</th>
                    <th className="p-4 font-bold">College</th>
                    <th className="p-4 font-bold">Tickets</th>
                    <th className="p-4 font-bold">Booked At</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--text-primary)] text-sm font-medium">
                  {data.attendees.map((attendee, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-[var(--text-primary)] mb-0.5">{attendee.userName}</p>
                        <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                          <Mail size={12} /> {attendee.userEmail}
                        </p>
                      </td>
                      <td className="p-4 text-[var(--text-secondary)]">
                        {attendee.userCollege ? (
                           <span className="flex items-center gap-1.5"><GraduationCap size={14}/> {attendee.userCollege}</span>
                        ) : 'N/A'}
                      </td>
                      <td className="p-4 text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1"><Ticket size={14}/> {attendee.ticketCount}</span>
                      </td>
                      <td className="p-4 text-[var(--text-secondary)] text-xs">
                        <span className="flex items-center gap-1 whitespace-nowrap"><Clock size={12}/> {new Date(attendee.bookedAt).toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        <span className={`badge ${attendee.status === 'checked-in' ? 'badge-checked-in' : 'badge-confirmed'}`}>
                          {attendee.status === 'checked-in' ? <CheckSquare size={12} className="mr-1"/> : <Ticket size={12} className="mr-1"/>}
                          {attendee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventAnalytics;
