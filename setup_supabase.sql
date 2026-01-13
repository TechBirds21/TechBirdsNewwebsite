-- Tech Birds Consulting - Complete Database Setup
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for application status
DO $$ BEGIN
  CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'accepted', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for employee status
DO $$ BEGIN
  CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'terminated');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  experience TEXT,
  salary TEXT,
  description TEXT NOT NULL,
  responsibilities TEXT[],
  requirements TEXT[],
  nice_to_have TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT,
  current_location TEXT,
  expected_salary TEXT,
  resume_url TEXT,
  portfolio_url TEXT,
  cover_letter TEXT NOT NULL,
  status application_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'contact',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  father_name TEXT,
  personal_email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  pan_no TEXT,
  aadhar_no TEXT,
  bank_name TEXT,
  account_no TEXT,
  ifsc TEXT,
  pf_no TEXT DEFAULT 'NA',
  uan TEXT DEFAULT 'NA',
  designation TEXT NOT NULL,
  joining_date DATE NOT NULL,
  exit_date DATE,
  status employee_status DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payslips table
CREATE TABLE IF NOT EXISTS public.payslips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL,
  working_days INTEGER NOT NULL,
  paid_days INTEGER NOT NULL,
  ctc DECIMAL(10,2) NOT NULL,
  pdf_url TEXT,
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, month, year)
);

-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active jobs" ON public.jobs;
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin full access to jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admin can view job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Admin can update job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Admin full access to contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin full access to employees" ON public.employees;
DROP POLICY IF EXISTS "Admin full access to payslips" ON public.payslips;
DROP POLICY IF EXISTS "Admin can view own profile" ON public.admin_users;

-- Create policies for public access to jobs (read-only)
CREATE POLICY "Public can view active jobs" ON public.jobs
  FOR SELECT USING (is_active = true);

-- Create policies for job applications (insert only for public)
CREATE POLICY "Anyone can submit job applications" ON public.job_applications
  FOR INSERT WITH CHECK (true);

-- Create policies for contact submissions (insert only for public)
CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Simplified policies for admin access (works without Supabase Auth)
CREATE POLICY "Admin full access to jobs" ON public.jobs
  FOR ALL USING (true);

CREATE POLICY "Admin can view job applications" ON public.job_applications
  FOR SELECT USING (true);

CREATE POLICY "Admin can update job applications" ON public.job_applications
  FOR UPDATE USING (true);

CREATE POLICY "Admin full access to contact submissions" ON public.contact_submissions
  FOR SELECT USING (true);

CREATE POLICY "Admin full access to employees" ON public.employees
  FOR ALL USING (true);

CREATE POLICY "Admin full access to payslips" ON public.payslips
  FOR ALL USING (true);

CREATE POLICY "Admin can view own profile" ON public.admin_users
  FOR SELECT USING (true);

-- Insert sample job data
INSERT INTO public.jobs (title, department, location, type, experience, salary, description, responsibilities, requirements, nice_to_have)
VALUES
('Senior Full-Stack Developer', 'Engineering', 'Remote / Hyderabad', 'Full-time', '4-6 years', '₹12-18 LPA',
 'We are seeking a talented Senior Full-Stack Developer to join our dynamic team.',
 ARRAY['Develop and maintain web applications', 'Collaborate with cross-functional teams', 'Write clean, maintainable code'],
 ARRAY['4-6 years of experience', 'Proficiency in React, Node.js', 'Experience with cloud platforms'],
 ARRAY['AI/ML integration experience', 'DevOps knowledge', 'Open-source contributions']),
('UI/UX Designer', 'Design', 'Remote / Hyderabad', 'Full-time', '3-5 years', '₹8-12 LPA',
 'Join our design team to create intuitive and beautiful user experiences.',
 ARRAY['Design user interfaces', 'Create wireframes and prototypes', 'Conduct user research'],
 ARRAY['3-5 years of UI/UX experience', 'Proficiency in Figma', 'Strong portfolio'],
 ARRAY['Front-end development knowledge', 'Animation skills', 'B2B software experience'])
ON CONFLICT DO NOTHING;

-- Insert default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, full_name)
VALUES ('admin@techbirdsconsulting.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Tech Birds Admin')
ON CONFLICT (email) DO NOTHING;
