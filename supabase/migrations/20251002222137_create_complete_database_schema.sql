/*
  # Complete Database Schema for Tech Birds Consulting
  
  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `company` (text)
      - `message` (text, required)
      - `created_at` (timestamptz)
      
    - `employees`
      - `id` (uuid, primary key)
      - `employee_id` (text, unique, required) - For payslip lookup
      - `name` (text, required)
      - `email` (text, unique, required)
      - `phone` (text)
      - `designation` (text)
      - `department` (text)
      - `date_of_joining` (date)
      - `pan_number` (text)
      - `uan_number` (text)
      - `bank_account` (text)
      - `ifsc_code` (text)
      - `base_salary` (numeric, default 0)
      - `status` (text, default 'active')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `payslips`
      - `id` (uuid, primary key)
      - `employee_id` (uuid, foreign key)
      - `month` (text, required)
      - `year` (integer, required)
      - `basic_salary` (numeric, default 0)
      - `hra` (numeric, default 0)
      - `conveyance` (numeric, default 0)
      - `special_allowance` (numeric, default 0)
      - `pf` (numeric, default 0)
      - `professional_tax` (numeric, default 0)
      - `tds` (numeric, default 0)
      - `gross_salary` (numeric, default 0)
      - `total_deductions` (numeric, default 0)
      - `net_salary` (numeric, default 0)
      - `created_at` (timestamptz)
      
    - `job_applications`
      - `id` (uuid, primary key)
      - `job_title` (text, required)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `location` (text)
      - `experience` (text)
      - `resume_url` (text)
      - `cover_letter` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
    - Allow public insert for contacts and job applications
    
  3. Indexes
    - Index on employee_id for quick payslip lookups
    - Index on email for employee searches
    - Index on created_at for all tables
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  designation text,
  department text,
  date_of_joining date,
  pan_number text,
  uan_number text,
  bank_account text,
  ifsc_code text,
  base_salary numeric DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payslips table
CREATE TABLE IF NOT EXISTS payslips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  month text NOT NULL,
  year integer NOT NULL,
  basic_salary numeric DEFAULT 0,
  hra numeric DEFAULT 0,
  conveyance numeric DEFAULT 0,
  special_allowance numeric DEFAULT 0,
  pf numeric DEFAULT 0,
  professional_tax numeric DEFAULT 0,
  tds numeric DEFAULT 0,
  gross_salary numeric DEFAULT 0,
  total_deductions numeric DEFAULT 0,
  net_salary numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, month, year)
);

-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  experience text,
  resume_url text,
  cover_letter text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_employees_employee_id ON employees(employee_id);
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_payslips_employee_id ON payslips(employee_id);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Contacts policies (public can insert, authenticated can view)
CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Employees policies (authenticated only)
CREATE POLICY "Authenticated users can view employees"
  ON employees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert employees"
  ON employees FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update employees"
  ON employees FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete employees"
  ON employees FOR DELETE
  TO authenticated
  USING (true);

-- Payslips policies (authenticated only)
CREATE POLICY "Authenticated users can view payslips"
  ON payslips FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert payslips"
  ON payslips FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update payslips"
  ON payslips FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete payslips"
  ON payslips FOR DELETE
  TO authenticated
  USING (true);

-- Job applications policies (public can insert, authenticated can view)
CREATE POLICY "Anyone can submit job application"
  ON job_applications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view job applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update job applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete job applications"
  ON job_applications FOR DELETE
  TO authenticated
  USING (true);