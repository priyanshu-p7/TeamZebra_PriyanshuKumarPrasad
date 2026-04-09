import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Ticket, Image as ImageIcon, GraduationCap, Globe, Clock4 } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isCollegeOnly = event.eventType === 'collegeOnlyEvent';
  const isExpired = new Date(event.date) < new Date(new Date().setHours(0,0,0,0));

  return (
    <Link to={`/events/${event._id}`} className="block h-full group no-underline perspective-1000">
      <div className={`relative flex flex-col h-full bg-transparent transition-all duration-500 ease-out transform group-hover:scale-[1.02] ${isExpired ? 'opacity-75 grayscale-[0.3]' : ''}`}>
        
        {/* Massive Dynamic Poster Background */}
        <div className="relative pt-[70%] sm:pt-[65%] w-full rounded-[32px] overflow-hidden shadow-lg z-0 group-hover:shadow-2xl transition-all duration-500 bg-slate-900 border border-black/5">
          {event.poster ? (
             <img
               src={event.poster}
               alt={event.title}
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
             />
          ) : (
             <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
               <ImageIcon size={56} className="text-[var(--primary)] opacity-40 mb-3 drop-shadow-md" />
             </div>
          )}

          {/* Epic Gradient Overlay so top badges pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Stylized Badges inside Poster */}
          <div className="absolute top-5 left-5 flex gap-2">
            <span className="backdrop-blur-xl bg-black/40 text-white border border-white/20 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wide">
              {event.category}
            </span>
            {isExpired && (
               <span className="backdrop-blur-xl bg-red-500/80 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                 Ended
               </span>
            )}
          </div>

          <div className="absolute top-5 right-5">
            <span className={`flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border backdrop-blur-xl ${isCollegeOnly ? 'bg-amber-500/90 text-white border-amber-400/50' : 'bg-emerald-500/90 text-white border-emerald-400/50'}`}>
              {isCollegeOnly ? (
                <><GraduationCap size={14} /> Only {event.allowedCollege}</>
              ) : (
                <><Globe size={14} /> Open</>
              )}
            </span>
          </div>
        </div>

        {/* Floating Content Card (Overlaps the Poster) */}
        <div className="relative z-10 flex-grow mx-4 -mt-16 sm:-mt-20">
          <div className="h-full bg-white/95 backdrop-blur-3xl border border-white/40 shadow-xl rounded-3xl p-6 flex flex-col transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(0,82,204,0.15)] group-hover:-translate-y-2">
            
            {/* The Floating Date Pill */}
            <div className="absolute -top-8 right-6 bg-gradient-to-br from-[var(--primary)] to-blue-600 text-white shadow-xl shadow-blue-500/30 rounded-2xl flex flex-col items-center justify-center p-3 border border-blue-400/30 transform group-hover:scale-110 transition-transform duration-300">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-90 leading-none mb-1">
                 {new Date(event.date).toLocaleString('default', { month: 'short' })}
               </span>
               <span className="text-2xl font-black leading-none">
                 {new Date(event.date).getDate()}
               </span>
            </div>

            {/* Title & Description */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 pr-16 line-clamp-2 leading-tight group-hover:text-[var(--primary)] transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                {event.description || "Join us for an amazing experience. Discover new connections and enhance your skills at this exclusive event."}
              </p>
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <Clock4 size={16} className="text-blue-500 shrink-0" />
                <span className="truncate">{event.time ? event.time : 'TBD'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <MapPin size={16} className="text-purple-500 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            {/* Booking Progress Bar */}
            <div className="mb-5 mt-auto">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Capacity
                </span>
                <span className={`text-xs font-bold ${event.availableSeats > 0 ? 'text-[var(--primary)]' : 'text-red-500'}`}>
                   {event.availableSeats > 0 ? `${event.totalSeats - event.availableSeats} / ${event.totalSeats} Booked` : 'Sold Out'}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${event.availableSeats === 0 ? 'bg-red-500' : 'bg-gradient-to-r from-blue-400 to-[var(--primary)]'}`}
                  style={{ width: `${Math.min(((event.totalSeats - event.availableSeats) / event.totalSeats) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Footer with Organizer & Price */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 shrink-0">
              {event.organizerId ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {event.organizerId.name ? event.organizerId.name.charAt(0).toUpperCase() : 'O'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Organizer</span>
                    <span className="text-sm font-bold text-slate-800 line-clamp-1 max-w-[100px] leading-tight">{event.organizerId.name}</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm font-bold text-slate-400">Eventify Host</div>
              )}
              
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</span>
                <span className="text-base font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                  Free
                </span>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </Link>
  );
};

export default EventCard;
