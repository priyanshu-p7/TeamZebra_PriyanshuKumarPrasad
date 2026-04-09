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
  Calendar,
  MapPin,
  CheckCircle,
  Bell
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col flex-grow">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full max-w-[100vw] pt-16 pb-20 bg-[#f8fafc]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          <div className="text-[10px] sm:text-[11px] font-black text-slate-400 tracking-[0.25em] mb-4 uppercase">
            Create & Share
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold mb-5 leading-[1.1] tracking-tight text-[#0f172a] max-w-3xl">
            Create stunning local event <span className="text-[#1e293b]">experiences</span> in seconds
          </h1>

          <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mb-8 leading-relaxed">
            EVENTIFY is your all-in-one platform—find incredible local experiences, manage your attendees flawlessly, and share your events with the world.
          </p>

          <Link to="/explore" className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold py-3.5 px-8 rounded-xl text-lg shadow-[0_15px_30px_-5px_rgba(30,41,59,0.3)] transition-all transform hover:-translate-y-1 mb-16 no-underline inline-block">
            Let's Get Started!
          </Link>

          {/* Epic Showcase Browser Mockup */}
          <div className="relative w-full max-w-4xl mx-auto perspective-1000 mt-4">
             
            {/* The Floating Browser Window */}
            <div className="relative z-10 w-full bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200/80 transition-all duration-700 group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
               {/* Browser Header */}
               <div className="h-10 bg-[#f1f5f9] border-b border-slate-200 flex items-center px-4 gap-2">
                 <div className="flex gap-1.5 shrink-0">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                 </div>
                 <div className="mx-auto bg-white px-3 py-1 rounded text-[9px] text-slate-400 font-bold flex items-center gap-1 shadow-sm mr-8">
                   <span>🔒</span> go.eventify.com/summer-fiesta
                 </div>
               </div>
               
               {/* Top Banner Content */}
               <div className="p-6 md:p-10 bg-[#0f172a] text-white flex flex-col md:flex-row gap-8 items-center border-b-[8px] border-[var(--primary)]">
                 <div className="w-40 h-40 md:w-56 md:h-56 rounded-xl overflow-hidden shrink-0 shadow-2xl relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
                 </div>
                 
                 <div className="text-left w-full">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Summer Fiesta '26</h2>
                    <div className="flex gap-8">
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest mb-1.5"><Ticket size={12} className="text-emerald-400" /> Tickets Sold</p>
                         <p className="text-2xl font-bold text-emerald-400 leading-none">1,402 <span className="text-sm text-slate-500">/ 1,500</span></p>
                       </div>
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest mb-1.5"><ScanLine size={12} className="text-sky-400" /> Checked In</p>
                         <p className="text-2xl font-bold text-sky-400 leading-none">891</p>
                       </div>
                    </div>
                 </div>
               </div>
               
               {/* Lower Content */}
               <div className="bg-white p-6 md:p-10 flex flex-col md:flex-row gap-8">
                 <div className="w-full md:w-2/3 text-left">
                   <h3 className="text-lg font-bold text-slate-800 mb-2">Description</h3>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">Join us for the most epic summer gathering featuring live music, food stalls, and interactive tech exhibits. Get your tickets before they completely sell out! Event runs entirely through Eventify's secure QR ticketing system.</p>
                 </div>
                 <div className="w-full md:w-1/3">
                   <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col gap-3">
                     <p className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 mb-1">Details</p>
                     <div className="flex items-center gap-3 text-sm font-medium text-slate-600"><Calendar size={16} /> Aug 15th</div>
                     <div className="flex items-center gap-3 text-sm font-medium text-slate-600"><MapPin size={16} /> Central Park</div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Widget 1: Left Skewed Dashboard Card */}
            <div className="absolute -left-4 md:-left-20 top-20 md:top-40 z-20 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 rotate-[-8deg] transform hover:rotate-[-2deg] transition-transform duration-500 w-56 md:w-64">
               <p className="text-[9px] font-bold text-slate-400 tracking-[0.1em] uppercase mb-4">Live Check-ins</p>
               <div className="relative w-full h-16 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 mb-4 p-2">
                 <div className="absolute left-2 bottom-2 w-4 h-8 bg-sky-200 rounded-sm"></div>
                 <div className="absolute left-8 bottom-2 w-4 h-12 bg-sky-300 rounded-sm"></div>
                 <div className="absolute left-14 bottom-2 w-4 h-6 bg-sky-200 rounded-sm"></div>
                 <div className="absolute left-20 bottom-2 w-4 h-10 bg-[var(--primary)] rounded-sm"></div>
               </div>
               <div className="flex items-center justify-center text-xs font-bold text-slate-800">
                 Scanning Active...
               </div>
               
               {/* Arrow decoration */}
               <div className="absolute -top-12 -right-8 opacity-30 text-slate-400 hidden md:block">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="rotate-[120deg]">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
               </div>
            </div>

            {/* Widget 2: Right Skewed Ticket Mock */}
            <div className="absolute -right-4 md:-right-16 top-64 md:top-80 z-20 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 rotate-[6deg] transform hover:rotate-[2deg] transition-transform duration-500 w-56 md:w-64">
               <p className="text-[9px] font-bold text-slate-400 tracking-[0.1em] uppercase mb-4 flex items-center gap-1.5"><Ticket size={12} /> Your QR Pass</p>
               <div className="w-full flex justify-center mb-4">
                 <div className="w-24 h-24 bg-white border border-slate-200 p-1 flex flex-wrap shadow-sm">
                   {[...Array(16)].map((_, i) => (
                     <div key={i} className={`w-1/4 h-1/4 ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                   ))}
                 </div>
               </div>
               <div className="border-t border-dashed border-slate-300 pt-3 flex justify-between items-center text-xs font-bold">
                 <span className="text-slate-500">Alex M.</span>
                 <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">Confirmed</span>
               </div>
               
               {/* Arrow decoration */}
               <div className="absolute -top-10 -left-6 opacity-30 text-slate-400 hidden md:block">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="rotate-[-40deg]">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Epic Modern Bento Grid Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Why <span className="text-blue-600">Eventify</span>?
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-xl mx-auto">
              Everything you need to discover, book, and manage events — seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
            
            {/* Card 1: Discover. Large square 2x2. */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#4F46E5] to-[#7c3aed] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Search size={28} className="text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">Discover Incredible <br/>Experiences</h3>
                  <p className="text-indigo-100 font-medium text-base md:text-lg leading-relaxed max-w-sm">Browse hyper-local events filtered by city, category, and date. Your next unforgettable moment is waiting.</p>
                </div>
                
                {/* Decorative Mockup */}
                <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 transform translate-y-12 opacity-80 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                   <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-indigo-500 rounded-xl overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-indigo-400"></div>
                      </div>
                      <div className="flex-1">
                        <div className="w-40 h-3 bg-white/40 rounded-full mb-3"></div>
                        <div className="w-24 h-2 bg-white/20 rounded-full mb-3"></div>
                        <div className="flex gap-2">
                          <div className="w-10 h-6 bg-white/20 rounded"></div>
                          <div className="w-10 h-6 bg-white/20 rounded"></div>
                        </div>
                      </div>
                      <div className="w-16 h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                        Details
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Card 2: Instant Booking */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-white border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden group shadow-md hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 relative z-10 shadow-sm">
                <Ticket size={24} className="text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">Instant Booking</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed relative z-10 w-11/12">First-come-first-serve real-time ticketing with guaranteed locks.</p>
            </div>

            {/* Card 3: QR Entry Pass */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-[#1e293b] rounded-[2rem] p-8 relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 group-hover:opacity-10 group-hover:-rotate-12 transition-all duration-700">
                <Smartphone size={160} className="text-white" />
              </div>
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-5 border border-slate-700 shadow-inner group-hover:bg-slate-700 transition-colors">
                <Smartphone size={24} className="text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">QR Entry Mobile Pass</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed relative z-10">Receive a secure QR-coded ticket directly in your dashboard.</p>
            </div>

            {/* Card 4: Analytics Wide */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-md hover:shadow-xl hover:border-emerald-200 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 hover:-translate-y-1">
              <div className="flex-1 text-center md:text-left">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex justify-center items-center mb-5 group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-300 mx-auto md:mx-0 shadow-sm">
                  <BarChart size={24} className="text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Live Organiser Analytics</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto md:mx-0">Organizers access real-time charts on booking conversion and gate attendance.</p>
              </div>
              <div className="hidden md:block w-40 h-28 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden group-hover:rotate-[-4deg] group-hover:scale-105 transition-transform duration-500 shadow-inner">
                 {/* Internal Chart Bars mapped to hover state */}
                 <div className="absolute bottom-0 left-0 w-full h-px bg-slate-200"></div>
                 <div className="absolute bottom-0 left-4 w-6 h-8 bg-emerald-200 rounded-t-sm group-hover:h-12 transition-all duration-[400ms] delay-75"></div>
                 <div className="absolute bottom-0 left-12 w-6 h-16 bg-emerald-300 rounded-t-sm group-hover:h-[4.5rem] transition-all duration-[400ms] delay-100"></div>
                 <div className="absolute bottom-0 left-20 w-6 h-10 bg-emerald-400 rounded-t-sm group-hover:h-16 transition-all duration-[400ms] delay-150"></div>
                 <div className="absolute bottom-0 left-28 w-6 h-20 bg-emerald-500 rounded-t-sm group-hover:h-[6.5rem] transition-all duration-[400ms] delay-200"></div>
              </div>
            </div>

            {/* Card 5: College Events */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-gradient-to-tr from-slate-50 to-slate-100 border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-slate-100 group-hover:-translate-y-1 transition-transform">
                <GraduationCap size={24} className="text-slate-800" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Campus Events</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed w-11/12">Lock events dynamically to verified university email handlers instantly.</p>
            </div>

            {/* Card 6: QR Scanner */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-gradient-to-br from-rose-50 to-white border border-rose-100 rounded-[2rem] p-8 relative overflow-hidden group shadow-md hover:shadow-xl hover:border-rose-200 transition-all duration-500 hover:-translate-y-1">
              {/* Fake scanner laser */}
              <div className="absolute -left-full top-1/2 w-[300%] h-0.5 bg-rose-400 blur-[1px] rotate-[15deg] group-hover:translate-y-[-40px] translate-y-10 group-hover:animate-none transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>
              
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-rose-50 group-hover:-translate-y-1 transition-transform relative z-10">
                <ScanLine size={24} className="text-rose-500 group-hover:text-rose-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">Lightning Check-In</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed relative z-10 w-11/12">A lightning-fast organizer gate scanner preventing fraud automatically.</p>
            </div>

            {/* Card 7: Smart Reminders (Fills the empty space) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100/50 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 hover:-translate-y-1">
              <div className="flex-1 text-center md:text-left relative z-10">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex justify-center items-center mb-5 group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300 mx-auto md:mx-0 shadow-sm">
                  <Bell size={24} className="text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Smart Notifications</h3>
                <p className="text-sm text-amber-700/80 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">Automated email notifications ensure your attendees never miss an update, ticket delivery, or event kickoff.</p>
              </div>
              {/* Graphic bell ring wave */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700 hidden md:flex items-center justify-center mr-8">
                <div className="absolute inset-0 border-4 border-amber-400 rounded-full group-hover:animate-ping opacity-0 group-hover:opacity-40" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-4 border-4 border-amber-400 rounded-full group-hover:animate-ping opacity-0 group-hover:opacity-20" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                <div className="absolute inset-16 bg-amber-400 rounded-full"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-b border-slate-100 pb-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-white p-12 md:p-16 rounded-3xl shadow-xl border border-blue-100">
            <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">Ready to get started?</h2>
            <p className="text-lg text-slate-600 font-medium mb-10 max-w-2xl mx-auto">
              Whether you're an attendee looking for events or an organizer creating them — Eventify has you covered.
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
    </div>
  );
};

export default Home;
