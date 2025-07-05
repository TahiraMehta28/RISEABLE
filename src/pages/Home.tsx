import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Users, Trophy, Star, Shield, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'BodyTalk',
      subtitle: 'Know Your Signals',
      description: 'Track symptoms, understand your body, and build self-awareness through personalized insights.',
      color: 'from-blue-500 to-indigo-600',
      link: '/bodytalk'
    },
    {
      icon: Users,
      title: 'SkillBridge',
      subtitle: 'Real-Life Hacks from Real People',
      description: 'Learn practical skills from community members who share your experiences and challenges.',
      color: 'from-purple-500 to-pink-600',
      link: '/skillbridge'
    },
    {
      icon: Trophy,
      title: 'AbleQuests',
      subtitle: 'Gamified Confidence Builders',
      description: 'Build confidence through achievable challenges designed to celebrate your progress.',
      color: 'from-green-500 to-teal-600',
      link: '/ablequests'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Community Members' },
    { number: '500+', label: 'Skill Tutorials' },
    { number: '2M+', label: 'Quests Completed' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-800 mb-6 animate-fade-in">
              Rise Above,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in">
              Empowering disabled individuals with real-world skills, confidence-building quests, and self-awareness tools in a supportive community environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
              {user ? (
                <Link
                  to="/profile"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              )}
              <Link
                to="/skillbridge"
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:shadow-lg"
              >
                Explore Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Three Pillars of Empowerment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our integrated approach combines self-awareness, community learning, and confidence building.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-4">{feature.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6 flex items-center text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-semibold">Explore</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold mb-4">Impact That Matters</h2>
              <p className="text-xl opacity-90">Join thousands who are rising together every day</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Built on Trust & Accessibility
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Safe & Secure</h3>
              <p className="text-gray-600">Your privacy and data security are our top priorities. Share and learn in a protected environment.</p>
            </div>
            <div className="text-center p-8">
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Community First</h3>
              <p className="text-gray-600">Built by and for the disability community, fostering genuine connections and mutual support.</p>
            </div>
            <div className="text-center p-8">
              <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fully Accessible</h3>
              <p className="text-gray-600">Designed with accessibility in mind, ensuring everyone can participate and contribute meaningfully.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
