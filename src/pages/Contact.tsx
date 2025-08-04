import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
} from 'lucide-react';

/* ───────── Brand palette (same across the site) ───────── */
const BRAND       = '#47677F';   // main brand colour
const BRAND_LIGHT = '#5A7E97';   // lighter tint
const BG_CREAM    = '#F7F3EF';   // page background
const CARD_BG     = '#D5C6BD';   // card / panel fill

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: BG_CREAM }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: BRAND }}>
            Contact Us
          </h1>
          <p className="text-lg text-[#555] max-w-3xl mx-auto">
            Have questions, suggestions, or need help? We&rsquo;re here to assist you
            with any inquiries about the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ───────── Contact Information ───────── */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: BRAND }}>
              Get in Touch
            </h2>
            <p className="text-[#555] mb-8">
              We&rsquo;re committed to helping you make the most of CUKmr PrepVault+.
              Reach out and we&rsquo;ll respond as soon as we can.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${BRAND_LIGHT}33` }}
                >
                  <Mail className="h-5 w-5" style={{ color: BRAND }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: BRAND }}>
                    Email
                  </h3>
                  <p className="text-[#555]">cukprepvault@gmail.com</p>
                  <p className="text-sm text-[#666] mt-1">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${BRAND_LIGHT}33` }}
                >
                  <Phone className="h-5 w-5" style={{ color: BRAND }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: BRAND }}>
                    Phone
                  </h3>
                  <p className="text-[#555]">+91 7006207857</p>
                  <p className="text-sm text-[#666] mt-1">
                    Monday – Friday, 9 AM – 5 PM
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${BRAND_LIGHT}33` }}
                >
                  <MapPin className="h-5 w-5" style={{ color: BRAND }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: BRAND }}>
                    Location
                  </h3>
                  <p className="text-[#555]">Central University of Kashmir</p>
                  <p className="text-[#555]">Ganderbal, J&K, India</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4" style={{ color: BRAND }}>
                Frequently Asked Questions
              </h3>

              {[
                {
                  q: 'How do I access study materials?',
                  a: 'Navigate to the Programs page, select your program and semester, then browse available resources.',
                },
                {
                  q: 'Can I contribute resources?',
                  a: 'Currently, only administrators can upload resources. Contact us if you have materials to contribute.',
                },
                {
                  q: 'Are the resources free?',
                  a: 'Yes, all resources on this platform are completely free for CUK students.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="p-4 rounded-lg" style={{ backgroundColor: CARD_BG }}>
                  <h4 className="font-medium mb-2" style={{ color: BRAND }}>
                    {q}
                  </h4>
                  <p className="text-sm text-[#555]">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ───────── Contact Form ───────── */}
          <div
            className="rounded-lg shadow-lg p-8"
            style={{ backgroundColor: CARD_BG }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: BRAND }}>
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: BRAND }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5" style={{ color: BRAND_LIGHT }} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors"
                    style={{
                      borderColor: `${BRAND_LIGHT}55`,
                      color: '#333',
                    }}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: BRAND }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5" style={{ color: BRAND_LIGHT }} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors"
                    style={{
                      borderColor: `${BRAND_LIGHT}55`,
                      color: '#333',
                    }}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                  style={{ color: BRAND }}
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors"
                  style={{ borderColor: `${BRAND_LIGHT}55`, color: '#333' }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="content">Content Request</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: BRAND }}
                >
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-5 w-5" style={{ color: BRAND_LIGHT }} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors resize-none"
                    style={{
                      borderColor: `${BRAND_LIGHT}55`,
                      color: '#333',
                    }}
                    placeholder="Enter your message here…"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors duration-150"
                style={{
                  backgroundColor: BRAND,
                  color: '#fff',
                }}
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
