import React from 'react';
import logo from '../assets/logo.png';
import { Linkedin, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="text-white" style={{ backgroundColor: '#17384C' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 4-column grid on ≥md, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* ─────────── Logo & Description ─────────── */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <img
              src={logo}
              alt="CUK PrepVault+ logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-xl">CUK PrepVault+</span>
          </div>

          <p className="text-gray-300 mb-6 max-w-md">
            Your comprehensive platform for accessing previous year papers, study
            materials, and syllabus for all programs at Central University of Kashmir.
          </p>

          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/aatif-khan-390036273/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>

            <a
              href="https://www.instagram.com/aatif_k.han/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* ─────────── Quick Links ─────────── */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/programs" className="text-gray-300 hover:text-white transition-colors">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* ─────────── Contact Info ─────────── */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail className="h-4 w-4" />
              <span className="text-sm">cukprepvault@gmail.com</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-300">
              <Phone className="h-4 w-4" />
              <a
                href="tel:+917006207857"
                className="text-sm hover:text-white transition-colors"
              >
                +91 7006207857
              </a>
            </div>
          </div>

          <Link
            to="/admin"
            className="inline-block mt-4 text-xs text-gray-500 hover:text-gray-400 transition-colors"
          >
            Admin Access
          </Link>
        </div>
      </div>

      {/* ─────────── Copyright ─────────── */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 CUKmr PrepVault+. Created with ❤️ for CUK students.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
