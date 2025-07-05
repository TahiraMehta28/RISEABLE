
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  disability_type TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create body_talk_entries table for BodyTalk feature
CREATE TABLE public.body_talk_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5),
  fatigue INTEGER NOT NULL CHECK (fatigue >= 0 AND fatigue <= 10),
  pain INTEGER NOT NULL CHECK (pain >= 0 AND pain <= 10),
  anxiety INTEGER NOT NULL CHECK (anxiety >= 0 AND anxiety <= 10),
  focus INTEGER NOT NULL CHECK (focus >= 0 AND focus <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table to track earned achievements
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create forum_posts table for community discussions
CREATE TABLE public.forum_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_replies table
CREATE TABLE public.forum_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_likes table
CREATE TABLE public.forum_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK ((post_id IS NOT NULL AND reply_id IS NULL) OR (post_id IS NULL AND reply_id IS NOT NULL)),
  UNIQUE(user_id, post_id),
  UNIQUE(user_id, reply_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_talk_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_likes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for body_talk_entries
CREATE POLICY "Users can view own entries" ON public.body_talk_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own entries" ON public.body_talk_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own entries" ON public.body_talk_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own entries" ON public.body_talk_entries FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for achievements (public read)
CREATE POLICY "Anyone can view achievements" ON public.achievements FOR SELECT USING (true);

-- Create RLS policies for user_achievements
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can earn achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for forum_posts
CREATE POLICY "Anyone can view posts" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON public.forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON public.forum_posts FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for forum_replies
CREATE POLICY "Anyone can view replies" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON public.forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own replies" ON public.forum_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own replies" ON public.forum_replies FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for forum_likes
CREATE POLICY "Users can view all likes" ON public.forum_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own likes" ON public.forum_likes FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'username'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample achievements
INSERT INTO public.achievements (name, description, icon, category, points) VALUES
('First Steps', 'Complete your first daily check-in', '🎯', 'bodytalk', 10),
('Consistent Tracker', 'Log entries for 7 consecutive days', '📅', 'bodytalk', 50),
('Community Helper', 'Help 5 community members with replies', '🤲', 'community', 25),
('Skill Sharer', 'Share your first tutorial', '📚', 'skillbridge', 30),
('Quest Beginner', 'Complete your first AbleQuest', '🏆', 'ablequests', 15),
('Streak Master', 'Maintain a 30-day check-in streak', '🔥', 'bodytalk', 100),
('Mentor', 'Get 50+ helpful votes on your contributions', '👨‍🏫', 'community', 75),
('Community Champion', 'Create 10+ helpful forum posts', '⭐', 'community', 200);
