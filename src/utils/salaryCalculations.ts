export interface SalaryBreakdown {
  basicSalary: number;
  hra: number;
  conveyanceAllowance: number;
  medicalAllowance: number;
  specialAllowance: number;
  grossSalary: number;
  providentFund: number;
  professionalTax: number;
  incomeTax: number;
  totalDeductions: number;
  netSalary: number;
}

export const calculateSalary = (
  basicSalary: number,
  hra: number = 0,
  conveyanceAllowance: number = 0,
  medicalAllowance: number = 0,
  specialAllowance: number = 0,
  providentFund: number = 0,
  professionalTax: number = 0,
  incomeTax: number = 0
): SalaryBreakdown => {
  const grossSalary = basicSalary + hra + conveyanceAllowance + medicalAllowance + specialAllowance;
  const totalDeductions = providentFund + professionalTax + incomeTax;
  const netSalary = grossSalary - totalDeductions;

  return {
    basicSalary,
    hra,
    conveyanceAllowance,
    medicalAllowance,
    specialAllowance,
    grossSalary,
    providentFund,
    professionalTax,
    incomeTax,
    totalDeductions,
    netSalary,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const calculateNetSalary = (salaryData: Partial<SalaryBreakdown>): number => {
  const {
    basicSalary = 0,
    hra = 0,
    conveyanceAllowance = 0,
    medicalAllowance = 0,
    specialAllowance = 0,
    providentFund = 0,
    professionalTax = 0,
    incomeTax = 0,
  } = salaryData;

  const grossSalary = basicSalary + hra + conveyanceAllowance + medicalAllowance + specialAllowance;
  const totalDeductions = providentFund + professionalTax + incomeTax;
  return grossSalary - totalDeductions;
};

export const calculateSalaryBreakdown = calculateSalary;

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};
