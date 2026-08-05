import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '../types';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // In production SaaS, this dispatches a mutation to NestJS API endpoint
    console.log('Form payload validated by Zod:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-dark to-dark/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold tracking-wide uppercase text-sm">Get In Touch</span>
          <h2 className="section-title">Ready to <span className="gradient-text">Transform?</span></h2>
          <p className="section-subtitle">Have questions? Reach out to us and our team will get back to you within 24h.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                <p className="text-gray-300">123 Fitness Avenue, Downtown City, 10001</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                <p className="text-gray-300">+1 (555) 123-4567</p>
                <p className="text-gray-400 text-sm">Mon-Sat: 6am - 10pm</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                <p className="text-gray-300">hello@fitzone.com</p>
                <p className="text-gray-400 text-sm">Support 24/7</p>
              </div>
            </div>
          </div>

          {/* Contact Form with React Hook Form + Zod */}
          <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 focus:outline-none transition ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 focus:outline-none transition ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                  }`}
                  placeholder="hello@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  rows={4}
                  {...register('message')}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 focus:outline-none transition ${
                    errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'
                  }`}
                  placeholder="Tell us about your fitness goals..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}{' '}
                <Send className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              {submitted && (
                <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Message sent successfully! We will contact you soon.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
