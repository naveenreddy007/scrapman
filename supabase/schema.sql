-- Check if profiles table exists, if not, create it
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    CREATE TABLE public.profiles (
      id uuid references auth.users on delete cascade not null primary key,
      name text,
      email text,
      phone text,
      created_at timestamp with time zone default now() not null
    );
  END IF;
END
$$;

-- Create scrap_items table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'scrap_items') THEN
    CREATE TABLE public.scrap_items (
      id uuid default gen_random_uuid() primary key,
      name text not null,
      working_price_min integer not null,
      working_price_max integer not null,
      not_working_price_min integer not null,
      not_working_price_max integer not null,
      created_at timestamp with time zone default now() not null
    );
  END IF;
END
$$;

-- Create scrap_requests table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'scrap_requests') THEN
    CREATE TABLE public.scrap_requests (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references public.profiles not null,
      item_type uuid references public.scrap_items not null,
      condition text not null check (condition in ('working', 'not_working')),
      description text,
      address text not null,
      city text not null,
      state text not null,
      pincode text not null,
      pickup_date timestamp with time zone not null,
      pickup_time_slot text not null check (pickup_time_slot in ('morning', 'afternoon', 'evening')),
      status text not null check (status in ('pending', 'scheduled', 'completed')),
      estimated_price_min integer not null,
      estimated_price_max integer not null,
      created_at timestamp with time zone default now() not null
    );
  END IF;
END
$$;

-- Create scrap_request_images table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'scrap_request_images') THEN
    CREATE TABLE public.scrap_request_images (
      id uuid default gen_random_uuid() primary key,
      request_id uuid references public.scrap_requests on delete cascade not null,
      image_path text not null,
      created_at timestamp with time zone default now() not null
    );
  END IF;
END
$$;

-- Function to handle new user signups (create or replace to update if it exists)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, phone)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email, new.raw_user_meta_data->>'phone');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if the trigger exists, if not, create it
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END
$$;

-- Set up or update Row Level Security (RLS) for profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
END
$$;

CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Ensure RLS is enforced
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

-- Set up or update Row Level Security (RLS) for scrap_items table
ALTER TABLE public.scrap_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  DROP POLICY IF EXISTS "Anyone can view scrap items" ON public.scrap_items;
  DROP POLICY IF EXISTS "Admin can insert scrap items" ON public.scrap_items;
  DROP POLICY IF EXISTS "Admin can update scrap items" ON public.scrap_items;
END
$$;

CREATE POLICY "Anyone can view scrap items"
  ON public.scrap_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert scrap items"
  ON public.scrap_items FOR INSERT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can update scrap items"
  ON public.scrap_items FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Set up or update Row Level Security (RLS) for scrap_requests table
ALTER TABLE public.scrap_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view their own requests" ON public.scrap_requests;
  DROP POLICY IF EXISTS "Users can insert their own requests" ON public.scrap_requests;
  DROP POLICY IF EXISTS "Users can update their own pending requests" ON public.scrap_requests;
  DROP POLICY IF EXISTS "Admin can view all requests" ON public.scrap_requests;
  DROP POLICY IF EXISTS "Admin can update all requests" ON public.scrap_requests;
END
$$;

CREATE POLICY "Users can view their own requests"
  ON public.scrap_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own requests"
  ON public.scrap_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending requests"
  ON public.scrap_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admin can view all requests"
  ON public.scrap_requests FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can update all requests"
  ON public.scrap_requests FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Set up or update Row Level Security (RLS) for scrap_request_images table
ALTER TABLE public.scrap_request_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view their own request images" ON public.scrap_request_images;
  DROP POLICY IF EXISTS "Users can insert their own request images" ON public.scrap_request_images;
  DROP POLICY IF EXISTS "Admin can view all request images" ON public.scrap_request_images;
END
$$;

CREATE POLICY "Users can view their own request images"
  ON public.scrap_request_images FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.scrap_requests
      WHERE id = request_id
    )
  );

CREATE POLICY "Users can insert their own request images"
  ON public.scrap_request_images FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.scrap_requests
      WHERE id = request_id
    )
  );

CREATE POLICY "Admin can view all request images"
  ON public.scrap_request_images FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create storage bucket for scrap images if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM storage.buckets WHERE id = 'scrap_images') THEN
    INSERT INTO storage.buckets (id, name, public) VALUES ('scrap_images', 'scrap_images', false);
  END IF;
END
$$;

-- Set up storage policies
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can upload their own images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can view their own images" ON storage.objects;
  DROP POLICY IF EXISTS "Admin can view all images" ON storage.objects;
END
$$;

CREATE POLICY "Users can upload their own images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'scrap_images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'scrap_images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admin can view all images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'scrap_images' AND
    auth.jwt() ->> 'role' = 'admin'
  );

-- Insert sample data only if scrap_items table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.scrap_items LIMIT 1) THEN
    INSERT INTO public.scrap_items (name, working_price_min, working_price_max, not_working_price_min, not_working_price_max)
    VALUES
      ('Washing Machine', 1000, 3000, 500, 1500),
      ('Refrigerator', 1500, 4000, 800, 2000),
      ('Television', 800, 2500, 300, 1000),
      ('Air Conditioner', 2000, 5000, 1000, 2500),
      ('Computer', 1000, 3000, 500, 1500),
      ('Laptop', 1500, 5000, 700, 2000),
      ('Microwave Oven', 500, 1500, 200, 800),
      ('Water Heater', 400, 1200, 200, 600);
  END IF;
END
$$;

