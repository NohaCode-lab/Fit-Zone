// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

const Logo = () => (
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-dark/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a href="#home" className="flex items-center">
            <Logo />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
            <button className="btn-primary text-sm py-2 px-5">Join Now</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
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
                  className="text-gray-300 hover:text-primary transition-colors duration-200 font-medium px-2"
                >
                  {link.name}
                </a>
              ))}
              <button className="btn-primary text-sm py-2 px-5 w-full text-center">
                Join Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;