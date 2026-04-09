import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { 
  Ticket, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  PlusCircle, 
  ScanLine, 
  Search, 
  CalendarHeart,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <div className={`fixed w-full top-0 z-[100] transition-all duration-500 ${scrolled ? 'md:top-4 md:px-6' : 'md:top-6 md:px-8'}`}>
      <nav className={`mx-auto max-w-7xl transition-all duration-500
        ${scrolled 
          ? 'bg-slate-100/75 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200/50 md:rounded-3xl' 
          : 'bg-slate-50/50 backdrop-blur-xl shadow-lg border border-slate-200/40 md:rounded-[2rem]'
        }
      `}>
        <div className="px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            
            {/* Premium Agency-Style Geometric Logo Block */}
            <Link to="/" className="flex items-center gap-3.5 no-underline group relative">
              
              {/* Geometric Brand Icon */}
              <div className="relative flex items-center justify-center w-11 h-11">
                 <div className="absolute inset-0 bg-indigo-200 rounded-xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 opacity-60 mix-blend-multiply"></div>
                 <div className="absolute inset-0 bg-[#4F47E5] rounded-xl transform rotate-3 group-hover:rotate-12 transition-all duration-500 shadow-md flex items-center justify-center overflow-hidden">
                   {/* Abstract internal slash for energy */}
                   <div className="w-[150%] h-1 bg-white/20 transform -rotate-45 absolute group-hover:translate-x-4 transition-transform duration-700"></div>
                 </div>
                 <div className="absolute inset-1 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-inner transform group-hover:scale-95 transition-transform duration-500">
                    <span className="text-[#4F47E5] font-black text-xl italic tracking-tighter">E</span>
                 </div>
              </div>

              {/* Minimalist Structured Typography */}
              <div className="flex flex-col justify-center translate-y-[-1px]">
                <span className="text-[26px] font-extrabold tracking-[-0.05em] text-slate-900 group-hover:text-[#4F47E5] transition-colors duration-500 leading-none">
                  Eventify
                </span>
                <span className="text-[9px] font-black tracking-[0.25em] text-slate-400 uppercase mt-1 group-hover:text-indigo-400 transition-colors leading-none ml-[2px]">
                  Platform
                </span>
              </div>

            </Link>

            {/* Premium Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              
              <Link to="/explore" className="relative group px-4 py-2.5 flex items-center gap-2 text-slate-700 font-bold text-[15px] tracking-wide transition-colors hover:text-indigo-700 rounded-xl overflow-hidden no-underline">
                <div className="absolute inset-0 bg-indigo-50/80 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-xl z-0"></div>
                <span className="relative z-10 flex items-center gap-2"><Search size={18} className="group-hover:-translate-y-1 group-hover:text-indigo-600 transition-transform duration-300" /> Explore</span>
              </Link>

              {user ? (
                <>
                  {user.role === 'attendee' && (
                    <Link to="/my-tickets" className="relative group px-4 py-2.5 flex items-center gap-2 text-slate-700 font-bold text-[15px] tracking-wide transition-colors hover:text-indigo-700 rounded-xl overflow-hidden no-underline">
                      <div className="absolute inset-0 bg-indigo-50/80 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-xl z-0"></div>
                      <span className="relative z-10 flex items-center gap-2"><CalendarHeart size={18} className="group-hover:scale-110 group-hover:text-indigo-600 transition-transform duration-300" /> My Tickets</span>
                    </Link>
                  )}
                  {user.role === 'organizer' && (
                    <>
                      <Link to="/dashboard" className="relative group px-3 py-2.5 flex items-center gap-2 text-slate-700 font-bold text-[15px] tracking-wide transition-colors hover:text-indigo-700 rounded-xl overflow-hidden no-underline">
                         <div className="absolute inset-0 bg-indigo-50/80 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-xl z-0"></div>
                         <span className="relative z-10 flex items-center gap-2"><LayoutDashboard size={18} className="group-hover:rotate-12 transition-transform duration-300" /> Dashboard</span>
                      </Link>
                      <Link to="/create-event" className="relative group px-3 py-2.5 flex items-center gap-2 text-slate-700 font-bold text-[15px] tracking-wide transition-colors hover:text-indigo-700 rounded-xl overflow-hidden no-underline">
                         <div className="absolute inset-0 bg-indigo-50/80 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-xl z-0"></div>
                         <span className="relative z-10 flex items-center gap-2"><PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-500" /> Create</span>
                      </Link>
                      <Link to="/scan" className="relative group px-3 py-2.5 flex items-center gap-2 text-slate-700 font-bold text-[15px] tracking-wide transition-colors hover:text-indigo-700 rounded-xl overflow-hidden no-underline">
                         <div className="absolute inset-0 bg-indigo-50/80 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-xl z-0"></div>
                         <span className="relative z-10 flex items-center gap-2"><ScanLine size={18} className="group-hover:animate-pulse transition-transform duration-300 text-rose-500" /> Scan QR</span>
                      </Link>
                    </>
                  )}
                  
                  {/* User Profile Block */}
                  <div className="relative flex items-center gap-3 ml-4 pl-6 border-l-2 border-slate-200">
                    <button 
                      onClick={() => setDropdownOpen(!dropdownOpen)} 
                      className="flex items-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full pr-4 pl-1 py-1 cursor-pointer transition-all hover:shadow-md group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-black text-white shadow-inner bg-[#4F47E5] group-hover:scale-105 transition-transform duration-300">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{user.name.split(' ')[0]}</span>
                      <div className={`transition-transform duration-300 text-slate-400 ${dropdownOpen ? 'rotate-180' : ''}`}>
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </button>

                    {/* Animated Dropdown Menu */}
                    {dropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                        
                        <div className="absolute right-0 top-full mt-4 w-64 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white p-2 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                          <div className="px-5 py-4 border-b border-slate-100 mb-2 bg-slate-50/50 rounded-t-2xl">
                            <p className="text-base font-black text-slate-900 truncate mb-0.5">{user.name}</p>
                            <p className="text-xs text-slate-500 font-medium truncate mb-2">{user.email}</p>
                            <span className="inline-flex items-center px-2 py-1 rounded text-[10px] uppercase tracking-widest font-black bg-indigo-100 text-indigo-700">
                              {user.role}
                            </span>
                          </div>
                          
                          <div className="p-1">
                            <button 
                              onClick={handleLogout} 
                              className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-2xl transition-colors cursor-pointer border-none bg-transparent group"
                            >
                              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3 ml-4">
                  <Link to="/login" className="text-slate-600 font-bold hover:text-indigo-600 text-[15px] transition-colors no-underline px-4 py-2 rounded-xl hover:bg-slate-50">
                    Log In
                  </Link>
                  <Link to="/register" className="bg-slate-900 hover:bg-black text-white font-bold text-[15px] py-2.5 px-6 rounded-xl transition-all hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 no-underline">
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger with Micro-interactions */}
            <button
              className="md:hidden relative w-12 h-12 bg-white/50 border border-slate-200 backdrop-blur text-slate-800 cursor-pointer rounded-2xl flex items-center justify-center hover:bg-white transition-all shadow-sm focus:outline-none z-50 overflow-hidden group"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative z-10 transition-transform duration-500">
                {mobileOpen ? <X size={26} className="text-slate-800 rotate-90 animate-in fade-in spin-in-90" /> : <Menu size={26} className="text-slate-800 animate-in fade-in" />}
              </div>
            </button>
          </div>

          {/* Full Screen Animated Mobile Menu Overlay */}
          {mobileOpen && (
            <div className="md:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white p-6 animate-in slide-in-from-top-4 fade-in duration-300 z-40">
              <div className="flex flex-col gap-2">
                <Link to="/explore" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl p-4 no-underline text-lg font-bold transition-all group">
                  <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors"><Search size={20} /></div>
                  Explore Events
                </Link>
                
                {user ? (
                  <>
                    {user.role === 'attendee' && (
                      <Link to="/my-tickets" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl p-4 no-underline text-lg font-bold transition-all group">
                         <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors"><CalendarHeart size={20} /></div>
                         My Tickets
                      </Link>
                    )}
                    {user.role === 'organizer' && (
                      <>
                        <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl p-4 no-underline text-lg font-bold transition-all group">
                          <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors"><LayoutDashboard size={20} /></div>
                          Dashboard
                        </Link>
                        <Link to="/create-event" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl p-4 no-underline text-lg font-bold transition-all group">
                           <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors"><PlusCircle size={20} /></div>
                           Create Event
                        </Link>
                        <Link to="/scan" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl p-4 no-underline text-lg font-bold transition-all group">
                           <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors"><ScanLine size={20} className="text-rose-500" /></div>
                           Scan Tickets
                        </Link>
                      </>
                    )}
                    <div className="w-full h-px bg-slate-100 my-4"></div>
                    <button onClick={handleLogout} className="flex items-center gap-4 w-full text-left text-rose-600 hover:bg-rose-50 rounded-2xl p-4 bg-transparent border-none cursor-pointer text-lg font-bold transition-all group">
                      <div className="w-10 h-10 rounded-full bg-rose-50 group-hover:bg-white flex items-center justify-center transition-colors"><LogOut size={20} /></div>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl w-full text-center py-4 text-lg transition-colors no-underline">
                      Log In
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl w-full text-center py-4 text-lg transition-colors shadow-lg shadow-indigo-600/30 no-underline">
                      Sign Up Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
