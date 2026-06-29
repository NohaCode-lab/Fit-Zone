// src/components/Hero.jsx
import React from 'react';
import { ArrowRight, Award, Users, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-primary/10 z-0"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-gray-200">#1 Fitness Studio in City</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              Transform Your
              <span className="gradient-text block">Body & Mind</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Join FitZone and experience world-class training, expert coaches, and a community that pushes you to become the best version of yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-primary flex items-center justify-center gap-2 group">
                Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="btn-outline">Explore Classes</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-bold text-white">5+</span>
                </div>
                <p className="text-sm text-gray-400">Years Excellence</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold text-white">2k+</span>
                </div>
                <p className="text-sm text-gray-400">Happy Members</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl font-bold text-white">24/7</span>
                </div>
                <p className="text-sm text-gray-400">Access Available</p>
              </div>
            </div>
          </div>

          {/* Hero Image / Graphic */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40 mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Fitness training"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-full">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-300">Active Members</p>
                <p className="text-xl font-bold">2,348+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;