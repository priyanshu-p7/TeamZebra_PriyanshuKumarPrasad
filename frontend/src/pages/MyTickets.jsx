import { useState, useEffect } from 'react';
import { getMyBookings } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, MapPin, Download, PartyPopper } from 'lucide-react';
import domtoimage from 'dom-to-image';

const MyTickets = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

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

  const handleDownload = async (elementId, title) => {
    setDownloadingId(elementId);
    
    // Add a slight delay to allow React to render the loading state
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const element = document.getElementById(elementId);
    if (!element) {
      setDownloadingId(null);
      return;
    }
    
    try {
      // Use dom-to-image to bypass strict HTMLCanvasElement taint issues.
      // Scaling can be artificially increased by multiplying width/height and scaling content,
      // but native sizing usually works perfectly.
      const dataURL = await domtoimage.toPng(element, { bgcolor: '#eaf0ff' });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${title.replace(/\s+/g, '_')}_Ticket.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading ticket:', error);
      alert('Could not download ticket due to a rendering issue. Try again later.');
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin shadow-sm" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fadeIn flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">
              My <span className="text-[var(--primary)]">Tickets</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">Your booked events and QR entry passes</p>
          </div>
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
          <div className="flex flex-col gap-10">
            {bookings.map((booking) => {
              const eventTitle = booking.eventId?.title || 'Unknown Event';
              const ticketId = `ticket-${booking._id}`;
              
              return (
                <div key={booking._id} className="animate-fadeIn w-full relative">
                  {/* Download Button floating top right */}
                  <div className="mb-3 flex justify-end">
                    <button 
                      onClick={() => handleDownload(ticketId, eventTitle)}
                      disabled={downloadingId === ticketId}
                      className={`btn-secondary !text-sm !py-2 shrink-0 bg-white shadow-sm border ${downloadingId === ticketId ? 'opacity-75 cursor-not-allowed text-blue-500 border-blue-200' : 'border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300'}`}
                    >
                      {downloadingId === ticketId ? (
                        <><div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div> Fetching...</>
                      ) : (
                        <><Download size={16} /> Download Ticket</>
                      )}
                    </button>
                  </div>

                  {/* Physical Ticket Element */}
                  <div id={ticketId} className="festival-ticket flex-col lg:flex-row">
                    
                    {/* 1. Left Side: Poster & Title Overlay */}
                    <div 
                      className="w-full lg:w-[35%] relative min-h-[220px] lg:min-h-[300px] shrink-0 overflow-hidden"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      {booking.eventId?.poster ? (
                        <img 
                          src={`${booking.eventId.poster}${booking.eventId.poster.includes('?') ? '&' : '?'}not-from-cache-please`} 
                          alt="Poster" 
                          crossOrigin="anonymous"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                           <PartyPopper size={80} className="text-white opacity-40" />
                        </div>
                      )}
                      
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/60 to-transparent p-6 flex flex-col justify-end">
                         <h2 className="text-white text-3xl font-black mb-1 leading-tight relative">{eventTitle}</h2>
                         <p className="text-blue-200 font-medium text-sm drop-shadow-md relative">
                           {booking.eventId?.category || 'Special Event'}
                         </p>
                      </div>
                    </div>

                    {/* 2. Middle Side: Data & Details */}
                    <div className="flex-1 p-6 md:p-8 bg-[#eaf0ff] flex flex-col justify-between">
                       <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                         <div>
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Name</p>
                           <p className="font-bold text-slate-900 truncate">{user?.name || 'Attendee'}</p>
                         </div>
                         <div>
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Invoice ID</p>
                           <p className="font-bold text-slate-900 truncate">{booking._id.substring(0,8).toUpperCase()}</p>
                         </div>
                         <div className="hidden lg:block">
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gate / Entry</p>
                           <p className="font-bold text-slate-900">Main Gate</p>
                         </div>
                         
                         <div>
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ticket Count</p>
                           <p className="font-bold text-slate-900">{booking.ticketCount} {booking.ticketCount === 1 ? 'Pass' : 'Passes'}</p>
                         </div>
                         <div>
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ticket Status</p>
                           <p className={`font-bold capitalize ${booking.status === 'checked-in' ? 'text-emerald-600' : 'text-blue-600'}`}>
                              {booking.status}
                           </p>
                         </div>
                       </div>

                       <div className="border-t border-slate-300/50 pt-5 space-y-4">
                         <div>
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={12}/> Location & Venue</p>
                           <p className="font-bold text-slate-900 mb-1 leading-snug">{booking.eventId?.location || 'Unknown Venue'}</p>
                           {booking.eventId?.location && (
                             <a 
                               href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.eventId.location)}`} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-blue-600 text-xs font-bold hover:underline"
                             >
                               See on Map ↗
                             </a>
                           )}
                         </div>

                         <div className="flex gap-10">
                            <div>
                               <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar size={12}/> Date</p>
                               <p className="font-bold text-slate-900">{booking.eventId?.date ? formatDate(booking.eventId.date) : 'N/A'}</p>
                            </div>
                            <div>
                               <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Time</p>
                               <p className="font-bold text-slate-900">{booking.eventId?.time || 'N/A'}</p>
                            </div>
                         </div>
                       </div>
                    </div>

                    {/* Perforated Divider */}
                    <div className="hidden lg:block ticket-divider bg-[#eaf0ff]"></div>

                    {/* Mobile Only: Horizontal Perforated Divider */}
                    <div className="lg:hidden h-0 w-full border-t-2 border-dashed border-slate-300 relative bg-[#eaf0ff]">
                       <div className="absolute w-8 h-8 rounded-full bg-[var(--bg-dark)] -left-4 -top-4 z-10"></div>
                       <div className="absolute w-8 h-8 rounded-full bg-[var(--bg-dark)] -right-4 -top-4 z-10"></div>
                    </div>

                    {/* 3. Right Side: Ticket Stub & QR */}
                    <div className="w-full lg:w-[280px] bg-[#eaf0ff] p-8 shrink-0 flex flex-col items-center justify-center">
                       <h3 className="text-xl font-bold text-slate-800 mb-6">Scan to Enter</h3>
                       <div className="bg-white p-3 rounded-2xl shadow-sm mb-6 w-[180px] h-[180px] flex items-center justify-center">
                         {booking.qrCodeImage ? (
                           <img
                             src={booking.qrCodeImage}
                             alt="Entry QR Code"
                             className="w-full h-full object-contain"
                           />
                         ) : (
                           <span className="text-xs text-slate-400">QR Error</span>
                         )}
                       </div>
                       
                       <p className="text-xs text-center text-slate-500 font-medium px-4 leading-relaxed">
                         Thank you for booking! Have your QR code ready at the gate.
                       </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
