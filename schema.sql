-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types (only if they don't exist)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('creator', 'brand', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('pending', 'active', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE content_type AS ENUM ('video', 'image', 'story', 'reel');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  phone TEXT,
  role user_role DEFAULT 'creator',
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  response_time_hours INTEGER DEFAULT 24,
  price_range_min INTEGER DEFAULT 0,
  price_range_max INTEGER DEFAULT 1000,
  followers_count INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0.00,
  gender TEXT,
  experience TEXT,
  languages TEXT[],
  equipment TEXT[],
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to existing profiles table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'gender') THEN
        ALTER TABLE public.profiles ADD COLUMN gender TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'experience') THEN
        ALTER TABLE public.profiles ADD COLUMN experience TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'languages') THEN
        ALTER TABLE public.profiles ADD COLUMN languages TEXT[];
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'equipment') THEN
        ALTER TABLE public.profiles ADD COLUMN equipment TEXT[];
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'social_links') THEN
        ALTER TABLE public.profiles ADD COLUMN social_links JSONB;
    END IF;
END $$;

-- Creator specialties
CREATE TABLE IF NOT EXISTS public.creator_specialties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creator shooting types
CREATE TABLE IF NOT EXISTS public.creator_shooting_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  shooting_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media files table for uploads
CREATE TABLE IF NOT EXISTS public.media_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  size_bytes BIGINT,
  category TEXT,
  tags TEXT[],
  is_portfolio BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to existing media_files table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media_files' AND column_name = 'category') THEN
        ALTER TABLE public.media_files ADD COLUMN category TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media_files' AND column_name = 'tags') THEN
        ALTER TABLE public.media_files ADD COLUMN tags TEXT[];
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media_files' AND column_name = 'is_portfolio') THEN
        ALTER TABLE public.media_files ADD COLUMN is_portfolio BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Portfolio items
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  media_file_id UUID REFERENCES public.media_files(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content_type content_type NOT NULL,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to existing portfolio_items table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'media_file_id') THEN
        ALTER TABLE public.portfolio_items ADD COLUMN media_file_id UUID REFERENCES public.media_files(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'category') THEN
        ALTER TABLE public.portfolio_items ADD COLUMN category TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'tags') THEN
        ALTER TABLE public.portfolio_items ADD COLUMN tags TEXT[];
    END IF;
END $$;

-- Services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('modeles', 'shootings', 'publicite', 'ugc')),
  base_price INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  budget_min INTEGER,
  budget_max INTEGER,
  deadline DATE,
  status project_status DEFAULT 'pending',
  requirements TEXT,
  service_type TEXT CHECK (service_type IN ('modeles', 'shootings', 'publicite', 'ugc')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to existing projects table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'service_id') THEN
        ALTER TABLE public.projects ADD COLUMN service_id UUID REFERENCES public.services(id) ON DELETE SET NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'service_type') THEN
        ALTER TABLE public.projects ADD COLUMN service_type TEXT CHECK (service_type IN ('modeles', 'shootings', 'publicite', 'ugc'));
    END IF;
END $$;

-- Project applications
CREATE TABLE IF NOT EXISTS public.project_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  proposal TEXT,
  price DECIMAL(10,2),
  delivery_days INTEGER,
  status project_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, creator_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewed_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  payer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  payee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status payment_status DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creator stats table for real-time updates
CREATE TABLE IF NOT EXISTS public.creator_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  total_projects INTEGER DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0.00,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  profile_views INTEGER DEFAULT 0,
  portfolio_views INTEGER DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search filters table for advanced filtering
