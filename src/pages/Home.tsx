import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Download } from 'lucide-react';
import { getDashboardStats } from '../lib/supabase';

const BRAND       = '#47677F'; // main brand colour
const BRAND_LIGHT = '#5A7E97'; // lighter tint (hover, outline)
const BG_CREAM    = '#F7F3EF'; // site background
const CARD_BG     = '#D5C6BD'; // feature-card fill

const Home = () => {
  const navigate = useNavigate();
  
  // Statistics state
  const [stats, setStats] = useState({
    programs: 16,
    resources: 500,
    downloads: 1000,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  // Load statistics
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

  /* ───────── feature-card click handler ───────── */
  const handleFeatureClick = (type: string) => {
    if (['papers', 'programs', 'materials', 'syllabus', 'downloads'].includes(type))
      navigate('/programs');
  };

  /* ───────── feature-card data ───────── */
  const features = [
    { icon: BookOpen, title: 'Previous Year Papers', description: 'Access comprehensive collection of question papers from previous years', type: 'papers' },
    { icon: Users,    title: 'All Programs',         description: 'Resources available for both undergraduate and postgraduate programs',               type: 'programs' },
    { icon: Award,    title: 'Study Materials',      description: 'High-quality notes and study materials curated for each subject',                   type: 'materials' },
    { icon: BookOpen, title: 'Syllabus',             description: 'Complete syllabus and curriculum details for all programs',                        type: 'syllabus' },
    { icon: Download, title: 'Easy Downloads',       description: 'Quick and hassle-free download of all academic resources',                         type: 'downloads' }
  ];

  return (
    <div>
      {/* ───────── Hero Section ───────── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: BG_CREAM }}>
        <div className="max-w-7xl mx-auto text-center">
          <img src={logo} alt="PrepVault+ Logo" className="mx-auto -mb-2 h-40 w-auto object-contain" />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span style={{ color: BRAND }}>
              PrepVault+
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your one-stop platform for accessing previous year papers, study notes, and syllabus for
            all undergraduate and postgraduate programs.
          </p>

          <Link
            to="/programs"
            className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{ backgroundColor: BRAND, filter: 'brightness(95%)' }}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ───────── Features Section ───────── */}
      <section className="py-20" style={{ backgroundColor: BG_CREAM }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Academic Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access a comprehensive collection of academic resources designed to help you excel in your studies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description, type }) => (
              <button
                key={type}
                onClick={() => handleFeatureClick(type)}
                className="p-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer text-left w-full focus:outline-none"
                style={{
                  backgroundColor: CARD_BG,
                  border: `1px solid ${CARD_BG}66`
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: BRAND }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700">{description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Platform Statistics Section ───────── */}
      <section className="py-16" style={{ backgroundColor: BG_CREAM }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* ───────── CTA Section ───────── */}
      <section className="py-20" style={{ backgroundColor: BRAND }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Access Your Resources?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse through our extensive collection of academic materials organized by program and semester
          </p>

          <Link
            to="/programs"
            className="inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: BG_CREAM, color: BRAND }}
          >
            Explore Programs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
