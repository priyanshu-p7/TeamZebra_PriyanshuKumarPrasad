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
    <Link to={`/events/${event._id}`} className="no-underline block h-full">
      <div className={`card group cursor-pointer flex flex-col h-full bg-white relative ${isExpired ? 'opacity-70 grayscale-[0.5]' : ''}`}>
        {/* Poster */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-[var(--bg-surface)] shrink-0">
          {event.poster ? (
            <img
              src={event.poster}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,106,255,0.05), rgba(46,172,255,0.1))' }}>
              <ImageIcon size={48} className="text-[var(--primary)] opacity-40 mb-2" />
              <span className="text-sm font-medium text-[var(--primary)] opacity-60 px-4 text-center">{event.title}</span>
            </div>
          )}
          
          {/* Top Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2.5 items-end">
            {isExpired && (
              <span className="badge shadow-sm" style={{ background: 'rgba(255,255,255,0.95)', color: '#475569' }}>
                <Clock4 size={12} className="mr-1" /> Expired
              </span>
            )}
            <span className={`badge shadow-sm ${isCollegeOnly ? 'badge-college' : 'badge-open'}`} style={isCollegeOnly ? { background: 'rgba(255,255,255,0.95)'} : { background: 'rgba(255,255,255,0.95)'}}>
              {isCollegeOnly ? (
                <><GraduationCap size={12} className="mr-1 text-amber-500" /> {event.allowedCollege}</>
              ) : (
                <><Globe size={12} className="mr-1 text-emerald-500" /> Open for All</>
              )}
            </span>
          </div>
          
          {/* Category */}
          <div className="absolute bottom-4 left-4">
            <span className="badge shadow-sm backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
              {event.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 leading-tight line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
            {event.title}
          </h3>

          <div className="flex flex-col gap-2.5 mt-auto mb-4">
            <div className="flex items-center gap-2.5 text-sm font-medium text-[var(--text-secondary)]">
              <Calendar size={16} className="text-[var(--primary-light)] shrink-0" />
              <span className="truncate">{formatDate(event.date)}</span>
              {event.time && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0"></span>
                  <Clock size={14} className="text-[var(--text-muted)] mt-0.5 shrink-0" />
                  <span className="text-[var(--text-muted)] truncate">{event.time}</span>
                </>
              )}
            </div>
            <div className="flex items-start gap-2.5 text-sm font-medium text-[var(--text-secondary)]">
              <MapPin size={16} className="text-[var(--primary-light)] mt-0.5 shrink-0" />
              <span className="line-clamp-2">{event.location}</span>
            </div>
          </div>

          {/* Footer - Pushed to bottom of card */}
          <div className="mt-auto pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <Ticket size={16} className={event.availableSeats > 0 ? "text-[var(--success)]" : "text-[var(--error)]"} />
              <span className={event.availableSeats > 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}>
                {event.availableSeats > 0 ? `${event.availableSeats} left` : 'Sold Out'}
              </span>
            </div>
            {event.organizerId && (
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-50 text-[var(--text-muted)] truncate max-w-[120px]">
                by {event.organizerId.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
