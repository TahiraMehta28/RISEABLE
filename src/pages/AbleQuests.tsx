
import React, { useState } from 'react';
import { Trophy, Star, Target, Clock, Gift, Medal, Zap, Calendar } from 'lucide-react';

const AbleQuests = () => {
  const [activeTab, setActiveTab] = useState('daily');

  const dailyQuests = [
    {
      id: 1,
      title: 'Morning Independence',
      description: 'Complete your morning routine using your preferred adaptive techniques',
      xp: 50,
      timeEstimate: '30 min',
      difficulty: 'Easy',
      progress: 0,
      completed: false,
      icon: '🌅'
    },
    {
      id: 2,
      title: 'Ask for Help',
      description: 'Practice asking for assistance using a new communication method',
      xp: 75,
      timeEstimate: '10 min',
      difficulty: 'Medium',
      progress: 0,
      completed: false,
      icon: '🤝'
    },
    {
      id: 3,
      title: 'Mindful Check-in',
      description: 'Log your mood and symptoms in BodyTalk',
      xp: 25,
      timeEstimate: '5 min',
      difficulty: 'Easy',
      progress: 100,
      completed: true,
      icon: '🧠'
    }
  ];

  const weeklyQuests = [
    {
      id: 4,
      title: 'Share Your Knowledge',
      description: 'Upload a tutorial or tip to help others in SkillBridge',
      xp: 200,
      timeEstimate: '45 min',
      difficulty: 'Hard',
      progress: 60,
      completed: false,
      icon: '📚'
    },
    {
      id: 5,
      title: 'Community Connection',
      description: 'Comment supportively on 3 community posts',
      xp: 100,
      timeEstimate: '20 min',
      difficulty: 'Medium',
      progress: 33,
      completed: false,
      icon: '💬'
    }
  ];

  const achievements = [
    { title: 'First Steps', description: 'Completed your first quest', icon: '🎯', earned: true },
    { title: 'Helper', description: 'Shared 5 tutorials', icon: '🤲', earned: true },
    { title: 'Streak Master', description: '7-day quest streak', icon: '🔥', earned: false },
    { title: 'Community Champion', description: 'Received 50 likes', icon: '⭐', earned: false }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const userStats = {
    level: 12,
    xp: 2847,
    xpToNext: 653,
    streak: 5,
    totalQuests: 47,
    achievements: 12
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            AbleQuests: Build Confidence
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take on achievable challenges designed to celebrate your progress and build confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              {/* User Level */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl font-bold">{userStats.level}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Level {userStats.level}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {userStats.xpToNext} XP to level {userStats.level + 1}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="text-orange-500" size={16} />
                    <span className="text-gray-600">Streak</span>
                  </div>
                  <span className="font-semibold text-orange-500">{userStats.streak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="text-blue-500" size={16} />
                    <span className="text-gray-600">Quests</span>
                  </div>
                  <span className="font-semibold text-blue-500">{userStats.totalQuests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Medal className="text-purple-500" size={16} />
                    <span className="text-gray-600">Badges</span>
                  </div>
                  <span className="font-semibold text-purple-500">{userStats.achievements}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100 mb-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('daily')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === 'daily'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Calendar size={18} />
                  <span>Daily Quests</span>
                </button>
                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === 'weekly'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Trophy size={18} />
                  <span>Weekly Quests</span>
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeTab === 'achievements'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Star size={18} />
                  <span>Achievements</span>
                </button>
              </div>
            </div>

            {/* Quest Lists */}
            {activeTab === 'daily' && (
              <div className="space-y-4">
                {dailyQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl ${
                      quest.completed ? 'opacity-75' : 'hover:scale-105'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-3xl">{quest.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`text-xl font-semibold ${quest.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                              {quest.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                              {quest.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{quest.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Gift size={16} />
                              <span>{quest.xp} XP</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={16} />
                              <span>{quest.timeEstimate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {quest.completed ? (
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <Trophy className="text-white" size={20} />
                          </div>
                        ) : (
                          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                    {quest.progress > 0 && !quest.completed && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{quest.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${quest.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'weekly' && (
              <div className="space-y-4">
                {weeklyQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-3xl">{quest.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">{quest.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                              {quest.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{quest.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                            <div className="flex items-center space-x-1">
                              <Gift size={16} />
                              <span>{quest.xp} XP</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={16} />
                              <span>{quest.timeEstimate}</span>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{quest.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${quest.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl ${
                      achievement.earned ? 'ring-2 ring-yellow-400' : 'opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-4xl mb-3 ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                      {achievement.earned && (
                        <div className="mt-4">
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                            Earned!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbleQuests;
