import React from 'react';
import { ArrowRight, Award, Users, Clock, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Glow Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-primary/10 z-0"></div>
      <div className="absolute top-20 left-10 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[140px] animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-surface/80 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-border">
              <Zap className="w-4 h-4 text-secondary fill-secondary" />
              <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
                AI-Powered Performance Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">
              Transform Your
              <span className="gradient-text block mt-1">Body & Performance</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Experience world-class training programs, personalized AI fitness coaching, and a high-energy community designed to push your limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-primary flex items-center justify-center gap-2 group">
                Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline">Explore Classes</button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-black text-white">5+</span>
                </div>
                <p className="text-xs text-text-muted mt-1">Years Excellence</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-secondary">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-black text-white">2.5k+</span>
                </div>
                <p className="text-xs text-text-muted mt-1">Active Athletes</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-accent">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl font-black text-white">24/7</span>
                </div>
                <p className="text-xs text-text-muted mt-1">AI Coach Access</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-border shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/20 mix-blend-overlay z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Fitness training"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-5 rounded-2xl flex items-center gap-4 border border-border">
              <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Community Streak</p>
                <p className="text-xl font-black text-white">12,450 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
