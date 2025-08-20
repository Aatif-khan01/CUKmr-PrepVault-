import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Instagram } from 'lucide-react';

const BRAND        = '#47677F';   // main brand colour
const BRAND_LIGHT  = '#5A7E97';   // lighter tint (background highlight)
const BG_CREAM     = '#F7F3EF';   // navbar background

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home',      path: '/' },
    { name: 'Programs',  path: '/programs' },
    { name: 'About',     path: '/about' },
    { name: 'Contact',   path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="backdrop-blur-sm shadow-lg sticky top-0 z-50"
      style={{ backgroundColor: `${BG_CREAM}F2` }}   // 95 % opacity
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ─────────── Logo ─────────── */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-[70px] w-auto object-contain" />
            <span className="font-bold text-xl" style={{ color: BRAND }}>
              PrepVault+
            </span>
          </Link>

          {/* ─────────── Desktop Nav ─────────── */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                            ${isActive(item.path)
                              ? 'text-white bg-[#47677F]'
                              : 'text-[#445365] hover:text-white hover:bg-[#47677F]'}`}
              >
                {item.name}
              </Link>
            ))}

            {/* Contributors link */}
            <Link
              to="/contributors"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                          ${isActive('/contributors')
                            ? 'text-white bg-[#47677F]'
                            : 'text-[#445365] hover:text-white hover:bg-[#47677F]'}`}
            >
              Contributors
            </Link>

            {/* Social Icons */}
            <div
              className="flex items-center space-x-3 ml-4 pl-4 border-l"
              style={{ borderColor: `${BRAND_LIGHT}55` }}
            >
              <a
                href="https://www.linkedin.com/in/aatif-khan-390036273/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#445365] hover:text-[#47677F] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/aatif_k.han/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#445365] hover:text-[#47677F] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* ─────────── Mobile Menu Button ─────────── */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#47677F] transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* ─────────── Mobile Nav ─────────── */}
        {isOpen && (
          <div className="md:hidden" style={{ backgroundColor: BG_CREAM }}>
            <div
              className="px-2 pt-2 pb-3 space-y-1 border-t"
              style={{ borderColor: `${BRAND_LIGHT}55` }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                              ${isActive(item.path)
                                ? 'text-white bg-[#47677F]'
                                : 'text-[#445365] hover:text-white hover:bg-[#47677F]'}`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Contributors in mobile */}
              <Link
                to="/contributors"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                            ${isActive('/contributors')
                              ? 'text-white bg-[#47677F]'
                              : 'text-[#445365] hover:text-white hover:bg-[#47677F]'}`}
              >
                Contributors
              </Link>

              {/* Mobile Social Icons */}
              <div className="flex items-center space-x-4 px-3 py-2">
                <a
                  href="https://www.linkedin.com/in/aatif-khan-390036273/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#47677F]"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/aatif_k.han/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#47677F]"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
