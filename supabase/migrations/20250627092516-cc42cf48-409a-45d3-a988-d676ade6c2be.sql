
-- Add monthly_salary column to employees table
ALTER TABLE public.employees 
ADD COLUMN monthly_salary numeric;

-- Add comment to the column
COMMENT ON COLUMN public.employees.monthly_salary IS 'Monthly salary amount in rupees';
