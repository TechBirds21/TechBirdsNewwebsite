
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type EmployeeStatus = Database['public']['Enums']['employee_status'];

interface EmployeeFormProps {
  employee?: any;
  onClose: () => void;
  onSaved: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    father_name: '',
    personal_email: '',
    mobile: '',
    designation: '',
    joining_date: '',
    exit_date: '',
    pan_no: '',
    aadhar_no: '',
    bank_name: '',
    account_no: '',
    ifsc: '',
    pf_no: '',
    uan: '',
    monthly_salary: '',
    status: 'active' as EmployeeStatus
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (employee) {
      setFormData({
        employee_id: employee.employee_id || '',
        full_name: employee.full_name || '',
        father_name: employee.father_name || '',
        personal_email: employee.personal_email || '',
        mobile: employee.mobile || '',
        designation: employee.designation || '',
        joining_date: employee.joining_date ? employee.joining_date.split('T')[0] : '',
        exit_date: employee.exit_date ? employee.exit_date.split('T')[0] : '',
        pan_no: employee.pan_no || '',
        aadhar_no: employee.aadhar_no || '',
        bank_name: employee.bank_name || '',
        account_no: employee.account_no || '',
        ifsc: employee.ifsc || '',
        pf_no: employee.pf_no || '',
        uan: employee.uan || '',
        monthly_salary: employee.monthly_salary ? employee.monthly_salary.toString() : '',
        status: (employee.status as EmployeeStatus) || 'active'
      });
    }
  }, [employee]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const employeeData = {
        employee_id: formData.employee_id,
        full_name: formData.full_name,
        father_name: formData.father_name || null,
        personal_email: formData.personal_email,
        mobile: formData.mobile,
        designation: formData.designation,
        joining_date: formData.joining_date,
        exit_date: formData.exit_date || null,
        pan_no: formData.pan_no || null,
        aadhar_no: formData.aadhar_no || null,
        bank_name: formData.bank_name || null,
        account_no: formData.account_no || null,
        ifsc: formData.ifsc || null,
        pf_no: formData.pf_no || null,
        uan: formData.uan || null,
        monthly_salary: formData.monthly_salary ? parseFloat(formData.monthly_salary) : null,
        status: formData.status
      };

      if (employee) {
        // Update existing employee
        const { error } = await supabase
          .from('employees')
          .update(employeeData)
          .eq('id', employee.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Employee updated successfully"
        });
      } else {
        // Create new employee
        const { error } = await supabase
          .from('employees')
          .insert(employeeData);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Employee created successfully"
        });
      }

      onSaved();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to save employee",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {employee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
              <input
                type="text"
                value={formData.employee_id}
                onChange={(e) => handleInputChange('employee_id', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
              <input
                type="text"
                value={formData.father_name}
                onChange={(e) => handleInputChange('father_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Personal Email</label>
              <input
                type="email"
                value={formData.personal_email}
                onChange={(e) => handleInputChange('personal_email', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Salary (₹)</label>
              <input
                type="number"
                value={formData.monthly_salary}
                onChange={(e) => handleInputChange('monthly_salary', e.target.value)}
                placeholder="25000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date</label>
              <input
                type="date"
                value={formData.joining_date}
                onChange={(e) => handleInputChange('joining_date', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exit Date (if applicable)</label>
              <input
                type="date"
                value={formData.exit_date}
                onChange={(e) => handleInputChange('exit_date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
              <input
                type="text"
                value={formData.pan_no}
                onChange={(e) => handleInputChange('pan_no', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
              <input
                type="text"
                value={formData.aadhar_no}
                onChange={(e) => handleInputChange('aadhar_no', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                value={formData.bank_name}
                onChange={(e) => handleInputChange('bank_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                value={formData.account_no}
                onChange={(e) => handleInputChange('account_no', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
              <input
                type="text"
                value={formData.ifsc}
                onChange={(e) => handleInputChange('ifsc', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PF Number</label>
              <input
                type="text"
                value={formData.pf_no}
                onChange={(e) => handleInputChange('pf_no', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UAN</label>
              <input
                type="text"
                value={formData.uan}
                onChange={(e) => handleInputChange('uan', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as EmployeeStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (employee ? 'Update Employee' : 'Create Employee')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
