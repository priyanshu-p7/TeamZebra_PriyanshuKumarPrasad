import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../services/api';
import LocationPicker from '../components/LocationPicker';
import { useAuth } from '../context/AuthContext';
import { Image as ImageIcon, MapPin, Globe, GraduationCap, Save } from 'lucide-react';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    fetchEventDetails();
    // eslint-disable-next-line
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const { data } = await getEventById(id);
      
      // Ensure date is formatted as YYYY-MM-DD for the input type="date"
      let formattedDate = '';
      if (data.date) {
        const d = new Date(data.date);
        formattedDate = d.toISOString().split('T')[0];
      }

      setForm({
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'Technology',
        eventType: data.eventType || 'openEvent',
        date: formattedDate,
        time: data.time || '',
        location: data.location || '',
        latitude: data.latitude || 28.6139,
        longitude: data.longitude || 77.2090,
        totalSeats: data.totalSeats || '',
        posterUrl: data.posterUrl || ''
      });
    } catch (err) {
      setError('Failed to fetch event details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLocationSelect = (lat, lng) => setForm({ ...form, latitude: lat, longitude: lng });

  // Get today's date formatted for the 'min' attribute
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateEvent(id, {
        ...form,
        totalSeats: Number(form.totalSeats),
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating event');
    } finally {
      setSaving(false);
    }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Edit <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Event</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">Update details for your upcoming event.</p>
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
                  <select name="category" value={form.category} onChange={handleChange} className="input-field cursor-pointer">
                    <option value="Technology">Technology</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Art">Art</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                    <option value="Health">Health</option>
                    <option value="Food">Food</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Social">Social</option>
                  </select>
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
                      min={today}
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
                <select name="eventType" value={form.eventType} onChange={handleChange} className="input-field cursor-pointer bg-white">
                  <option value="openEvent">Open Event — Anyone can join</option>
                  <option value="collegeOnlyEvent">College Only — Restricted to your college</option>
                </select>

                {form.eventType === 'collegeOnlyEvent' && (
                  <div className="p-4 rounded-xl bg-blue-50 text-[var(--primary-dark)] text-sm font-medium border border-blue-100 flex items-start gap-3">
                    <GraduationCap size={20} className="shrink-0 mt-0.5" />
                    <p>This event will be restricted to students of <strong>{user?.college}</strong>. Attendees must verify their college email to book tickets.</p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full !py-4 text-lg mt-8 flex items-center justify-center gap-2">
              {saving ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><Save size={20} /> Update Event</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
