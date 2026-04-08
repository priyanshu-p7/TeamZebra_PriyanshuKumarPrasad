import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';
import { Search, MapPin, Globe, GraduationCap, PartyPopper } from 'lucide-react';

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
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Explore <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Find amazing events happening near you</p>
        </div>

        {/* Filters */}
        <form onSubmit={handleFilter} className="card p-6 md:p-8 mb-10 animate-fadeIn bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="input-field !pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                placeholder="City"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="input-field !pl-10"
              />
            </div>
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
              <option value="openEvent">Open Events</option>
              <option value="collegeOnlyEvent">College Only</option>
            </select>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="input-field cursor-pointer"
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button type="submit" className="btn-primary !py-2.5 !px-8 text-sm">
              Apply Filters
            </button>
            <button type="button" onClick={clearFilters} className="btn-secondary !py-2.5 !px-8 text-sm">
              Clear
            </button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin shadow-sm" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-24 animate-fadeIn bg-white rounded-3xl border border-[var(--border)] shadow-sm">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--primary)]">
                <PartyPopper size={40} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">No events found</h3>
            <p className="text-lg text-[var(--text-secondary)]">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {events.map((event) => (
              <div key={event._id} className="animate-fadeIn h-full">
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
