import { FC } from 'react';
import { Target, Users, Award, BookOpen } from 'lucide-react';

/* ───────── Brand palette (same as other pages) ───────── */
const BRAND       = '#47677F';   // main brand colour
const BRAND_LIGHT = '#5A7E97';   // lighter tint / outline
const BG_CREAM    = '#F7F3EF';   // page background
const CARD_BG     = '#D5C6BD';   // card fill

type Value = {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
};

const About: FC = () => {
  const values: Value[] = [
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'To provide easy and centralized access to academic resources for all CUK students, enhancing their learning experience and academic performance.',
    },
    {
      icon: Users,
      title: 'Student-Centric',
      description:
        'Built by students, for students. We understand the challenges of finding quality study materials and previous year papers.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description:
        'All resources are carefully curated, verified, and organized to ensure the highest quality and relevance to your studies.',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Coverage',
      description:
        'Resources available for all undergraduate and postgraduate programs offered at Central University of Kashmir.',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: BG_CREAM }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: BRAND }}>
            About CUKmr PrepVault+
          </h1>
          <p className="text-lg text-[#555] max-w-3xl mx-auto">
            Empowering students with comprehensive academic resources to excel in their educational journey
          </p>
        </div>

        {/* Story */}
        <div className="rounded-lg shadow-lg p-8 mb-16" style={{ backgroundColor: CARD_BG }}>
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: BRAND }}>
            Our Story
          </h2>
          <div className="prose prose-lg max-w-4xl mx-auto text-[#555]">
            <p>
              CUKmr PrepVault+ was born out of a simple yet powerful idea: every student at Central University of Kashmir
              should have easy access to the academic resources they need to succeed.
            </p>
            <p>
              As students ourselves, we experienced firsthand the challenges of finding previous year question papers,
              quality study materials, and syllabus scattered across different sources. This platform addresses that
              challenge by creating a centralized, organized, and user-friendly repository of academic resources.
            </p>
            <p>
              Today, the hub serves students across all undergraduate and postgraduate programs, providing them with
              the tools they need to excel in their academic pursuits. Our commitment remains unchanged: to support
              every CUK student in their educational journey.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-8 rounded-lg border"
              style={{ backgroundColor: CARD_BG, borderColor: `${BRAND_LIGHT}55` }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: BRAND }}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#333] mb-3">{title}</h3>
              <p className="text-[#555]">{description}</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="rounded-lg p-8 text-center" style={{ backgroundColor: BRAND }}>
          <h2 className="text-3xl font-bold text-white mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              ['16+', 'Academic Programs'],
              ['00+', 'Study Resources'],
              ['50+', 'Semesters Covered'],
              ['00+', 'Student Downloads'],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-4xl font-bold text-white mb-2">{num}</div>
                <div className="text-blue-100">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team / Purpose */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: BRAND }}>
            Created With Purpose
          </h2>
          <div className="rounded-lg shadow-lg p-8 max-w-2xl mx-auto" style={{ backgroundColor: CARD_BG }}>
            <p className="text-[#555] mb-6">
              This platform was developed with the sole purpose of helping fellow students at Central University of Kashmir. 
              It represents our commitment to academic excellence and community support.
            </p>
            <p className="text-sm text-[#666]">
              For suggestions, feedback, or contributions, please feel free to reach out through our contact page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
