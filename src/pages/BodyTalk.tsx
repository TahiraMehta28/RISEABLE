
import React, { useState } from 'react';
import { Calendar, TrendingUp, Brain, Heart, Zap, Moon } from 'lucide-react';

const BodyTalk = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMood, setCurrentMood] = useState(5);
  const [symptoms, setSymptoms] = useState({
    fatigue: 3,
    pain: 2,
    anxiety: 4,
    focus: 6
  });

  const moodEmojis = ['😢', '😟', '😐', '😊', '😄'];
  const symptomIcons = {
    fatigue: Zap,
    pain: Heart,
    anxiety: Brain,
    focus: Moon
  };

  const recentEntries = [
    { date: '2024-01-10', mood: 4, fatigue: 2, pain: 1, anxiety: 3, focus: 7 },
    { date: '2024-01-09', mood: 3, fatigue: 4, pain: 3, anxiety: 5, focus: 5 },
    { date: '2024-01-08', mood: 5, fatigue: 1, pain: 2, anxiety: 2, focus: 8 },
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            BodyTalk: Know Your Signals
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your daily experiences and discover patterns that help you understand your body better.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daily Check-in */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">Daily Check-in</h2>
              </div>

              <div className="space-y-8">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Mood Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Overall Mood (1-5)
                  </label>
                  <div className="flex space-x-4">
                    {moodEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMood(index + 1)}
                        className={`text-4xl p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                          currentMood === index + 1 
                            ? 'bg-blue-100 ring-2 ring-blue-500' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptom Tracking */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Symptom Levels (0-10)</h3>
                  <div className="space-y-6">
                    {Object.entries(symptoms).map(([symptom, value]) => {
                      const Icon = symptomIcons[symptom as keyof typeof symptomIcons];
                      return (
                        <div key={symptom}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Icon size={20} className="text-blue-600" />
                              <label className="text-sm font-medium text-gray-700 capitalize">
                                {symptom}
                              </label>
                            </div>
                            <span className="text-sm font-semibold text-blue-600">{value}/10</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            value={value}
                            onChange={(e) => setSymptoms(prev => ({
                              ...prev,
                              [symptom]: parseInt(e.target.value)
                            }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    placeholder="How did you feel today? Any specific triggers or positive moments?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Save Today's Entry
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-green-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-800">This Week</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Mood</span>
                  <span className="font-semibold text-green-600">4.2/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Day</span>
                  <span className="font-semibold text-blue-600">Tuesday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entries</span>
                  <span className="font-semibold text-purple-600">5/7</span>
                </div>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Entries</h3>
              <div className="space-y-3">
                {recentEntries.map((entry, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                      <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <span>Fatigue: {entry.fatigue}</span>
                      <span>Pain: {entry.pain}</span>
                      <span>Anxiety: {entry.anxiety}</span>
                      <span>Focus: {entry.focus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyTalk;
