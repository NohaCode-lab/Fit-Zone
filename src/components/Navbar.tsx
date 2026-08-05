import React, { useState } from 'react';
import { Menu, X, Dumbbell, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { LoginModal } from '../features/auth/components/LoginModal';

interface NavLink {
  name: string;
  href: string;
}

const Logo: React.FC = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-md opacity-70 group-hover:opacity-100 transition-opacity rounded-full"></div>
      <Dumbbell className="relative w-8 h-8 text-white stroke-[1.5]" />
    </div>
    <span className="text-2xl font-black tracking-tight">
      Fit<span className="gradient-text">Zone</span>
    </span>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/#home' },
    { name: 'Schedule', href: '/#schedule' },
    { name: 'Trainers', href: '/#trainers' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <nav className="fixed w-full z-40 bg-dark/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-primary transition-colors duration-200 font-medium text-sm"
                >
                  {link.name}
                </a>
              ))}

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-white transition"
                  >
                    <LayoutDashboard size={14} /> {user?.firstName || 'Dashboard'}
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-white/5 transition"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="btn-primary text-sm py-2 px-5 flex items-center gap-2"
                >
                  <UserIcon size={16} /> Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <div className="flex flex-col space-y-4 pb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 font-medium px-2 text-sm"
                  >
                    {link.name}
                  </a>
                ))}
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary text-sm py-2 px-5 w-full text-center block"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="btn-primary text-sm py-2 px-5 w-full text-center"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Dialog Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
