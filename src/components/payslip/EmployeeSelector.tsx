
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Employee {
  id: string;
  full_name: string;
  employee_id: string;
}

interface EmployeeSelectorProps {
  employees: Employee[];
  selectedEmployeeId: string;
  onEmployeeChange: (employeeId: string) => void;
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  employees,
  selectedEmployeeId,
  onEmployeeChange
}) => {
  const [searchId, setSearchId] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchId(value);

    if (value.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(emp =>
        emp.employee_id.toLowerCase().includes(value.toLowerCase()) ||
        emp.full_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmployees(filtered);

      if (filtered.length === 1) {
        onEmployeeChange(filtered[0].id);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search by Employee ID or Name
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchId}
            onChange={handleSearchChange}
            placeholder="Enter employee ID or name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          />
        </div>
        {searchId && filteredEmployees.length > 0 && (
          <p className="text-sm text-green-600 mt-1">
            Found {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''}
          </p>
        )}
        {searchId && filteredEmployees.length === 0 && (
          <p className="text-sm text-red-600 mt-1">
            No employees found matching "{searchId}"
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Employee</label>
        <select
          value={selectedEmployeeId}
          onChange={(e) => onEmployeeChange(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
        >
          <option value="">Choose an employee...</option>
          {filteredEmployees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.full_name} ({employee.employee_id})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EmployeeSelector;
