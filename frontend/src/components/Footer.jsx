import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const BrandTwitter = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733-16z" /><path d="M4 20l6.768-6.768m2.46-2.46L20 4" /></svg>;
const BrandInstagram = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const BrandFacebook = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const BrandYoutube = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

const Footer = () => {
  return (
    <footer className="bg-[#4F46E5] text-white pt-20 pb-0 overflow-hidden flex-shrink-0 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Left Col - Brand & Socials */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#4F46E5]">
                <Ticket size={24} className="transform -rotate-12" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">Eventify</span>
            </div>
            
            <div className="mb-6">
              <p className="text-indigo-200 text-sm font-semibold mb-3">Language</p>
              <button className="flex items-center justify-between w-48 bg-black/10 hover:bg-black/20 transition-colors px-4 py-2.5 rounded-lg text-sm font-medium">
                <span>English, USA</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>

            <div>
              <p className="text-indigo-200 text-sm font-semibold mb-3">Social</p>
              <div className="flex items-center gap-4 text-white">
                <a href="#" className="hover:text-white/80 transition-colors"><BrandTwitter size={20} /></a>
                <a href="#" className="hover:text-white/80 transition-colors"><BrandInstagram size={20} /></a>
                <a href="#" className="hover:text-white/80 transition-colors"><BrandFacebook size={20} /></a>
                <a href="#" className="hover:text-white/80 transition-colors"><BrandYoutube size={20} /></a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[#a5b4fc] text-sm font-bold mb-5 tracking-wide">Product</h4>
              <ul className="space-y-4">
                <li><Link to="/explore" className="text-white hover:underline font-medium text-sm">Explore Events</Link></li>
                <li><Link to="/register" className="text-white hover:underline font-medium text-sm">Create Event</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Pricing</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">App Directory</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#a5b4fc] text-sm font-bold mb-5 tracking-wide">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">About</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Jobs</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Brand</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Newsroom</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#a5b4fc] text-sm font-bold mb-5 tracking-wide">Resources</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Support</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Safety</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Blog</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Feedback</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Developers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#a5b4fc] text-sm font-bold mb-5 tracking-wide">Policies</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Terms</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Privacy</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Cookie Settings</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Guidelines</Link></li>
                <li><Link to="/" className="text-white hover:underline font-medium text-sm">Licences</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Massive Background Typography - Separated to avoid overlap! */}
      <div className="w-full flex justify-center mt-[-2rem] pointer-events-none relative z-0 select-none overflow-hidden pb-4">
        <span className="text-[120px] sm:text-[180px] md:text-[240px] lg:text-[280px] font-black tracking-tighter leading-[0.8] text-[#e0e7ff] opacity-90 mx-auto w-full text-center whitespace-nowrap px-4 ml-[-1rem]">
          Eventify
        </span>
      </div>
    </footer>
  );
};

export default Footer;
