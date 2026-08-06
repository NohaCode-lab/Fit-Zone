import React, { useState } from 'react';
import { Menu, X, Dumbbell, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { LoginModal } from '../features/auth/components/LoginModal';

interface NavLink {
  name: string;
  href: string;
  targetId: string;
}

const Logo: React.FC = () => (
  <div className="flex items-center gap-2.5 group cursor-pointer">
    <div className="relative">
      <div className="absolute inset-0 bg-cta-gradient blur-md opacity-70 group-hover:opacity-100 transition-opacity rounded-full"></div>
      <Dumbbell className="relative w-8 h-8 text-primary stroke-[2]" />
    </div>
    <span className="text-2xl font-black tracking-tight text-white">
      Fit<span className="gradient-text">Zone</span>
    </span>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/#home', targetId: 'home' },
    { name: 'Schedule', href: '/#schedule', targetId: 'schedule' },
    { name: 'Trainers', href: '/#trainers', targetId: 'trainers' },
    { name: 'Pricing', href: '/#pricing', targetId: 'pricing' },
    { name: 'Contact', href: '/#contact', targetId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + link.targetId);
    } else {
      const el = document.getElementById(link.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="fixed w-full z-40 bg-dark/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" onClick={(e) => handleNavClick(e as any, navLinks[0])} className="flex items-center">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-text-secondary hover:text-primary transition-colors duration-200 font-bold text-sm"
                >
                  {link.name}
                </a>
              ))}

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface/80 border border-border rounded-full text-xs font-black text-white transition shadow-sm"
                  >
                    <LayoutDashboard size={14} className="text-primary" /> {user?.firstName || 'Dashboard'}
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 text-text-muted hover:text-error rounded-full hover:bg-surface transition"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="btn-primary text-sm py-2.5 px-6 flex items-center gap-2 font-black"
                >
                  <UserIcon size={16} /> Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text-secondary hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border bg-dark/95">
              <div className="flex flex-col space-y-4 pb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-text-secondary hover:text-primary transition-colors duration-200 font-bold px-2 text-sm"
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
