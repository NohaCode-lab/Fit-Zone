// src/components/Schedule.jsx
import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('Monday');

  const scheduleData = {
    Monday: [
      { time: '6:00 AM', class: 'HIIT Burn', trainer: 'Alex Morgan', duration: '45 min' },
      { time: '9:00 AM', class: 'Yoga Flow', trainer: 'Sarah Lee', duration: '60 min' },
      { time: '5:30 PM', class: 'Strength Training', trainer: 'Mike Ross', duration: '50 min' },
      { time: '7:00 PM', class: 'Zumba Dance', trainer: 'Jessica Diaz', duration: '55 min' },
    ],
    Wednesday: [
      { time: '7:00 AM', class: 'Cardio Kickbox', trainer: 'Chris Evans', duration: '50 min' },
      { time: '10:00 AM', class: 'Pilates', trainer: 'Emma Watson', duration: '45 min' },
      { time: '4:00 PM', class: 'CrossFit', trainer: 'David Lee', duration: '60 min' },
      { time: '6:30 PM', class: 'Meditation & Breath', trainer: 'Sophia Kim', duration: '40 min' },
    ],
    Friday: [
      { time: '6:30 AM', class: 'Bootcamp', trainer: 'Alex Morgan', duration: '60 min' },
      { time: '12:00 PM', class: 'Power Yoga', trainer: 'Sarah Lee', duration: '50 min' },
      { time: '5:00 PM', class: 'Functional Training', trainer: 'Mike Ross', duration: '55 min' },
      { time: '7:30 PM', class: 'Dance Fitness', trainer: 'Jessica Diaz', duration: '45 min' },
    ],
    Weekend: [
      { time: '8:00 AM', class: 'Outdoor Run Club', trainer: 'Chris Evans', duration: '60 min' },
      { time: '10:00 AM', class: 'Family Yoga', trainer: 'Emma Watson', duration: '50 min' },
      { time: '11:30 AM', class: 'Strength & Conditioning', trainer: 'David Lee', duration: '70 min' },
    ],
  };

  const tabs = ['Monday', 'Wednesday', 'Friday', 'Weekend'];

  return (
    <section id="schedule" className="py-20 bg-gradient-to-b from-dark to-dark/90">
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
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scheduleData[activeTab].map((item, idx) => (
            <div key={idx} className="glass-card p-6 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{item.class}</h3>
              </div>
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4 text-primary/70" />
                  <span className="text-sm">{item.time} • {item.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4 text-primary/70" />
                  <span className="text-sm">Trainer: {item.trainer}</span>
                </div>
              </div>
              <button className="mt-6 text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Book Spot <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;