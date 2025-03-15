-- Create contact_submissions table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contact_submissions') THEN
    CREATE TABLE public.contact_submissions (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
      status TEXT DEFAULT 'new' NOT NULL
    );
  END IF;
END
$$;

-- Set up Row Level Security (RLS) for contact_submissions table
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  DROP POLICY IF EXISTS "Admin can view contact submissions" ON public.contact_submissions;
  DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.contact_submissions;
END
$$;

-- Create policies
CREATE POLICY "Admin can view contact submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can insert contact submissions"
  ON public.contact_submissions FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Ensure RLS is enforced
ALTER TABLE public.contact_submissions FORCE ROW LEVEL SECURITY;

