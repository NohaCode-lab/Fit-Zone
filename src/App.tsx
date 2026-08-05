import React from 'react';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Trainers from './components/Trainers';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-dark">
      <Hero />
      <Schedule />
      <Trainers />
      <Pricing />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default App;
