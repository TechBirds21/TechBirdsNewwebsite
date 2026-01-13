
import React from 'react';

interface FormData {
  month: number;
  year: number;
  working_days: number;
  paid_days: number;
}

interface PayslipFormFieldsProps {
  formData: FormData;
  onFormDataChange: (updates: Partial<FormData>) => void;
}

const PayslipFormFields: React.FC<PayslipFormFieldsProps> = ({
  formData,
  onFormDataChange
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
        <select
          value={formData.month}
          onChange={(e) => onFormDataChange({ month: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
        >
          {monthNames.map((month, index) => (
            <option key={index + 1} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
        <input
          type="number"
          value={formData.year}
          onChange={(e) => onFormDataChange({ year: parseInt(e.target.value) })}
          min="2020"
          max="2030"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
        <input
          type="number"
          value={formData.working_days}
          onChange={(e) => onFormDataChange({ working_days: parseInt(e.target.value) })}
          min="1"
          max="31"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Paid Days</label>
        <input
          type="number"
          value={formData.paid_days}
          onChange={(e) => onFormDataChange({ paid_days: parseInt(e.target.value) })}
          min="0"
          max={formData.working_days}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
        />
      </div>
    </>
  );
};

export default PayslipFormFields;
