// src/components/Testimonials.jsx
import React from 'react';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Emily Rodriguez',
    role: 'Member since 2023',
    text: "FitZone completely transformed my fitness journey. The trainers are incredibly supportive and the community is motivating. I've never felt stronger!",
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 2,
    name: 'James Carter',
    role: 'Premium Member',
    text: 'The best gym experience I’ve ever had. From HIIT to yoga, every class is top-tier. The facilities are clean and the energy is unmatched.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Sophia Kim',
    role: 'Elite Member',
    text: 'Personalized coaching and nutrition advice helped me lose 20 lbs and gain confidence. The staff truly cares about your progress.',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold tracking-wide uppercase text-sm">Success Stories</span>
          <h2 className="section-title">What Our <span className="gradient-text">Members Say</span></h2>
          <p className="section-subtitle">Real transformations, real experiences. Join the FitZone family today.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="rounded-2xl"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="glass-card p-8 md:p-12 text-center relative">
                  <Quote className="w-12 h-12 text-primary/30 absolute top-6 left-6" />
                  <div className="flex flex-col items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary mb-4"
                    />
                    <p className="text-gray-200 text-lg md:text-xl italic mb-6">"{testimonial.text}"</p>
                    <h4 className="text-xl font-bold">{testimonial.name}</h4>
                    <p className="text-primary text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;