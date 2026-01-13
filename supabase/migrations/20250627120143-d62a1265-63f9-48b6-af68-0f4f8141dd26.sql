
-- Add missing salary breakdown columns to payslips table
ALTER TABLE public.payslips 
ADD COLUMN basic_salary numeric,
ADD COLUMN hra numeric,
ADD COLUMN medical_allowance numeric,
ADD COLUMN special_allowances numeric,
ADD COLUMN lta numeric,
ADD COLUMN pf_deduction numeric,
ADD COLUMN professional_tax numeric,
ADD COLUMN tds numeric,
ADD COLUMN other_deductions numeric,
ADD COLUMN gross_salary numeric,
ADD COLUMN net_salary numeric,
ADD COLUMN total_deductions numeric;

-- Add comments to the new columns
COMMENT ON COLUMN public.payslips.basic_salary IS 'Basic salary amount';
COMMENT ON COLUMN public.payslips.hra IS 'House rent allowance';
COMMENT ON COLUMN public.payslips.medical_allowance IS 'Medical allowance amount';
COMMENT ON COLUMN public.payslips.special_allowances IS 'Special allowances amount';
COMMENT ON COLUMN public.payslips.lta IS 'Leave travel allowance';
COMMENT ON COLUMN public.payslips.pf_deduction IS 'Provident fund deduction';
COMMENT ON COLUMN public.payslips.professional_tax IS 'Professional tax deduction';
COMMENT ON COLUMN public.payslips.tds IS 'Tax deducted at source';
COMMENT ON COLUMN public.payslips.other_deductions IS 'Other deductions';
COMMENT ON COLUMN public.payslips.gross_salary IS 'Gross salary amount';
COMMENT ON COLUMN public.payslips.net_salary IS 'Net salary after deductions';
COMMENT ON COLUMN public.payslips.total_deductions IS 'Total deductions amount';