CREATE TABLE IF NOT EXISTS public.search_filters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  filters JSONB NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profiles_role') THEN
        CREATE INDEX idx_profiles_role ON public.profiles(role);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profiles_rating') THEN
        CREATE INDEX idx_profiles_rating ON public.profiles(rating);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profiles_location') THEN
        CREATE INDEX idx_profiles_location ON public.profiles(location);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profiles_gender') THEN
        CREATE INDEX idx_profiles_gender ON public.profiles(gender);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_media_files_user') THEN
        CREATE INDEX idx_media_files_user ON public.media_files(user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_media_files_type') THEN
        CREATE INDEX idx_media_files_type ON public.media_files(type);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_media_files_category') THEN
        CREATE INDEX idx_media_files_category ON public.media_files(category);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_portfolio_items_creator') THEN
        CREATE INDEX idx_portfolio_items_creator ON public.portfolio_items(creator_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_portfolio_items_category') THEN
        CREATE INDEX idx_portfolio_items_category ON public.portfolio_items(category);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_services_category') THEN
        CREATE INDEX idx_services_category ON public.services(category);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_services_slug') THEN
        CREATE INDEX idx_services_slug ON public.services(slug);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_projects_brand') THEN
        CREATE INDEX idx_projects_brand ON public.projects(brand_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_projects_creator') THEN
        CREATE INDEX idx_projects_creator ON public.projects(creator_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_projects_status') THEN
        CREATE INDEX idx_projects_status ON public.projects(status);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_projects_service_type') THEN
        CREATE INDEX idx_projects_service_type ON public.projects(service_type);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_messages_sender') THEN
        CREATE INDEX idx_messages_sender ON public.messages(sender_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_messages_receiver') THEN
        CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_notifications_user') THEN
        CREATE INDEX idx_notifications_user ON public.notifications(user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_creator_stats_creator') THEN
        CREATE INDEX idx_creator_stats_creator ON public.creator_stats(creator_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_analytics_user') THEN
        CREATE INDEX idx_analytics_user ON public.analytics(user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_analytics_event_type') THEN
        CREATE INDEX idx_analytics_event_type ON public.analytics(event_type);
    END IF;
END $$;

-- Create RLS (Row Level Security) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_shooting_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_filters ENABLE ROW LEVEL SECURITY;

-- Profiles policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by everyone') THEN
        CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
          FOR SELECT USING (true);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
        CREATE POLICY "Users can update own profile" ON public.profiles
          FOR UPDATE USING (auth.uid() = id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
        CREATE POLICY "Users can insert own profile" ON public.profiles
          FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- Media files policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media_files' AND policyname = 'Users can view own media files') THEN
        CREATE POLICY "Users can view own media files" ON public.media_files
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media_files' AND policyname = 'Users can manage own media files') THEN
        CREATE POLICY "Users can manage own media files" ON public.media_files
          FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;

-- Portfolio items policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_items' AND policyname = 'Portfolio items are viewable by everyone') THEN
        CREATE POLICY "Portfolio items are viewable by everyone" ON public.portfolio_items
          FOR SELECT USING (true);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_items' AND policyname = 'Creators can manage own portfolio') THEN
        CREATE POLICY "Creators can manage own portfolio" ON public.portfolio_items
          FOR ALL USING (auth.uid() = creator_id);
    END IF;
END $$;

-- Services policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'services' AND policyname = 'Services are viewable by everyone') THEN
        CREATE POLICY "Services are viewable by everyone" ON public.services
          FOR SELECT USING (true);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'services' AND policyname = 'Only admins can manage services') THEN
        CREATE POLICY "Only admins can manage services" ON public.services
          FOR ALL USING (
            EXISTS (
              SELECT 1 FROM public.profiles 
              WHERE id = auth.uid() AND role = 'admin'
            )
          );
    END IF;
END $$;

-- Projects policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Projects are viewable by everyone') THEN
        CREATE POLICY "Projects are viewable by everyone" ON public.projects
          FOR SELECT USING (true);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Brands can manage own projects') THEN
        CREATE POLICY "Brands can manage own projects" ON public.projects
          FOR ALL USING (auth.uid() = brand_id);
    END IF;
END $$;

-- Messages policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Users can view messages they sent or received') THEN
        CREATE POLICY "Users can view messages they sent or received" ON public.messages
          FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Users can send messages') THEN
        CREATE POLICY "Users can send messages" ON public.messages
          FOR INSERT WITH CHECK (auth.uid() = sender_id);
    END IF;
END $$;

-- Notifications policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can view own notifications') THEN
        CREATE POLICY "Users can view own notifications" ON public.notifications
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can update own notifications') THEN
        CREATE POLICY "Users can update own notifications" ON public.notifications
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Creator stats policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'creator_stats' AND policyname = 'Creator stats are viewable by everyone') THEN
        CREATE POLICY "Creator stats are viewable by everyone" ON public.creator_stats
          FOR SELECT USING (true);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'creator_stats' AND policyname = 'Creators can view own stats') THEN
        CREATE POLICY "Creators can view own stats" ON public.creator_stats
          FOR ALL USING (auth.uid() = creator_id);
    END IF;
END $$;

-- Search filters policies (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'search_filters' AND policyname = 'Users can manage own search filters') THEN
        CREATE POLICY "Users can manage own search filters" ON public.search_filters
          FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;

-- Create functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
        CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_media_files_updated_at') THEN
        CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON public.media_files
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_portfolio_items_updated_at') THEN
        CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON public.portfolio_items
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_services_updated_at') THEN
        CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_updated_at') THEN
        CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_project_applications_updated_at') THEN
        CREATE TRIGGER update_project_applications_updated_at BEFORE UPDATE ON public.project_applications
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_payments_updated_at') THEN
        CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_creator_stats_updated_at') THEN
        CREATE TRIGGER update_creator_stats_updated_at BEFORE UPDATE ON public.creator_stats
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only insert if the user doesn't already have a profile
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
    );
    
    -- Create creator stats entry if user is a creator
    INSERT INTO public.creator_stats (creator_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update creator stats when projects change
CREATE OR REPLACE FUNCTION public.update_creator_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update stats for the creator
  UPDATE public.creator_stats 
  SET 
    total_projects = (
      SELECT COUNT(*) FROM public.projects 
      WHERE creator_id = COALESCE(NEW.creator_id, OLD.creator_id)
    ),
    completed_projects = (
      SELECT COUNT(*) FROM public.projects 
      WHERE creator_id = COALESCE(NEW.creator_id, OLD.creator_id) 
      AND status = 'completed'
    ),
    success_rate = (
      SELECT CASE 
        WHEN COUNT(*) = 0 THEN 0 
        ELSE (COUNT(*) FILTER (WHERE status = 'completed')::DECIMAL / COUNT(*)) * 100 
      END
      FROM public.projects 
      WHERE creator_id = COALESCE(NEW.creator_id, OLD.creator_id)
    ),
    updated_at = NOW()
  WHERE creator_id = COALESCE(NEW.creator_id, OLD.creator_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update rating when reviews change
CREATE OR REPLACE FUNCTION public.update_creator_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update profile rating and review count
  UPDATE public.profiles 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0) FROM public.reviews 
      WHERE reviewed_id = COALESCE(NEW.reviewed_id, OLD.reviewed_id)
    ),
    total_reviews = (
      SELECT COUNT(*) FROM public.reviews 
      WHERE reviewed_id = COALESCE(NEW.reviewed_id, OLD.reviewed_id)
    )
  WHERE id = COALESCE(NEW.reviewed_id, OLD.reviewed_id);
  
  -- Update creator stats
  UPDATE public.creator_stats 
  SET 
    average_rating = (
      SELECT COALESCE(AVG(rating), 0) FROM public.reviews 
      WHERE reviewed_id = COALESCE(NEW.reviewed_id, OLD.reviewed_id)
    ),
    updated_at = NOW()
  WHERE creator_id = COALESCE(NEW.reviewed_id, OLD.reviewed_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    END IF;
END $$;

-- Triggers for updating creator stats (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_stats_on_project_change') THEN
        CREATE TRIGGER update_stats_on_project_change
          AFTER INSERT OR UPDATE OR DELETE ON public.projects
          FOR EACH ROW EXECUTE FUNCTION public.update_creator_stats();
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_rating_on_review_change') THEN
        CREATE TRIGGER update_rating_on_review_change
          AFTER INSERT OR UPDATE OR DELETE ON public.reviews
          FOR EACH ROW EXECUTE FUNCTION public.update_creator_rating();
    END IF;
END $$;

-- Insert default services
INSERT INTO public.services (name, slug, description, category, base_price) VALUES
  ('Modèles Professionnels', 'modeles', 'Modèles vérifiés pour vos shootings et campagnes', 'modeles', 500),
  ('Shootings Photo', 'shootings', 'Séances photo professionnelles avec nos modèles', 'shootings', 800),
  ('Campagnes Publicitaires', 'publicite', 'Campagnes publicitaires avec ROI garanti', 'publicite', 2000),
  ('Créateurs UGC', 'ugc', 'Contenu authentique généré par nos créateurs', 'ugc', 300)
ON CONFLICT (slug) DO NOTHING; 