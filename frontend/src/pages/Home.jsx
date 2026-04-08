import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--primary)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center animate-slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--primary-light)' }}>
              <span>✨</span>
              <span>Hyper-local event discovery platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[var(--text-primary)]">Discover.</span>{' '}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Book.</span>{' '}
              <span className="text-[var(--text-primary)]">Experience.</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Find exciting events near you, book tickets instantly with QR-based entry passes, and never miss out on what matters.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/explore" className="btn-primary text-lg !py-4 !px-8 no-underline animate-pulse-glow">
                🚀 Explore Events
              </Link>
              {!user && (
                <Link to="/register" className="btn-secondary text-lg !py-4 !px-8 no-underline">
                  Join Eventra →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ background: 'var(--gradient-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Eventra</span>?
          </h2>
          <p className="text-center text-[var(--text-secondary)] mb-16 max-w-xl mx-auto">
            Everything you need to discover, book, and manage events — in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔍', title: 'Discover Events', desc: 'Browse hyper-local events filtered by city, category, and date.' },
              { icon: '🎫', title: 'Instant Booking', desc: 'First-come-first-serve ticket booking with real-time seat availability.' },
              { icon: '📱', title: 'QR Entry Pass', desc: 'Get a QR-coded ticket delivered to your email for seamless entry.' },
              { icon: '🎓', title: 'College Events', desc: 'Exclusive college-only events with automatic eligibility checks.' },
              { icon: '📊', title: 'Analytics Dashboard', desc: 'Organizers get real-time analytics on bookings and attendance.' },
              { icon: '📷', title: 'QR Scanner', desc: 'Organizers scan QR tickets at the venue for instant check-in.' },
            ].map((feature, i) => (
              <div
                key={i}
                className="card p-6 hover:!border-[rgba(99,102,241,0.3)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="card p-12" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(167,139,250,0.05))', border: '1px solid rgba(99,102,241,0.2)' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              Whether you're an attendee looking for events or an organizer creating them — Eventra has you covered.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary !py-3 !px-8 no-underline">
                🎟️ Attendee Sign Up
              </Link>
              <Link to="/register" className="btn-secondary !py-3 !px-8 no-underline">
                🎤 Organizer Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[var(--text-muted)] text-sm">
            © {new Date().getFullYear()} Eventra — Discover. Book. Experience.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
