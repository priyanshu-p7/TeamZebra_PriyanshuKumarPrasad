import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';
import LocationPicker from '../components/LocationPicker';
import CustomSelect from '../components/CustomSelect';
import { useAuth } from '../context/AuthContext';
import { Image as ImageIcon, MapPin, Globe, GraduationCap, PartyPopper } from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Technology',
    eventType: 'openEvent',
    date: '',
    time: '',
    location: '',
    latitude: 28.6139,
    longitude: 77.2090,
    totalSeats: '',
    posterUrl: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLocationSelect = (lat, lng) => setForm({ ...form, latitude: lat, longitude: lng });

  // Get today's date formatted for the 'min' attribute
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await createEvent({
        ...form,
        totalSeats: Number(form.totalSeats),
      });
      navigate(`/events/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Create <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Event</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Publish a new event and start selling tickets.</p>
        </div>

        <div className="card p-8 md:p-10 animate-slideUp bg-white shadow-sm">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-[var(--error)] text-sm border border-red-100 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="E.g., Tech Workshop 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Category</label>
                  
                  <CustomSelect
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    options={["Technology","Music","Sports","Art","Education","Business","Health","Food","Gaming","Social"].map(cat => ({ value: cat, label: cat }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      min={today} // Prevents past dates
                      className="input-field cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      required
                      className="input-field cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Total Seats / Capacity</label>
                  <input
                    type="number"
                    name="totalSeats"
                    value={form.totalSeats}
                    onChange={handleChange}
                    required
                    min="1"
                    className="input-field"
                    placeholder="E.g., 100"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Poster Image URL (Optional)</label>
                  <input
                    type="url"
                    name="posterUrl"
                    value={form.posterUrl}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                  {form.posterUrl && (
                    <div className="mt-4 h-40 rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border)]">
                      <img src={form.posterUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                  {!form.posterUrl && (
                    <div className="mt-4 h-40 rounded-2xl bg-[var(--bg-surface)] border border-dashed border-[var(--border)] flex flex-col items-center justify-center text-[var(--text-muted)]">
                      <ImageIcon size={32} className="mb-2 opacity-50" />
                      <span className="text-sm font-medium">Image Preview</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="input-field resize-none"
                    placeholder="Describe your event..."
                  ></textarea>
                </div>
              </div>
            </div>

            <hr className="border-[var(--border)] my-8" />

            {/* Location Section */}
            <div>
              <label className="block text-sm font-bold text-[var(--text-secondary)] mb-4 uppercase tracking-wide flex items-center gap-2">
                 <MapPin size={18} className="text-[var(--primary)]" /> Pin Event Location on Map
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="input-field mb-4"
                placeholder="Enter exact venue address"
              />
              <div className="h-72 rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm">
                <LocationPicker
                  latitude={form.latitude}
                  longitude={form.longitude}
                  onLocationSelect={handleLocationSelect}
                />
              </div>
            </div>

            <hr className="border-[var(--border)] my-8" />

            {/* Event Type & College Restrictions */}
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)]">
               <label className="block text-sm font-bold text-[var(--text-secondary)] mb-4 uppercase tracking-wide">Event Accessibility</label>
              
              <div className="space-y-4">
                
                <CustomSelect
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  options={[
                    { value: 'openEvent', label: 'Open Event — Anyone can join' },
                    { value: 'collegeOnlyEvent', label: 'College Only — Restricted to your college' }
                  ]}
                />

                {form.eventType === 'collegeOnlyEvent' && (
                  <div className="p-4 rounded-xl bg-blue-50 text-[var(--primary-dark)] text-sm font-medium border border-blue-100 flex items-start gap-3">
                    <GraduationCap size={20} className="shrink-0 mt-0.5" />
                    <p>This event will be restricted to students of <strong>{user?.college}</strong>. Attendees must verify their college email to book tickets.</p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-4 text-lg mt-8 flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><PartyPopper size={20} /> Create Event</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
