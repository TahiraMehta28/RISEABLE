
import React, { useState } from 'react';
import { Search, Filter, Play, Heart, BookOpen, Users, Plus } from 'lucide-react';

const SkillBridge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills', count: 248 },
    { id: 'daily-living', name: 'Daily Living', count: 89 },
    { id: 'mobility', name: 'Mobility', count: 67 },
    { id: 'communication', name: 'Communication', count: 42 },
    { id: 'technology', name: 'Technology', count: 35 },
    { id: 'self-care', name: 'Self Care', count: 28 }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Tying Shoes with One Hand',
      author: 'Sarah M.',
      duration: '3:45',
      views: 1247,
      likes: 89,
      category: 'daily-living',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop',
      description: 'Learn the elastic lace method that makes tying shoes quick and easy with one hand.'
    },
    {
      id: 2,
      title: 'Voice Command Setup for Smart Home',
      author: 'Michael R.',
      duration: '7:22',
      views: 892,
      likes: 67,
      category: 'technology',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      description: 'Complete guide to setting up voice commands for lights, temperature, and appliances.'
    },
    {
      id: 3,
      title: 'Cooking with Tremor-Friendly Tools',
      author: 'Elena K.',
      duration: '5:18',
      views: 2156,
      likes: 143,
      category: 'daily-living',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
      description: 'Kitchen adaptations and tools that make cooking easier and safer with hand tremors.'
    },
    {
      id: 4,
      title: 'Wheelchair Transfer Techniques',
      author: 'David L.',
      duration: '6:33',
      views: 1843,
      likes: 156,
      category: 'mobility',
      difficulty: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      description: 'Safe and efficient transfer methods for bed, car, and chair transitions.'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            SkillBridge: Real-Life Hacks
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Learn practical skills from community members who share your experiences.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto">
            <Plus size={20} />
            <span>Share Your Skill</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Filter className="text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex justify-between items-center ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm opacity-70">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredTutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="relative">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                        <Play className="text-blue-600" size={24} />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {tutorial.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tutorial.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users size={16} />
                        <span>by {tutorial.author}</span>
                      </div>
                      <span>{tutorial.views.toLocaleString()} views</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors">
                        <Heart size={16} />
                        <span>{tutorial.likes}</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <BookOpen size={16} />
                        <span>Learn</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTutorials.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No tutorials found matching your search.</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillBridge;
