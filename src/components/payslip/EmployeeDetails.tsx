
import React from 'react';

interface Employee {
  full_name: string;
  employee_id: string;
  designation: string;
  monthly_salary: number;
  pf_no: string;
  uan: string;
}

interface EmployeeDetailsProps {
  employee: Employee;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Employee Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-600">Name:</span>
          <p className="text-gray-800">{employee.full_name}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Employee ID:</span>
          <p className="text-gray-800">{employee.employee_id}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Designation:</span>
          <p className="text-gray-800">{employee.designation}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Monthly Salary:</span>
          <p className="text-gray-800">₹{employee.monthly_salary?.toLocaleString() || 'N/A'}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">PF Number:</span>
          <p className="text-gray-800">{employee.pf_no || 'N/A'}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">UAN:</span>
          <p className="text-gray-800">{employee.uan || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
