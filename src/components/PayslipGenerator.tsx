import React, { useState, useEffect } from 'react';
import { X, Download, User, Eye, Phone, Mail, CreditCard, Building, DollarSign, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { calculateSalaryBreakdown, calculateNetSalary, getDaysInMonth } from '@/utils/salaryCalculations';
import EmployeeSelector from './payslip/EmployeeSelector';
import PayslipFormFields from './payslip/PayslipFormFields';
import SalaryBreakdown from './payslip/SalaryBreakdown';

interface PayslipGeneratorProps {
  onClose: () => void;
  onPayslipGenerated: () => void;
}

const PayslipGenerator: React.FC<PayslipGeneratorProps> = ({ onClose, onPayslipGenerated }) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    working_days: 30,
    paid_days: 30,
    ctc: 0,
    basic_salary: 0,
    hra: 0,
    medical_allowance: 0,
    special_allowances: 0,
    lta: 0,
    pf_deduction: 1800,
    professional_tax: 200,
    tds: 0,
    other_deductions: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee && selectedEmployee.monthly_salary) {
      const breakdown = calculateSalaryBreakdown(selectedEmployee.monthly_salary);
      setFormData(prev => ({
        ...prev,
        ctc: selectedEmployee.monthly_salary,
        ...breakdown
      }));
    }
  }, [selectedEmployee]);

  useEffect(() => {
    const daysInMonth = getDaysInMonth(formData.month, formData.year);
    setFormData(prev => ({
      ...prev,
      working_days: daysInMonth,
      paid_days: Math.min(prev.paid_days, daysInMonth)
    }));
  }, [formData.month, formData.year]);

  const fetchEmployees = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('employees')
        .select(`
          id,
          employee_id,
          full_name,
          father_name,
          personal_email,
          mobile,
          designation,
          joining_date,
          monthly_salary,
          pan_no,
          aadhar_no,
          bank_name,
          account_no,
          ifsc,
          pf_no,
          uan,
          status
        `)
        .eq('status', 'active')
        .order('full_name');
      
      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      setError(error.message);
      toast({
        title: "Error",
        description: `Failed to load employees: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleEmployeeChange = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
    setFormData(prev => ({
      ...prev,
      employee_id: employeeId
    }));
    
    if (employee) {
      setShowEmployeeDetails(true);
    }
  };

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleGeneratePayslip = async () => {
    if (!selectedEmployee) {
      toast({
        title: "Error",
        description: "Please select an employee",
        variant: "destructive"
      });
      return;
    }

    if (!formData.basic_salary || !formData.hra || !formData.medical_allowance) {
      toast({
        title: "Error",
        description: "Please ensure all salary components are calculated",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);

    try {
      
      // Check if payslip already exists
      const { data: existingPayslip, error: checkError } = await supabase
        .from('payslips')
        .select('id')
        .eq('employee_id', formData.employee_id)
        .eq('month', formData.month)
        .eq('year', formData.year)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing payslip:', checkError);
        throw checkError;
      }

      if (existingPayslip) {
        toast({
          title: "Error",
          description: "Payslip for this month already exists",
          variant: "destructive"
        });
        return;
      }

      const { netSalary, totalEarnings, totalDeductions, grossSalary } = calculateNetSalary(formData);

      // Prepare payslip data with all required fields
      const payslipData = {
        employee_id: formData.employee_id,
        month: formData.month,
        year: formData.year,
        working_days: formData.working_days,
        paid_days: formData.paid_days,
        ctc: formData.ctc,
        basic_salary: formData.basic_salary,
        hra: formData.hra,
        medical_allowance: formData.medical_allowance,
        special_allowances: formData.special_allowances,
        lta: formData.lta,
        pf_deduction: formData.pf_deduction,
        professional_tax: formData.professional_tax,
        tds: formData.tds,
        other_deductions: formData.other_deductions,
        gross_salary: grossSalary,
        net_salary: netSalary,
        total_deductions: totalDeductions
      };

      const { error: insertError } = await supabase
        .from('payslips')
        .insert([payslipData])
        .select()
        .maybeSingle();

      if (insertError) {
        throw insertError;
      }
      const { generatePayslipPDF } = await import('@/utils/pdfGenerator');
      const doc = generatePayslipPDF(selectedEmployee, formData);
      doc.save(`${selectedEmployee.full_name}_${formData.month}_${formData.year}_payslip.pdf`);

      toast({
        title: "Success",
        description: "Payslip generated and downloaded successfully"
      });

      onPayslipGenerated();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to generate payslip: ${error?.message || 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Generate Payslip</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmployeeSelector
              employees={employees}
              selectedEmployeeId={formData.employee_id}
              onEmployeeChange={handleEmployeeChange}
            />
            <PayslipFormFields
              formData={formData}
              onFormDataChange={handleFormDataChange}
            />
          </div>

          {selectedEmployee && (
            <>
              {/* Employee Details Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Selected Employee Details
                  </h3>
                  <button
                    onClick={() => setShowEmployeeDetails(!showEmployeeDetails)}
                    className="text-blue-600 hover:text-slate-800 p-2 hover:bg-blue-100 rounded-lg transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <p className="text-gray-800 font-semibold">{selectedEmployee.full_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Employee ID:</span>
                    <p className="text-gray-800 font-mono">{selectedEmployee.employee_id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Designation:</span>
                    <p className="text-gray-800">{selectedEmployee.designation}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Monthly Salary:</span>
                    <p className="text-gray-800 font-bold text-green-600">₹{selectedEmployee.monthly_salary?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p className="text-gray-800">{selectedEmployee.personal_email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Mobile:</span>
                    <p className="text-gray-800">{selectedEmployee.mobile}</p>
                  </div>
                </div>

                {showEmployeeDetails && (
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Banking Details */}
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Building className="w-4 h-4 mr-2 text-blue-600" />
                          Banking Details
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Bank:</span>
                            <p className="text-gray-800">{selectedEmployee.bank_name || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Account:</span>
                            <p className="text-gray-800 font-mono">{selectedEmployee.account_no || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">IFSC:</span>
                            <p className="text-gray-800 font-mono">{selectedEmployee.ifsc || 'N/A'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Government IDs */}
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
                          Government IDs
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">PAN:</span>
                            <p className="text-gray-800 font-mono">{selectedEmployee.pan_no || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Aadhar:</span>
                            <p className="text-gray-800 font-mono">{selectedEmployee.aadhar_no || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">PF No:</span>
                            <p className="text-gray-800 font-mono">{selectedEmployee.pf_no || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">UAN:</span>
                            <p className="text-gray-800 font-mono">{selectedEmployee.uan || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <SalaryBreakdown formData={formData} />
            </>
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGeneratePayslip}
              disabled={isGenerating || !selectedEmployee}
              className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate & Download Payslip'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipGenerator;