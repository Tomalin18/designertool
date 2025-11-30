-- Create component_favorites table
CREATE TABLE IF NOT EXISTS public.component_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  component_slug TEXT NOT NULL,
  component_name TEXT NOT NULL,
  component_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, component_slug)
);

-- Create component_shares table for tracking shares
CREATE TABLE IF NOT EXISTS public.component_shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  component_slug TEXT NOT NULL,
  platform TEXT NOT NULL, -- 'twitter', 'facebook', 'linkedin', 'copy'
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_component_favorites_user_id ON public.component_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_component_favorites_slug ON public.component_favorites(component_slug);
CREATE INDEX IF NOT EXISTS idx_component_favorites_created_at ON public.component_favorites(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_component_shares_slug ON public.component_shares(component_slug);
CREATE INDEX IF NOT EXISTS idx_component_shares_platform ON public.component_shares(platform);

-- Enable Row Level Security
ALTER TABLE public.component_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_shares ENABLE ROW LEVEL SECURITY;

-- RLS Policies for component_favorites
-- Users can view their own favorites
CREATE POLICY "Users can view their own favorites"
  ON public.component_favorites
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own favorites
CREATE POLICY "Users can insert their own favorites"
  ON public.component_favorites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete their own favorites"
  ON public.component_favorites
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for component_shares
-- Anyone can insert shares (for analytics)
CREATE POLICY "Anyone can insert shares"
  ON public.component_shares
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view shares
CREATE POLICY "Authenticated users can view shares"
  ON public.component_shares
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON public.component_favorites TO authenticated;
GRANT ALL ON public.component_shares TO authenticated;
GRANT SELECT ON public.component_shares TO anon;
GRANT INSERT ON public.component_shares TO anon;

-- Add helpful comments
COMMENT ON TABLE public.component_favorites IS 'Stores user favorite components';
COMMENT ON TABLE public.component_shares IS 'Tracks component shares across different platforms';
