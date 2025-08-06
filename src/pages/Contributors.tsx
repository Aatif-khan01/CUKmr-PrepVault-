import React from 'react';
import { Linkedin } from 'lucide-react';
import AatifImg from '../assets/Aatif.jpg';
import AerafImg from '../assets/Aeraf.jpg';
import IyadImg from '../assets/Iyad.jpg';

/* ───────── Brand palette (same constants you used elsewhere) ───────── */
const BRAND       = '#47677F';
const BRAND_LIGHT = '#5A7E97';   // lighter tint
const BG_CREAM    = '#F7F3EF';   // page background
const CARD_BG     = '#D5C6BD';   // card fill

const contributors = [
  {
    name: 'Aatif Muneeb Khan',
    role: 'Full Stack Web Developer',
    img:  AatifImg,
    url:  'https://www.linkedin.com/in/aatif-khan-390036273/',
    isSpecial: true, // Mark Aatif as special
  },
  {
    name: 'Mohammad Aeraf Rouf',
    role: 'UI/UX Designer',
    img:  AerafImg,
    url:  'https://www.linkedin.com/in/mohammad-aeraf-rouf-dar-80ba0a323/',
    isSpecial: false,
  },
  {
    name: 'Sheikh Iyad',
    role: 'Resource Manager',
    img:  IyadImg,
    url:  'https://www.linkedin.com/in/sheikh-iyad/',
    isSpecial: false,
  },
];

const Contributors = () => (
  <div
    className="py-12 px-4 sm:px-6 lg:px-8 text-center"
    style={{ backgroundColor: BG_CREAM }}
  >
    <h1 className="text-4xl font-bold mb-6" style={{ color: BRAND }}>
      Contributors
    </h1>

    <p className="text-lg text-[#555] mb-8">
      Meet the amazing people who contributed to this project!
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
      {contributors.map(({ name, role, img, url, isSpecial }) => (
        <div
          key={name}
          className={`p-6 rounded-xl transition-all duration-300 hover:shadow-md ${
            isSpecial 
              ? 'w-72 shadow-xl hover:shadow-2xl transform hover:scale-105' 
              : 'w-64 shadow'
          }`}
          style={{
            backgroundColor: CARD_BG,
            border: isSpecial ? `2px solid ${BRAND}` : 'none',
          }}
        >
          <img
            src={img}
            alt={name}
            className={`rounded-full mx-auto mb-4 object-cover ${
              isSpecial ? 'w-28 h-28' : 'w-24 h-24'
            }`}
          />

          <h3 className={`font-semibold text-[#333] ${
            isSpecial ? 'text-2xl' : 'text-xl'
          }`}>
            {name}
          </h3>
          
          <p className={`text-[#555] ${
            isSpecial ? 'text-base font-medium' : 'text-sm'
          }`}>
            {role}
          </p>

          {/* Special badge for Aatif */}
          {isSpecial && (
            <div 
              className="mt-2 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: BRAND, color: 'white' }}
            >
              Project Lead
            </div>
          )}

          {/* LinkedIn icon */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block transition-colors"
            style={{ color: BRAND }}
          >
            <Linkedin className={`mx-auto hover:opacity-80 ${
              isSpecial ? 'h-7 w-7' : 'h-6 w-6'
            }`} />
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Contributors;
