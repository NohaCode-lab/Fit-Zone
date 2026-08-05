import React from 'react';
import { Activity, Flame, Award, Dumbbell, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import { useAuth } from '../auth/hooks/useAuth';

export const DashboardView: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="glass-card p-8 rounded-3xl mb-8 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-primary text-xs font-bold uppercase tracking-wider">Member Control Center</span>
          <h1 className="text-3xl md:text-4xl font-black mt-1">
            Welcome Back, <span className="gradient-text">{user?.firstName || 'Valued Member'}</span>!
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your active goals, workout streaks, and personal AI coach recommendations.</p>
        </div>
        <button className="btn-primary py-3 px-6 text-sm font-bold flex items-center gap-2">
          <Dumbbell size={18} /> Start Todays Session
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-xl text-primary">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Calories Burned</p>
            <p className="text-2xl font-bold">14,250 <span className="text-xs font-normal text-gray-400">kcal</span></p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-accent/20 rounded-xl text-accent">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Workout Streak</p>
            <p className="text-2xl font-bold">12 <span className="text-xs font-normal text-gray-400">days</span></p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Active Membership</p>
            <p className="text-xl font-bold">Pro Athlete Pass</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Booked Sessions</p>
            <p className="text-2xl font-bold">3 <span className="text-xs font-normal text-gray-400">upcoming</span></p>
          </div>
        </div>
      </div>

      {/* Analytics & Recommendations Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Workout Logs</h3>
            <button className="text-primary text-xs font-semibold flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/20 rounded-xl text-primary font-bold text-xs">HIIT</div>
                <div>
                  <h4 className="font-bold text-sm">HIIT Burn & Strength</h4>
                  <p className="text-xs text-gray-400">Yesterday at 6:00 AM • Trainer: Alex Morgan</p>
                </div>
              </div>
              <span className="text-green-400 font-bold text-xs">+450 kcal</span>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-accent/20 rounded-xl text-accent font-bold text-xs">YOGA</div>
                <div>
                  <h4 className="font-bold text-sm">Vinyasa Flow & Meditation</h4>
                  <p className="text-xs text-gray-400">3 days ago • Trainer: Sarah Lee</p>
                </div>
              </div>
              <span className="text-green-400 font-bold text-xs">+280 kcal</span>
            </div>
          </div>
        </div>

        {/* AI Recommendations Card */}
        <div className="glass-card p-6 rounded-3xl border border-primary/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> AI Personal Guidance
            </div>
            <h3 className="text-xl font-bold mb-3">Recovery Target</h3>
            <p className="text-gray-300 text-xs leading-relaxed mb-4">
              Your muscle recovery index is at 88%. Today is an ideal window for progressive leg strength training.
            </p>
          </div>
          <button className="btn-primary w-full py-2.5 text-xs font-bold">
            Generate Custom AI Routine
          </button>
        </div>
      </div>
    </div>
  );
};
