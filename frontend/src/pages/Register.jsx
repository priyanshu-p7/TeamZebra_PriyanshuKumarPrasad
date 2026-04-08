import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordInput from '../components/PasswordInput';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'attendee',
    college: '',
    city: '',
    organizerType: 'independent',
    organization: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = await register(form);
      if (data.user.role === 'organizer') {
        navigate('/dashboard');
      } else {
        navigate('/explore');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent)' }} />

      <div className="w-full max-w-md animate-slideUp">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🚀</div>
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-[var(--text-secondary)]">Join Eventra and start exploring events</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm text-[var(--error)]" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Password</label>
              <PasswordInput
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Confirm Password</label>
              <PasswordInput
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">I am a</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input-field cursor-pointer"
              >
                <option value="attendee">🎟️ Attendee — I want to discover & book events</option>
                <option value="organizer">🎤 Organizer — I want to create & manage events</option>
              </select>
            </div>

            {/* Organizer-specific fields */}
            {form.role === 'organizer' && (
              <>
                <div className="p-4 rounded-xl flex flex-col gap-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  <p className="text-xs text-[var(--primary-light)] uppercase tracking-wider font-semibold">🎤 Organizer Details</p>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">I organize events as</label>
                    <select
                      name="organizerType"
                      value={form.organizerType}
                      onChange={handleChange}
                      className="input-field cursor-pointer"
                    >
                      <option value="independent">👤 Independent — I organize events on my own</option>
                      <option value="organization">🏢 Organization — I represent a club, company, or group</option>
                    </select>
                  </div>

                  {form.organizerType === 'organization' && (
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Organization / Club Name</label>
                      <input
                        type="text"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g., Google Developer Club, IEEE Chapter"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Short Bio <span className="text-[var(--text-muted)]">(optional)</span>
                    </label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      className="input-field"
                      rows="2"
                      placeholder="Tell attendees a bit about yourself or your organization..."
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">College</label>
              <input
                type="text"
                name="college"
                value={form.college}
                onChange={handleChange}
                className="input-field"
                placeholder="Your college name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">City <span className="text-[var(--text-muted)]">(optional)</span></label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="input-field"
                placeholder="Your city"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Create Account</>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--primary-light)] hover:underline no-underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
