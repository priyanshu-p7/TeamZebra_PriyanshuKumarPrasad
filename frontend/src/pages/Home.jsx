import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Rocket, 
  Search, 
  Ticket, 
  Smartphone, 
  GraduationCap, 
  BarChart, 
  ScanLine, 
  UserPlus, 
  CalendarPlus 
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full max-w-[100vw] py-20 md:py-32 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none bg-blue-600" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-sm font-semibold border border-blue-200 bg-blue-50">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-blue-700">Hyper-local event discovery platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
            Discover. <span className="text-blue-600">Book.</span> Experience.
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Find exciting events near you, book tickets instantly with QR-based entry passes, and never miss out on what matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/explore" className="btn-primary py-4 px-8 text-lg no-underline">
              <Rocket size={20} className="inline mr-2" /> Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Why <span className="text-blue-600">Eventra</span>?
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-xl mx-auto">
              Everything you need to discover, book, and manage events — in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Search size={28} className="text-blue-600" />, title: 'Discover Events', desc: 'Browse hyper-local events filtered by city, category, and date.' },
              { icon: <Ticket size={28} className="text-blue-600" />, title: 'Instant Booking', desc: 'First-come-first-serve ticket booking with real-time seat availability.' },
              { icon: <Smartphone size={28} className="text-blue-600" />, title: 'QR Entry Pass', desc: 'Get a QR-coded ticket delivered to your email for seamless entry.' },
              { icon: <GraduationCap size={28} className="text-blue-600" />, title: 'College Events', desc: 'Exclusive college-only events with automatic eligibility checks.' },
              { icon: <BarChart size={28} className="text-blue-600" />, title: 'Analytics Dashboard', desc: 'Organizers get real-time analytics on bookings and attendance.' },
              { icon: <ScanLine size={28} className="text-blue-600" />, title: 'QR Scanner', desc: 'Organizers scan QR tickets at the venue for instant check-in.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-blue-50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-white p-12 md:p-16 rounded-3xl shadow-xl border border-blue-100">
            <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">Ready to get started?</h2>
            <p className="text-lg text-slate-600 font-medium mb-10 max-w-2xl mx-auto">
              Whether you're an attendee looking for events or an organizer creating them — Eventra has you covered.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary flex items-center gap-2 py-4 px-8 text-base no-underline">
                <UserPlus size={20} /> Attendee Sign Up
              </Link>
              <Link to="/register" className="btn-secondary flex items-center gap-2 py-4 px-8 text-base no-underline">
                <CalendarPlus size={20} /> Organizer Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-300 text-sm font-semibold">
            © {new Date().getFullYear()} Eventra — Discover. Book. Experience.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
