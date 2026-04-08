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
  CalendarPlus,
  ArrowRight,
  Zap
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden w-full max-w-[100vw] py-28 md:py-40 bg-white">
        {/* Gradient background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none bg-gradient-to-b from-blue-600 to-cyan-400" />
        <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none bg-purple-600" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slideUp">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-10 text-sm font-semibold border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <Sparkles size={16} className="text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Hyper-local event discovery platform</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">Discover.</span> 
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mt-2">Book. Experience.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            Find exciting events near you, book tickets instantly with QR-based entry passes, and never miss out on what matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/explore" className="btn-primary py-4 px-8 text-lg animate-pulse-glow no-underline group">
              <Rocket size={22} className="group-hover:animate-float" /> Explore Events
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/register" className="btn-secondary py-4 px-8 text-lg no-underline">
              Get Started <Zap size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold border border-blue-200 bg-blue-50">
              <Zap size={14} className="text-blue-600" />
              <span className="text-blue-700">Our Features</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              Why <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Eventra</span>?
            </h2>
            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
              Everything you need to discover, book, and manage events — all in one powerful platform.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              { 
                icon: <Search size={32} className="text-white" />, 
                title: 'Discover Events', 
                desc: 'Browse hyper-local events filtered by city, category, and date.',
                color: 'bg-gradient-to-br from-blue-600 to-blue-700'
              },
              { 
                icon: <Ticket size={32} className="text-white" />, 
                title: 'Instant Booking', 
                desc: 'First-come-first-serve ticket booking with real-time seat availability.',
                color: 'bg-gradient-to-br from-cyan-500 to-blue-600'
              },
              { 
                icon: <Smartphone size={32} className="text-white" />, 
                title: 'QR Entry Pass', 
                desc: 'Get a QR-coded ticket delivered to your email for seamless entry.',
                color: 'bg-gradient-to-br from-purple-600 to-blue-600'
              },
              { 
                icon: <GraduationCap size={32} className="text-white" />, 
                title: 'College Events', 
                desc: 'Exclusive college-only events with automatic eligibility checks.',
                color: 'bg-gradient-to-br from-amber-500 to-orange-600'
              },
              { 
                icon: <BarChart size={32} className="text-white" />, 
                title: 'Analytics Dashboard', 
                desc: 'Organizers get real-time analytics on bookings and attendance.',
                color: 'bg-gradient-to-br from-emerald-600 to-teal-600'
              },
              { 
                icon: <ScanLine size={32} className="text-white" />, 
                title: 'QR Scanner', 
                desc: 'Organizers scan QR tickets at the venue for instant check-in.',
                color: 'bg-gradient-to-br from-rose-600 to-pink-600'
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card p-8 md:p-10 bg-white group hover:shadow-2xl transition-all duration-500"
                style={{ 
                  animationDelay: `${i * 80}ms`,
                  animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
              >
                {/* Icon container */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${feature.color} shadow-lg mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: '5K+', label: 'Events Hosted' },
              { number: '50K+', label: 'Happy Users' },
              { number: '100%', label: 'Secure Bookings' },
            ].map((stat, i) => (
              <div key={i} className="text-center text-white">
                <div className="text-5xl md:text-6xl font-black mb-3">{stat.number}</div>
                <p className="text-lg opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-16 md:p-20 border-0 shadow-2xl bg-gradient-to-br from-slate-50 to-white">
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-center">
              Ready to get started?
            </h2>
            <p className="text-xl text-slate-600 font-medium mb-12 max-w-3xl mx-auto text-center">
              Whether you're an attendee looking for exciting events or an organizer creating unforgettable experiences — Eventra is your perfect platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/register" className="btn-primary flex items-center gap-2 py-4 px-8 text-lg no-underline">
                <UserPlus size={22} /> Attendee Sign Up
              </Link>
              <Link to="/register" className="btn-secondary flex items-center gap-2 py-4 px-8 text-lg no-underline">
                <CalendarPlus size={22} /> Organizer Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-300 font-semibold mb-4 md:mb-0">
              © {new Date().getFullYear()} Eventra — Discover. Book. Experience.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
