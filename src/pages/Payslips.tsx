import React, { useState, useEffect } from 'react';
import { Download, Plus, Search, Calendar, User, DollarSign, FileText, Mail, Phone, CreditCard, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PayslipGenerator from '@/components/PayslipGenerator';
import { generatePayslipPDF } from '@/utils/pdfGenerator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGenerator, setShowGenerator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [payslipsRes, employeesRes] = await Promise.all([
        supabase
          .from('payslips')
          .select(`
            *,
            employees (
              id,
              employee_id,
              full_name,
              designation,
              personal_email,
              mobile,
              monthly_salary,
              father_name,
              pan_no,
              aadhar_no,
              bank_name,
              account_no,
              ifsc,
              pf_no,
              uan,
              joining_date,
              status
            )
          `)
          .order('created_at', { ascending: false }),
        supabase
          .from('employees')
          .select('*')
          .eq('status', 'active')
          .order('full_name')
      ]);

      if (payslipsRes.error) throw payslipsRes.error;
      if (employeesRes.error) throw employeesRes.error;

      setPayslips(payslipsRes.data || []);
      setEmployees(employeesRes.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPayslip = async (payslip) => {
    try {
      const employee = payslip.employees;
      if (!employee) {
        toast({
          title: "Error",
          description: "Employee data not found",
          variant: "destructive"
        });
        return;
      }

      const doc = generatePayslipPDF(employee, payslip);
      doc.save(`${employee.full_name}_${payslip.month}_${payslip.year}_payslip.pdf`);
      
      toast({
        title: "Success",
        description: "Payslip downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download payslip",
        variant: "destructive"
      });
    }
  };

  const handleEmailPayslip = (payslip) => {
    const employee = payslip.employees;
    if (!employee) return;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const subject = `Payslip for ${monthNames[payslip.month - 1]} ${payslip.year}`;
    const body = `Dear ${employee.full_name},\n\nPlease find attached your payslip for ${monthNames[payslip.month - 1]} ${payslip.year}.\n\nBest regards,\nTech Birds Consulting Team`;
    
    window.open(`mailto:${employee.personal_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };

  const filteredPayslips = payslips.filter(payslip => 
    payslip.employees?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payslip.employees?.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Payslip Management</h1>
              <p className="text-gray-600">Generate and manage employee payslips</p>
            </div>
            <button
              onClick={() => setShowGenerator(true)}
              className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Generate New Payslip</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Payslips</p>
                <p className="text-3xl font-bold text-gray-800">{payslips.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-gray-800">
                  {payslips.filter(p => p.month === new Date().getMonth() + 1 && p.year === new Date().getFullYear()).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Employees</p>
                <p className="text-3xl font-bold text-gray-800">{employees.length}</p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Salary Paid</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{payslips.reduce((sum, p) => sum + (p.net_salary || 0), 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Payslips Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">All Payslips</h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Month/Year</TableHead>
                  <TableHead>Working Days</TableHead>
                  <TableHead>Paid Days</TableHead>
                  <TableHead>Gross Salary</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayslips.map((payslip) => (
                  <TableRow key={payslip.id} className="hover:bg-gray-50">
                    <TableCell>
                      <button
                        onClick={() => handleEmployeeClick(payslip.employees)}
                        className="text-left hover:text-blue-600 transition-colors"
                      >
                        <div className="font-medium text-gray-800">
                          {payslip.employees?.full_name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payslip.employees?.designation || 'N/A'}
                        </div>
                      </button>
                    </TableCell>
                    <TableCell className="font-mono">
                      {payslip.employees?.employee_id || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{monthNames[payslip.month - 1]} {payslip.year}</span>
                      </div>
                    </TableCell>
                    <TableCell>{payslip.working_days}</TableCell>
                    <TableCell>{payslip.paid_days}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{payslip.gross_salary?.toLocaleString() || 'N/A'}
                    </TableCell>
                    <TableCell className="text-red-600">
                      ₹{payslip.total_deductions?.toLocaleString() || 'N/A'}
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      ₹{payslip.net_salary?.toLocaleString() || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDownloadPayslip(payslip)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-all"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEmailPayslip(payslip)}
                          className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-all"
                          title="Email to employee"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredPayslips.length === 0 && (
              <div className="p-8 text-center">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No payslips found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'No payslips match your search.' : 'Start by generating your first payslip.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payslip Generator Modal */}
      {showGenerator && (
        <PayslipGenerator
          onClose={() => setShowGenerator(false)}
          onPayslipGenerated={() => {
            setShowGenerator(false);
            fetchData();
          }}
        />
      )}

      {/* Employee Details Modal */}
      {showEmployeeDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Employee Details</h3>
                <button
                  onClick={() => setShowEmployeeDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FileText className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Personal Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Full Name:</span>
                        <p className="text-gray-800 font-semibold">{selectedEmployee.full_name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Employee ID:</span>
                        <p className="text-gray-800 font-mono">{selectedEmployee.employee_id}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Father's Name:</span>
                        <p className="text-gray-800">{selectedEmployee.father_name || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Designation:</span>
                        <p className="text-gray-800 font-semibold">{selectedEmployee.designation}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Joining Date:</span>
                        <p className="text-gray-800">{new Date(selectedEmployee.joining_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedEmployee.status === 'active' ? 'bg-green-100 text-green-800' :
                          selectedEmployee.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedEmployee.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-green-600" />
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Email:</span>
                        <p className="text-gray-800">{selectedEmployee.personal_email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Mobile:</span>
                        <p className="text-gray-800">{selectedEmployee.mobile}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-amber-600" />
                      Salary Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Monthly Salary:</span>
                        <p className="text-gray-800 font-bold text-2xl text-green-600">
                          ₹{selectedEmployee.monthly_salary?.toLocaleString() || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">PF Number:</span>
                        <p className="text-gray-800 font-mono">{selectedEmployee.pf_no || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">UAN:</span>
                        <p className="text-gray-800 font-mono">{selectedEmployee.uan || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-blue-600" />
                      Banking Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Bank Name:</span>
                        <p className="text-gray-800">{selectedEmployee.bank_name || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Account Number:</span>
                        <p className="text-gray-800 font-mono">{selectedEmployee.account_no || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">IFSC Code:</span>
                        <p className="text-gray-800 font-mono">{selectedEmployee.ifsc || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Identity Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                      Identity Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">PAN Number:</span>
                        <p className="text-gray-800 font-mono">{selectedEmployee.pan_no || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Aadhar Number:</span>
                        <p className="text-gray-800 font-mono">{selectedEmployee.aadhar_no || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowEmployeeDetails(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payslips;