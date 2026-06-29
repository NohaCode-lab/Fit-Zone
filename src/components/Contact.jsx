// src/components/Contact.jsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
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

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  placeholder="hello@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  placeholder="Tell us about your fitness goals..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 group">
                Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              {submitted && (
                <p className="text-green-400 text-center text-sm">Message sent successfully! We'll contact you soon.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;