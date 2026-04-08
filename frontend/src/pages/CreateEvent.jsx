import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LocationPicker from '../components/LocationPicker';

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Technology',
    location: '',
    latitude: '',
    longitude: '',
    date: '',
    time: '',
    eventType: 'openEvent',
    totalSeats: '',
  });
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);

  const categories = [
    'Technology', 'Music', 'Sports', 'Art', 'Education',
    'Business', 'Health', 'Food', 'Gaming', 'Social',
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (lat, lng) => {
    setForm({ ...form, latitude: lat, longitude: lng });
  };

  const handlePoster = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val !== '' && val !== null && val !== undefined) formData.append(key, val);
      });
      if (poster) formData.append('poster', poster);

      await createEvent(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Create <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Event</span>
          </h1>
          <p className="text-[var(--text-secondary)]">Fill in the details to create your event</p>
        </div>

        <div className="card p-6 md:p-8 animate-slideUp">
          {error && (
            <div className="mb-6 p-3 rounded-lg text-sm text-[var(--error)]" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Poster Upload */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Event Poster</label>
              <div
                className="relative h-48 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center"
                style={{ background: 'var(--bg-surface)', border: '2px dashed var(--border)' }}
                onClick={() => document.getElementById('poster-input').click()}
              >
                {posterPreview ? (
                  <img src={posterPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-sm text-[var(--text-muted)]">Click to upload poster (JPEG, PNG, WebP)</p>
                  </div>
                )}
                <input
                  id="poster-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePoster}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Event Title</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} className="input-field" placeholder="e.g., Tech Summit 2025" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="input-field" rows="4" placeholder="Describe your event..." required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field cursor-pointer">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Venue Name / Address</label>
                <input type="text" name="location" value={form.location} onChange={handleChange} className="input-field" placeholder="Venue address" required />
              </div>
            </div>

            {/* Map Location Picker */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                📍 Pin Event Location on Map
              </label>
              <LocationPicker
                latitude={form.latitude}
                longitude={form.longitude}
                onLocationSelect={handleLocationSelect}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="input-field cursor-pointer" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} className="input-field cursor-pointer" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Event Type</label>
                <select name="eventType" value={form.eventType} onChange={handleChange} className="input-field cursor-pointer">
                  <option value="openEvent">🌐 Open Event — Anyone can join</option>
                  <option value="collegeOnlyEvent">🎓 College Only — Restricted to your college</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Total Seats</label>
                <input type="number" name="totalSeats" value={form.totalSeats} onChange={handleChange} className="input-field" placeholder="e.g., 100" min="1" required />
              </div>
            </div>

            {form.eventType === 'collegeOnlyEvent' && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: 'var(--warning)' }}>
                🎓 This event will be restricted to students of <strong>{user?.college}</strong>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>🎉 Create Event</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
