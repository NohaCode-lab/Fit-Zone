import React from "react";
import * as Icons from "lucide-react";

import alexImage from "../assets/images/alex.jpg";
import sarahImage from "../assets/images/sarah.jpg";
import mikeImage from "../assets/images/mike.jpg";
import jessicaImage from "../assets/images/jessica.jpg";

const trainers = [
  {
    name: "Alex Morgan",
    role: "HIIT & Strength Coach",
    bio: "Former athlete with 8+ years of experience in functional training.",
    // image: alexImage, // use local image
    image: alexImage,
    rating: 4.9,
  },
  {
    name: "Sarah Lee",
    role: "Yoga & Mindfulness Expert",
    bio: "Certified yoga instructor specializing in Vinyasa and meditation.",
    // image: sarahImage,
    image: sarahImage,
    rating: 4.8,
  },
  {
    name: "Mike Ross",
    role: "Bodybuilding Coach",
    bio: "Professional bodybuilder helping clients achieve massive transformations.",
    // image: mikeImage,
    image: mikeImage,
    rating: 5.0,
  },
  {
    name: "Jessica Diaz",
    role: "Dance & Cardio Instructor",
    bio: "Energetic Zumba & Dance fitness coach, making workouts fun.",
    // image: jessicaImage,
    image: jessicaImage,
    rating: 4.7,
  },
];

const Trainers = () => {
  return (
    <section id="trainers" className="py-20 relative">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, idx) => (
            <div
              key={idx}
              className="group relative bg-white/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  loading="lazy" // improves performance
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/60 backdrop-blur rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold">
                    {trainer.rating}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold">{trainer.name}</h3>
                <p className="text-primary text-sm mb-2">{trainer.role}</p>
                <p className="text-gray-400 text-sm mb-4">{trainer.bio}</p>
                <div className="flex gap-3">
                  <button className="p-2 bg-white/10 rounded-full hover:bg-primary/30 transition">
                    <FaInstagram className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/10 rounded-full hover:bg-primary/30 transition">
                    <FaLinkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
