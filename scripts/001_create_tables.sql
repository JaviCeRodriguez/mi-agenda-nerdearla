-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_talks table for user's selected talks
CREATE TABLE IF NOT EXISTS public.saved_talks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  talk_id TEXT NOT NULL,
  talk_title TEXT NOT NULL,
  talk_speaker TEXT NOT NULL,
  talk_time TEXT NOT NULL,
  talk_room TEXT NOT NULL,
  talk_track TEXT NOT NULL,
  talk_day TEXT NOT NULL,
  talk_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, talk_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_talks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Allow public read access to profiles for sharing functionality
CREATE POLICY "profiles_select_public" ON public.profiles FOR SELECT USING (true);

-- Saved talks policies
CREATE POLICY "saved_talks_select_own" ON public.saved_talks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saved_talks_insert_own" ON public.saved_talks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saved_talks_update_own" ON public.saved_talks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "saved_talks_delete_own" ON public.saved_talks FOR DELETE USING (auth.uid() = user_id);

-- Allow public read access to saved talks for sharing functionality
CREATE POLICY "saved_talks_select_public" ON public.saved_talks FOR SELECT USING (true);
