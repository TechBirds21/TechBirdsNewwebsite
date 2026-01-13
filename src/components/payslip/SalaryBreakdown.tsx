
import React from 'react';
import { calculateNetSalary } from '@/utils/salaryCalculations';

interface SalaryBreakdownProps {
  formData: any;
}

const SalaryBreakdown: React.FC<SalaryBreakdownProps> = ({ formData }) => {
  const netSalaryData = calculateNetSalary(formData);

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Salary Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Earnings</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Basic Salary:</span>
              <span>₹{formData.basic_salary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>House Rent Allowance:</span>
              <span>₹{formData.hra.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Medical Allowance:</span>
              <span>₹{formData.medical_allowance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Special Allowances:</span>
              <span>₹{formData.special_allowances.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>LTA:</span>
              <span>₹{formData.lta.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Earnings:</span>
              <span>₹{netSalaryData.totalEarnings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-3">Deductions</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>PF Deduction:</span>
              <span>₹{formData.pf_deduction.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Professional Tax:</span>
              <span>₹{formData.professional_tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>TDS:</span>
              <span>₹{formData.tds.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Other Deductions:</span>
              <span>₹{formData.other_deductions.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Deductions:</span>
              <span>₹{netSalaryData.totalDeductions.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-800">Net Salary:</span>
          <span className="text-2xl font-bold text-blue-800">₹{netSalaryData.netSalary.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Employer Contribution</h4>
        <div className="flex justify-between text-sm">
          <span>Employer PF Contribution:</span>
          <span>₹1,800</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryBreakdown;
