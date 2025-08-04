/*
  # CUK PrepVault+ Database Schema

  1. New Tables
    - `programs`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text) - 'undergraduate' or 'postgraduate'
      - `specializations` (text array)
      - `semesters` (integer)
      - `created_at` (timestamp)
    
    - `resources`
      - `id` (uuid, primary key)
      - `program_id` (uuid, foreign key)
      - `semester` (integer)
      - `title` (text)
      - `type` (text) - 'previous_year_papers', 'study_material', 'syllabus'
      - `file_url` (text)
      - `file_size` (text)
      - `upload_date` (timestamp)
      - `uploaded_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
    
    - `downloads`
      - `id` (uuid, primary key)
      - `resource_id` (uuid, foreign key)
      - `downloaded_at` (timestamp)
      - `ip_address` (text)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access and admin write access
</sql>

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('undergraduate', 'postgraduate')),
  specializations text[] DEFAULT '{}',
  semesters integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES programs(id) ON DELETE CASCADE,
  semester integer NOT NULL,
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('previous_year_papers', 'study_material', 'syllabus')),
  file_url text NOT NULL,
  file_size text,
  upload_date timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create downloads table
CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  downloaded_at timestamptz DEFAULT now(),
  ip_address text
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Programs policies
CREATE POLICY "Programs are viewable by everyone"
  ON programs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Programs can be managed by authenticated users"
  ON programs
  FOR ALL
  TO authenticated
  USING (true);

-- Resources policies
CREATE POLICY "Resources are viewable by everyone"
  ON resources
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Resources can be managed by authenticated users"
  ON resources
  FOR ALL
  TO authenticated
  USING (true);

-- Downloads policies
CREATE POLICY "Downloads can be inserted by everyone"
  ON downloads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Downloads are viewable by authenticated users"
  ON downloads
  FOR SELECT
  TO authenticated
  USING (true);

-- Contact messages policies
CREATE POLICY "Contact messages can be inserted by everyone"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Contact messages are viewable by authenticated users"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial programs data
INSERT INTO programs (name, type, specializations, semesters) VALUES
  ('B.A. (Hons)', 'undergraduate', ARRAY['English', 'Political Science', 'Economics'], 6),
  ('B.Sc. (Hons)', 'undergraduate', ARRAY['Physics', 'Mathematics', 'Biotechnology'], 6),
  ('B.Sc.+M.Sc. Integrated', 'undergraduate', ARRAY['Biotechnology', 'Zoology'], 10),
  ('B.Tech', 'undergraduate', ARRAY['Computer Science & Engineering'], 8),
  ('BBA (Hons)', 'undergraduate', ARRAY['Business Administration'], 6),
  ('BA LLB (Hons)', 'undergraduate', ARRAY['Integrated Law'], 10),
  ('BVoc', 'undergraduate', ARRAY['Tourism & Hospitality Management'], 6),
  ('ITEP', 'undergraduate', ARRAY['Integrated Teacher Education'], 8),
  ('PG Diploma', 'undergraduate', ARRAY['Various Specializations'], 2),
  ('M.A.', 'postgraduate', ARRAY['Economics', 'Political Science', 'English'], 4),
  ('M.Sc.', 'postgraduate', ARRAY['Chemistry', 'Botany'], 4),
  ('MBA', 'postgraduate', ARRAY['Business Administration'], 4),
  ('M.Ed.', 'postgraduate', ARRAY['Education'], 4),
  ('M.P.Ed.', 'postgraduate', ARRAY['Physical Education'], 4),
  ('M.Tech', 'postgraduate', ARRAY['Structural Engineering', 'Computer Science & Engineering'], 4),
  ('MTTM', 'postgraduate', ARRAY['Master of Tourism and Travel Management'], 4);