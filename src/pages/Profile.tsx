
import React, { useState } from 'react';
import { User, Settings, Calendar, TrendingUp, Award, Users, Book, Target, LogOut, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    bio: '',
    location: '',
    disability_type: '',
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        location: profile.location || '',
        disability_type: profile.disability_type || '',
      });
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await updateProfile(formData);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const recentActivity = [
    { type: 'quest', title: 'Completed "Morning Independence"', date: 'Today', xp: 50 },
    { type: 'tutorial', title: 'Shared "Kitchen Accessibility Tips"', date: 'Yesterday', xp: 200 },
    { type: 'bodytalk', title: 'Logged daily symptoms', date: '2 days ago', xp: 25 },
    { type: 'community', title: 'Helped 3 community members', date: '3 days ago', xp: 75 }
  ];

  const badges = [
    { name: 'First Steps', icon: '🎯', earned: true },
    { name: 'Helper', icon: '🤲', earned: true },
    { name: 'Consistent', icon: '📅', earned: true },
    { name: 'Mentor', icon: '👨‍🏫', earned: true },
    { name: 'Streak Master', icon: '🔥', earned: false },
    { name: 'Community Champion', icon: '⭐', earned: false }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quest': return Target;
      case 'tutorial': return Book;
      case 'bodytalk': return TrendingUp;
      case 'community': return Users;
      default: return Target;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'quest': return 'text-blue-600';
      case 'tutorial': return 'text-purple-600';
      case 'bodytalk': return 'text-green-600';
      case 'community': return 'text-pink-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-8 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Your Profile
          </h1>
          <p className="text-xl text-gray-600">
            Track your progress and celebrate your achievements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 text-center">
              <CardHeader>
                <div className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-blue-100 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {profile?.full_name || 'Anonymous User'}
                </h2>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                {profile?.bio && (
                  <p className="text-sm text-gray-500 mb-4">{profile.bio}</p>
                )}
                <p className="text-sm text-gray-500 mb-6">
                  Member since {profile?.joined_at ? new Date(profile.joined_at).toLocaleDateString() : 'Recently'}
                </p>
                
                {/* Level and XP */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                  <div className="text-3xl font-bold mb-2">Level 12</div>
                  <div className="text-sm opacity-90">2,847 XP Total</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="disability_type">Disability Type (Optional)</Label>
                        <Input
                          id="disability_type"
                          value={formData.disability_type}
                          onChange={(e) => setFormData(prev => ({ ...prev, disability_type: e.target.value }))}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Save Changes
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 text-center p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 text-center p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
                <div className="text-sm text-gray-600">Quests Done</div>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 text-center p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                <div className="text-sm text-gray-600">Tutorials</div>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 text-center p-6">
                <div className="text-3xl font-bold text-pink-600 mb-2">156</div>
                <div className="text-sm text-gray-600">Helpful Votes</div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Calendar className="text-blue-600" size={24} />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${getActivityColor(activity.type)}`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{activity.title}</h4>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                        <div className="text-sm font-semibold text-green-600">+{activity.xp} XP</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Award className="text-yellow-600" size={24} />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        badge.earned
                          ? 'bg-yellow-50 border-2 border-yellow-200 hover:shadow-lg'
                          : 'bg-gray-50 opacity-50'
                      }`}
                    >
                      <div className={`text-2xl mb-2 ${badge.earned ? '' : 'grayscale'}`}>
                        {badge.icon}
                      </div>
                      <div className="text-sm font-medium text-gray-800">{badge.name}</div>
                      {badge.earned && (
                        <div className="mt-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                            Earned
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
