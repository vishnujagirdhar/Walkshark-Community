-- ============================================================
-- WALKSHARK COMMUNITY REWARDS: INITIAL SCHEMA & RLS POLICIES
-- ============================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ACTIVITY_TYPES (Points Configuration Table)
CREATE TABLE IF NOT EXISTS public.activity_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  points INTEGER NOT NULL CHECK (points >= 0),
  reward_inr NUMERIC NOT NULL CHECK (reward_inr >= 0),
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_type_id UUID NOT NULL REFERENCES public.activity_types(id),
  instagram_url TEXT NOT NULL,
  proof_url TEXT,
  caption TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_instagram_url UNIQUE (instagram_url)
);

-- 4. POINTS_LEDGER TABLE (Append-Only Ledger)
CREATE TABLE IF NOT EXISTS public.points_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  submission_id UUID REFERENCES public.submissions(id) ON DELETE SET NULL,
  points INTEGER NOT NULL,
  reward_inr NUMERIC NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned', 'redeemed', 'adjustment')),
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  points_threshold INTEGER NOT NULL UNIQUE,
  reward_inr NUMERIC NOT NULL,
  title TEXT NOT NULL,
  celebration_message TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

-- 6. REDEMPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  points_redeemed INTEGER NOT NULL CHECK (points_redeemed >= 100),
  amount_inr NUMERIC NOT NULL CHECK (amount_inr >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'rejected')),
  payment_details TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Profiles: Users read and update their own, Admins read all
CREATE POLICY "Public read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins read all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Activity types & Milestones: Everyone can read
CREATE POLICY "Public read activity_types" ON public.activity_types
  FOR SELECT USING (true);

CREATE POLICY "Admin write activity_types" ON public.activity_types
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Public read milestones" ON public.milestones
  FOR SELECT USING (true);

-- Submissions: Users read and create own; Admins read and update all
CREATE POLICY "Users read own submissions" ON public.submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own submissions" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all submissions" ON public.submissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Points ledger: Users read own ledger; Admins manage all
CREATE POLICY "Users read own ledger" ON public.points_ledger
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all ledger" ON public.points_ledger
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Redemptions: Users read and insert own; Admins manage all
CREATE POLICY "Users read own redemptions" ON public.redemptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create redemptions" ON public.redemptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage redemptions" ON public.redemptions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Settings: Everyone reads, Admins update
CREATE POLICY "Public read settings" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "Admin update settings" ON public.settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- INITIAL SEED DATA
-- ============================================================
INSERT INTO public.activity_types (slug, name, points, reward_inr, description, icon) VALUES
  ('story', 'Instagram Story', 20, 50, 'Approved WalkShark-related story tagging @walkshark', 'Camera'),
  ('reel', 'Instagram Reel', 30, 75, 'Public, original reel clearly showing the product/brand', 'Film'),
  ('post', 'Instagram Post', 30, 75, 'Original feed post featuring WalkShark', 'Image'),
  ('travel', 'Travel + WalkShark Product', 50, 125, 'Travel/location content featuring the product', 'Compass'),
  ('family', 'Family Using WalkShark on a Walk', 80, 200, 'Genuine family walking moment, product visibly in use', 'Users'),
  ('birthday', 'Birthday Wish', 10, 25, 'Approved birthday/community wish activity', 'Gift')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.milestones (points_threshold, reward_inr, title, celebration_message, sort_order) VALUES
  (100, 250, '100 Points Milestone', 'You unlocked your first ₹250 reward!', 1),
  (250, 625, '250 Points Milestone', 'You''re building serious WalkShark community value!', 2),
  (500, 1250, '500 Points Milestone', 'Halfway to 1,000 points!', 3),
  (1000, 2500, '1,000 Points Milestone', 'WalkShark Community Champion milestone!', 4)
ON CONFLICT (points_threshold) DO NOTHING;

INSERT INTO public.settings (key, value, description) VALUES
  ('points_conversion_rate', '2.5'::jsonb, 'Rupee value per reward point (100 pts = ₹250)'),
  ('min_redemption_points', '100'::jsonb, 'Minimum points required to request redemption'),
  ('monthly_cap', '{"enabled": false, "points": 500}'::jsonb, 'Configurable monthly earning cap'),
  ('validity_period', '{"enabled": false, "days": 365}'::jsonb, 'Points validity period')
ON CONFLICT (key) DO NOTHING;
