import React from 'react';
import { Star, Loader2 } from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTrainers } from '../features/trainers/hooks/useTrainers';

const Trainers: React.FC = () => {
  const { data: trainers, isLoading, isError } = useTrainers();

  return (
    <section id="trainers" className="py-20 relative bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold tracking-wide uppercase text-sm">
            Elite Team
          </span>
          <h2 className="section-title">
            Meet Your <span className="gradient-text">Expert Trainers</span>
          </h2>
          <p className="section-subtitle">
            World-class coaches dedicated to helping you reach your fitness
            goals with personalized guidance.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12 text-primary">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-center text-red-400">Failed to load trainers data from API.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers?.map((trainer) => (
              <div
                key={trainer.id}
                className="group relative glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/60 backdrop-blur rounded-full px-2 py-1 text-white">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold">
                      {trainer.rating}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-text-primary">{trainer.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-2">{trainer.role}</p>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">{trainer.bio}</p>
                  <div className="flex gap-3">
                    <button className="p-2 bg-surface rounded-full hover:bg-primary/30 text-text-secondary hover:text-primary transition border border-border" aria-label={`${trainer.name}'s Instagram`}>
                      <FaInstagram className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-surface rounded-full hover:bg-primary/30 text-text-secondary hover:text-primary transition border border-border" aria-label={`${trainer.name}'s LinkedIn`}>
                      <FaLinkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trainers;
