import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isCollegeOnly = event.eventType === 'collegeOnlyEvent';

  return (
    <Link to={`/events/${event._id}`} className="no-underline">
      <div className="card group cursor-pointer">
        {/* Poster */}
        <div className="relative h-48 overflow-hidden bg-[var(--bg-surface)]">
          {event.poster ? (
            <img
              src={event.poster}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <span className="text-5xl opacity-50">🎉</span>
            </div>
          )}
          {/* Badge */}
          <div className="absolute top-3 right-3">
            <span className={`badge ${isCollegeOnly ? 'badge-college' : 'badge-open'}`}>
              {isCollegeOnly ? `🎓 ${event.allowedCollege}` : '🌐 Open for All'}
            </span>
          </div>
          {/* Category */}
          <div className="absolute bottom-3 left-3">
            <span className="badge" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none' }}>
              {event.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 truncate">
            {event.title}
          </h3>

          <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{formatDate(event.date)}</span>
              {event.time && <span className="text-[var(--text-muted)]">• {event.time}</span>}
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center gap-1 text-sm">
              <span>🎟️</span>
              <span className={event.availableSeats > 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}>
                {event.availableSeats > 0 ? `${event.availableSeats} seats left` : 'Sold Out'}
              </span>
            </div>
            {event.organizerId && (
              <span className="text-xs text-[var(--text-muted)]">
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
