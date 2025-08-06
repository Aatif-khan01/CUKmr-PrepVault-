import React, { useState, useEffect } from 'react';
import { Target, Users, Award, BookOpen } from 'lucide-react';
import { getDashboardStats } from '../lib/supabase';

/* ───────── Brand palette (same as other pages) ───────── */
const BRAND       = '#47677F';   // main brand colour
const BRAND_LIGHT = '#5A7E97';   // lighter tint / outline
const BG_CREAM    = '#F7F3EF';   // page background
const CARD_BG     = '#D5C6BD';   // card fill

const About = () => {
  const [stats, setStats] = useState({
    programs: 16,
    resources: 500,
    downloads: 1000,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const dashboardStats = await getDashboardStats();
        setStats({
          programs: dashboardStats.programs,
          resources: dashboardStats.resources,
          downloads: dashboardStats.downloads,
          messages: dashboardStats.messages
        });
      } catch (error) {
        console.error('Failed to load statistics:', error);
        // Keep default values if loading fails
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide easy and centralized access to academic resources for all CUK students, enhancing their learning experience and academic performance.'
    },
    {
      icon: Users,
      title: 'Student-Centric',
      description: 'Built by students, for students. We understand the challenges of finding quality study materials and previous year papers.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'All resources are carefully curated, verified, and organized to ensure the highest quality and relevance to your studies.'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Coverage',
      description: 'Resources available for all undergraduate and postgraduate programs offered at Central University of Kashmir.'
    }
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

        {/* Story Section */}
        <div className="rounded-lg shadow-lg p-8 mb-16" style={{ backgroundColor: CARD_BG }}>
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: BRAND }}>
            Our Story
          </h2>
          <div className="prose prose-lg max-w-4xl mx-auto text-[#555]">
            <p className="mb-6">
              CUKmr PrepVault+ was born out of a simple yet powerful idea: every student at 
              Central University of Kashmir should have easy access to the academic resources they need to succeed.
            </p>
            <p className="mb-6">
              As students ourselves, we experienced firsthand the challenges of finding previous year question papers, 
              quality study materials, and syllabus scattered across different sources. This platform addresses 
              that challenge by creating a centralized, organized, and user-friendly repository of academic resources.
            </p>
            <p>
              Today, the hub serves students across all undergraduate and postgraduate programs, providing them 
              with the tools they need to excel in their academic pursuits. Our commitment remains unchanged: 
              to support every CUK student in their educational journey.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border"
              style={{ backgroundColor: CARD_BG, borderColor: `${BRAND_LIGHT}55` }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: BRAND }}
              >
                <value.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#333] mb-3">{value.title}</h3>
              <p className="text-[#555]">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="rounded-lg p-8 text-center" style={{ backgroundColor: BRAND }}>
          <h2 className="text-3xl font-bold text-white mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {loading ? '...' : `${stats.programs}+`}
              </div>
              <div style={{ color: '#E0F2FE' }}>Academic Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {loading ? '...' : `${stats.resources}+`}
              </div>
              <div style={{ color: '#E0F2FE' }}>Study Resources</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {loading ? '...' : `${stats.downloads}+`}
              </div>
              <div style={{ color: '#E0F2FE' }}>Total Downloads</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {loading ? '...' : `${stats.messages}+`}
              </div>
              <div style={{ color: '#E0F2FE' }}>Contact Messages</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: BRAND }}>
            Created With Purpose
          </h2>
          <div className="rounded-lg shadow-lg p-8 max-w-2xl mx-auto" style={{ backgroundColor: CARD_BG }}>
            <p className="text-[#555] mb-6">
              This platform was developed with the sole purpose of helping fellow students at Central University 
              of Kashmir. It represents our commitment to academic excellence and community support.
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
