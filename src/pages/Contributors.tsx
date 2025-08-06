import React from 'react';
import { Linkedin } from 'lucide-react';
import AatifImg from '../assets/Aatif.jpg';
import AerafImg from '../assets/Aeraf.jpg';
// import IyadImg from '../assets/Iyad.jpg'; // Add Sheikh Iyad's image

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
  },
  {
    name: 'Mohammad Aeraf Rouf',
    role: 'UI/UX Designer',
    img:  AerafImg,
    url:  'https://www.linkedin.com/in/mohammad-aeraf-rouf-dar-80ba0a323/',
  },
  {
    name: 'Sheikh Iyad',
    role: 'Contributor', // Update with his specific role
    img:  AerafImg, // Replace with IyadImg once you add his image
    url:  'https://www.linkedin.com/in/sheikh-iyad/', // Replace with his actual LinkedIn URL
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
      {contributors.map(({ name, role, img, url }) => (
        <div
          key={name}
          className="p-6 rounded-xl shadow transition-transform hover:shadow-md w-64"
          style={{ backgroundColor: CARD_BG }}
        >
          <img
            src={img}
            alt={name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />

          <h3 className="text-xl font-semibold text-[#333]">{name}</h3>
          <p className="text-sm text-[#555]">{role}</p>

          {/* LinkedIn icon */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block transition-colors"
            style={{ color: BRAND }}
          >
            <Linkedin className="h-6 w-6 mx-auto hover:opacity-80" />
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Contributors;
