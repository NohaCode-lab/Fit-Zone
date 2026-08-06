import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronRight, Loader2 } from 'lucide-react';
import { useSchedule } from '../features/workouts/hooks/useSchedule';
import { DayTab } from '../features/workouts/api/workoutsApi';

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DayTab>('Monday');
  const { data: scheduleData, isLoading, isError } = useSchedule();

  const tabs: DayTab[] = ['Monday', 'Wednesday', 'Friday', 'Weekend'];

  return (
    <section id="schedule" className="py-20 bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold tracking-wide uppercase text-sm">Weekly Schedule</span>
          <h2 className="section-title">Find Your Perfect <span className="gradient-text">Class Time</span></h2>
          <p className="section-subtitle">
            Choose from a variety of classes led by elite trainers. Flexible timings for every lifestyle.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((day) => (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                activeTab === day
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : 'bg-surface text-text-secondary hover:bg-surface/80 border border-border'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12 text-primary">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-center text-red-400">Failed to load schedule from API.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scheduleData?.[activeTab]?.map((item, idx) => (
              <div key={idx} className="glass-card p-6 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{item.class}</h3>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Clock className="w-4 h-4 text-primary/70" />
                    <span className="text-sm font-medium">{item.time} • {item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <User className="w-4 h-4 text-primary/70" />
                    <span className="text-sm font-medium">Trainer: {item.trainer}</span>
                  </div>
                </div>
                <button className="mt-6 text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Book Spot <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Schedule;
