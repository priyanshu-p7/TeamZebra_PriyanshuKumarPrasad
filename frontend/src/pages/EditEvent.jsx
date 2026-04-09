import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../services/api';
import LocationPicker from '../components/LocationPicker';
import CustomSelect from '../components/CustomSelect';
import CustomDatePicker from '../components/CustomDatePicker';
import CustomTimePicker from '../components/CustomTimePicker';
import { useAuth } from '../context/AuthContext';
import { Image as ImageIcon, MapPin, Globe, GraduationCap, Save, UploadCloud, X } from 'lucide-react';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

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
    posterUrl: '',
    posterFile: null,
    posterPreview: ''
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
        posterUrl: data.posterUrl || '',
        posterFile: null,
        posterPreview: data.posterUrl || ''
      });
    } catch (err) {
      setError('Failed to fetch event details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLocationSelect = (lat, lng) => setForm({ ...form, latitude: lat, longitude: lng });

  // Handle Drag & Drop Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size must be less than 5MB");
        return;
      }
      setForm({
        ...form,
        posterFile: file,
        posterPreview: URL.createObjectURL(file) // Generate a temporary local URL for immediate preview
      });
    }
  };

  const removeImage = () => {
    setForm({ ...form, posterFile: null, posterPreview: '' });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Get today's date formatted for the 'min' attribute
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key === 'posterFile' && form.posterFile) {
          formData.append('poster', form.posterFile); 
        } else if (key === 'posterUrl' && form.posterUrl) {
          formData.append('posterUrl', form.posterUrl);
        } else if (key !== 'posterPreview' && key !== 'posterFile' && key !== 'posterUrl') {
          formData.append(key, form[key]);
        }
      });
      formData.set('totalSeats', Number(form.totalSeats));

      await updateEvent(id, formData);
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
                    <CustomDatePicker
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={today}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Time</label>
                    <CustomTimePicker
                      name="time"
                      value={form.time}
                      onChange={handleChange}
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
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex-grow flex flex-col" style={{ minHeight: "220px" }}>
                  <label className="block text-sm font-bold text-[var(--text-secondary)] mb-2 uppercase tracking-wide justify-between flex">
                    Poster Image
                    {form.posterPreview && (
                      <button type="button" onClick={removeImage} className="text-[var(--error)] hover:underline flex items-center gap-1 text-xs">
                        <X size={12} /> Remove
                      </button>
                    )}
                  </label>
                  
                  <div 
                    className={`relative flex-grow min-h-[180px] rounded-2xl overflow-hidden transition-all duration-200 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer group ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-[var(--border)] bg-[var(--bg-surface)] hover:bg-slate-50'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      name="posterFile"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {form.posterPreview ? (
                      <div className="absolute inset-0 w-full h-full p-2">
                        <img src={form.posterPreview} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-sm" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3 text-blue-500 transition-transform group-hover:scale-110">
                           <UploadCloud size={32} />
                        </div>
                        <span className="font-bold text-[var(--text-primary)] text-sm">Click to upload or drag and drop</span>
                        <span className="text-xs text-[var(--text-muted)] mt-1 font-medium">SVG, PNG, JPG or GIF (max. 5MB)</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="text-xs text-center text-[var(--text-muted)] font-bold uppercase tracking-wider">Or Paste URL</span>
                    <input
                      type="url"
                      name="posterUrl"
                      value={form.posterUrl}
                      onChange={(e) => {
                         setForm({ ...form, posterUrl: e.target.value, posterPreview: e.target.value, posterFile: null });
                      }}
                      className="input-field !py-2 !text-sm"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
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
