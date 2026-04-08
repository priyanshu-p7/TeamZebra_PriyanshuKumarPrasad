import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    category: '',
    eventType: '',
    date: '',
  });

  const categories = [
    'Technology', 'Music', 'Sports', 'Art', 'Education',
    'Business', 'Health', 'Food', 'Gaming', 'Social',
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (params = {}) => {
    setLoading(true);
    try {
      const queryParams = {};
      Object.entries(params).forEach(([key, val]) => {
        if (val) queryParams[key] = val;
      });
      const { data } = await getEvents(queryParams);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchEvents(filters);
  };

  const clearFilters = () => {
    setFilters({ search: '', city: '', category: '', eventType: '', date: '' });
    fetchEvents();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Explore <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-[var(--text-secondary)]">Find amazing events happening near you</p>
        </div>

        {/* Filters */}
        <form onSubmit={handleFilter} className="card p-4 md:p-6 mb-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="🔍 Search events..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="📍 City"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="input-field"
            />
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="input-field cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filters.eventType}
              onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
              className="input-field cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="openEvent">🌐 Open Events</option>
              <option value="collegeOnlyEvent">🎓 College Only</option>
            </select>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="input-field cursor-pointer"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" className="btn-primary !py-2 !px-6">
              Apply Filters
            </button>
            <button type="button" onClick={clearFilters} className="btn-secondary !py-2 !px-6">
              Clear
            </button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 animate-fadeIn">
            <div className="text-5xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-[var(--text-secondary)]">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="animate-fadeIn">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;
