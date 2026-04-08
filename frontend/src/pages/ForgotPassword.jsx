import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import PasswordInput from '../components/PasswordInput';
import { Lock, Mail, Key } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: code + new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMessage({ type: 'success', text: data.message });
      setStep(2);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/reset-password', {
        email,
        code,
        newPassword,
      });
      setMessage({ type: 'success', text: data.message });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--primary)' }} />

      <div className="w-full max-w-md animate-slideUp">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
               <Lock className="text-[var(--primary)]" size={32} />
             </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {step === 1 ? 'Forgot Password' : 'Reset Password'}
          </h1>
          <p className="text-[var(--text-secondary)]">
            {step === 1
              ? "Enter your email and we'll send you a reset code"
              : 'Enter the code from your email and your new password'}
          </p>
        </div>

        <div className="card p-8 md:p-10 shadow-lg">
          {message.text && (
            <div
              className="mb-4 p-3 rounded-lg text-sm"
              style={{
                background: message.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                color: message.type === 'success' ? 'var(--success)' : 'var(--error)',
              }}
            >
              {message.text}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendCode} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Mail size={18} /> Send Reset Code</>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  className="input-field"
                  disabled
                  style={{ opacity: 0.6 }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">6-digit Reset Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="input-field text-center tracking-[0.5em] font-bold text-lg"
                  placeholder="• • • • • •"
                  maxLength={6}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">New Password</label>
                <PasswordInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Confirm New Password</label>
                <PasswordInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Key size={18} /> Reset Password</>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--primary-light)] bg-transparent border-none cursor-pointer"
              >
                ← Resend code to a different email
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Remember your password?{' '}
            <Link to="/login" className="text-[var(--primary-light)] hover:underline no-underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
