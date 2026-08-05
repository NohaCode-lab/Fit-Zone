import React from 'react';
import { Dumbbell, Mail } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark/95 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-md opacity-70 rounded-full"></div>
                <Dumbbell className="relative w-8 h-8 text-white stroke-[1.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Fit<span className="gradient-text">Zone</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              FitZone is a next-generation AI-powered fitness platform delivering personalized workout plans, expert coaching, and data-driven progress tracking.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#instagram" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 text-gray-300 hover:text-primary transition" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="#facebook" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 text-gray-300 hover:text-primary transition" aria-label="Facebook">
                <FaFacebook size={18} />
              </a>
              <a href="#twitter" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 text-gray-300 hover:text-primary transition" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#youtube" className="p-2 bg-white/5 rounded-full hover:bg-primary/20 text-gray-300 hover:text-primary transition" aria-label="Youtube">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#home" className="hover:text-primary transition">Home</a></li>
              <li><a href="#schedule" className="hover:text-primary transition">Class Schedule</a></li>
              <li><a href="#trainers" className="hover:text-primary transition">Our Trainers</a></li>
              <li><a href="#pricing" className="hover:text-primary transition">Membership Plans</a></li>
              <li><a href="#contact" className="hover:text-primary transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Programs</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#hiit" className="hover:text-primary transition">HIIT & Cardio</a></li>
              <li><a href="#yoga" className="hover:text-primary transition">Yoga & Mindfulness</a></li>
              <li><a href="#bodybuilding" className="hover:text-primary transition">Bodybuilding</a></li>
              <li><a href="#crossfit" className="hover:text-primary transition">CrossFit Training</a></li>
              <li><a href="#ai-coaching" className="hover:text-primary transition">AI Coach Engine</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-gray-400 text-xs mb-4">
              Subscribe to get workout tips, dietary guides, and exclusive offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                />
                <button type="submit" className="absolute right-1.5 top-1.5 p-1.5 bg-primary rounded-md text-white hover:bg-primary/80 transition" aria-label="Subscribe to newsletter">
                  <Mail size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FitZone SaaS Platform. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-gray-400 transition">Privacy Policy (GDPR)</a>
            <a href="#terms" className="hover:text-gray-400 transition">Terms of Service</a>
            <a href="#cookies" className="hover:text-gray-400 transition">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
