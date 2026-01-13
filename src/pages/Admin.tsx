
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Users, Briefcase, MessageSquare, FileText, Plus, LogOut, CreditCard as Edit, Trash2, Eye, Download, Mail, ChartBar as BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PayslipGenerator from '@/components/PayslipGenerator';
import JobForm from '@/components/JobForm';
import EmployeeForm from '@/components/EmployeeForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Admin = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [payslips, setPayslips] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showPayslipGenerator, setShowPayslipGenerator] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [jobsRes, appsRes, contactsRes, employeesRes, payslipsRes] = await Promise.all([
        supabase.from('jobs').select('*').order('created_at', { ascending: false }),
        supabase.from('job_applications').select('*, jobs(title)').order('created_at', { ascending: false }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('employees').select('*').order('created_at', { ascending: false }),
        supabase.from('payslips').select('*, employees(full_name, employee_id)').order('created_at', { ascending: false })
      ]);

      if (jobsRes.error) throw new Error(`Jobs: ${jobsRes.error.message}`);
      if (appsRes.error) throw new Error(`Applications: ${appsRes.error.message}`);
      if (contactsRes.error) throw new Error(`Contacts: ${contactsRes.error.message}`);
      if (employeesRes.error) throw new Error(`Employees: ${employeesRes.error.message}`);
      if (payslipsRes.error) throw new Error(`Payslips: ${payslipsRes.error.message}`);

      setJobs(jobsRes.data || []);
      setApplications(appsRes.data || []);
      setContacts(contactsRes.data || []);
      setEmployees(employeesRes.data || []);
      setPayslips(payslipsRes.data || []);
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      const { error } = await supabase.from('jobs').delete().eq('id', jobId);
      if (error) throw error;
      
      setJobs(jobs.filter(job => job.id !== jobId));
      toast({
        title: "Success",
        description: "Job deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete job: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      const { error } = await supabase.from('employees').delete().eq('id', employeeId);
      if (error) throw error;
      
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      toast({
        title: "Success",
        description: "Employee deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete employee: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleUpdateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', applicationId);
      
      if (error) throw error;
      
      setApplications(applications.map((app: any) => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
      
      toast({
        title: "Success",
        description: "Application status updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update status: ${error.message}`,
        variant: "destructive"
      });
    }
  };
  const handleJobSaved = () => {
    setShowJobForm(false);
    setEditingJob(null);
    fetchData();
  };

  const handleEmployeeSaved = () => {
    setShowEmployeeForm(false);
    setEditingEmployee(null);
    fetchData();
  };

  const handlePayslipGenerated = () => {
    setShowPayslipGenerator(false);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full">
          <Alert className="mb-4">
            <AlertDescription>
              Database connection error: {error}
            </AlertDescription>
          </Alert>
          <button
            onClick={fetchData}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8">
          <div className="flex items-center space-x-4">
            <img 
              src="/images/logo.png" 
              alt="Tech Birds Consulting" 
              loading="eager"
              decoding="async"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.full_name || user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-0 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-800">{jobs.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-800" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-3xl font-bold text-gray-800">{applications.length}</p>
              </div>
              <FileText className="w-8 h-8 text-green-700" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contact Messages</p>
                <p className="text-3xl font-bold text-gray-800">{contacts.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Employees</p>
                <p className="text-3xl font-bold text-gray-800">{employees.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-700" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm border-t border-b border-gray-200 mb-0 w-full">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 px-4 sm:px-6 lg:px-8 overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'jobs', label: 'Job Listings', icon: Briefcase },
                { id: 'applications', label: 'Applications', icon: FileText },
                { id: 'contacts', label: 'Contact Messages', icon: MessageSquare },
                { id: 'employees', label: 'Employees', icon: Users },
                { id: 'payslips', label: 'Payslips', icon: Download }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-800 text-blue-800'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Active Jobs</p>
                        <p className="text-2xl font-bold text-blue-800">{jobs.filter(job => job.is_active).length}</p>
                      </div>
                      <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">New Applications</p>
                        <p className="text-2xl font-bold text-green-800">
                          {applications.filter(app => app.status === 'pending').length}
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-orange-600 font-medium">Active Employees</p>
                        <p className="text-2xl font-bold text-orange-800">
                          {employees.filter(emp => emp.status === 'active').length}
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">This Month's Payslips</p>
                        <p className="text-2xl font-bold text-slate-800">
                          {payslips.filter(p => p.month === new Date().getMonth() + 1 && p.year === new Date().getFullYear()).length}
                        </p>
                      </div>
                      <Download className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Applications</h3>
                    <div className="space-y-3">
                      {applications.slice(0, 5).map((app: any) => (
                        <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">{app.full_name}</p>
                            <p className="text-sm text-gray-600">{app.jobs?.title || 'Position'}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Contact Messages</h3>
                    <div className="space-y-3">
                      {contacts.slice(0, 5).map((contact: any) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Job Listings Tab */}
            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Job Listings</h2>
                  <button 
                    onClick={() => setShowJobForm(true)}
                    className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Job</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs.map((job: any) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.department}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.type}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              job.is_active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {job.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  setEditingJob(job);
                                  setShowJobForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Applications</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Job</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app: any) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.full_name}</TableCell>
                          <TableCell>{app.email}</TableCell>
                          <TableCell>{app.jobs?.title || 'N/A'}</TableCell>
                          <TableCell>{app.experience || 'N/A'}</TableCell>
                          <TableCell>
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateApplicationStatus(app.id, e.target.value)}
                              className={`px-2 py-1 rounded-full text-xs font-medium border-none outline-none ${
                                app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </TableCell>
                          <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => window.open(`mailto:${app.email}?subject=Regarding your application for ${app.jobs?.title || 'Position'}`)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Contact applicant"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {app.resume_url && (
                                <button 
                                  onClick={() => window.open(app.resume_url, '_blank')}
                                  className="text-green-600 hover:text-green-800"
                                  title="Download resume"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Contact Messages Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Messages</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Company/Budget</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact: any) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone || 'N/A'}</TableCell>
                          <TableCell>{contact.company || 'N/A'}</TableCell>
                          <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => {
                                alert(`Message from ${contact.name}:\n\n${contact.message}`);
                              }}
                              className="text-blue-600 hover:text-blue-800 mr-2"
                              title="View message"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your inquiry`)}
                              className="text-green-600 hover:text-green-800"
                              title="Reply to contact"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Employees Tab */}
            {activeTab === 'employees' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
                  <button 
                    onClick={() => setShowEmployeeForm(true)}
                    className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Employee</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Monthly Salary</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joining Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((emp: any) => (
                        <TableRow key={emp.id}>
                          <TableCell className="font-medium">{emp.employee_id}</TableCell>
                          <TableCell>{emp.full_name}</TableCell>
                          <TableCell>{emp.personal_email}</TableCell>
                          <TableCell>{emp.designation}</TableCell>
                          <TableCell>{emp.monthly_salary ? `₹${emp.monthly_salary.toLocaleString()}` : 'N/A'}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              emp.status === 'active' ? 'bg-green-100 text-green-800' :
                              emp.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {emp.status}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(emp.joining_date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  setEditingEmployee(emp);
                                  setShowEmployeeForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteEmployee(emp.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Payslips Tab */}
            {activeTab === 'payslips' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payslips</h2>
                  <button
                    onClick={() => setShowPayslipGenerator(true)}
                    className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Generate Payslip</span>
                  </button>
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
                        <TableHead>Email Sent</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payslips.map((payslip: any) => (
                        <TableRow key={payslip.id}>
                          <TableCell className="font-medium">{payslip.employees?.full_name}</TableCell>
                          <TableCell>{payslip.employees?.employee_id}</TableCell>
                          <TableCell>{payslip.month}/{payslip.year}</TableCell>
                          <TableCell>{payslip.working_days}</TableCell>
                          <TableCell>{payslip.paid_days}</TableCell>
                          <TableCell className="font-semibold">₹{payslip.gross_salary?.toLocaleString() || 'N/A'}</TableCell>
                          <TableCell className="text-red-600">₹{payslip.total_deductions?.toLocaleString() || 'N/A'}</TableCell>
                          <TableCell className="font-bold text-green-600">₹{payslip.net_salary?.toLocaleString() || 'N/A'}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              payslip.email_sent 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {payslip.email_sent ? 'Sent' : 'Not Sent'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  // Generate and download PDF for this payslip
                                  const employee = employees.find(emp => emp.id === payslip.employee_id);
                                  if (employee) {
                                    const { generatePayslipPDF } = require('@/utils/pdfGenerator');
                                    const doc = generatePayslipPDF(employee, payslip);
                                    doc.save(`${employee.full_name}_${payslip.month}_${payslip.year}_payslip.pdf`);
                                    toast({
                                      title: "Success",
                                      description: "Payslip downloaded successfully"
                                    });
                                  }
                                }}
                                className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-all"
                                title="Download PDF"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  const employee = employees.find(emp => emp.id === payslip.employee_id);
                                  if (employee) {
                                    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                                       'July', 'August', 'September', 'October', 'November', 'December'];
                                    const subject = `Payslip for ${monthNames[payslip.month - 1]} ${payslip.year}`;
                                    const body = `Dear ${employee.full_name},\n\nPlease find attached your payslip for ${monthNames[payslip.month - 1]} ${payslip.year}.\n\nBest regards,\nTech Birds Consulting Team`;
                                    window.open(`mailto:${employee.personal_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                                  }
                                }}
                                className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-all"
                                title="Email payslip"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPayslipGenerator && (
        <PayslipGenerator
          onClose={() => setShowPayslipGenerator(false)}
          onPayslipGenerated={handlePayslipGenerated}
        />
      )}

      {showJobForm && (
        <JobForm
          job={editingJob}
          onClose={() => {
            setShowJobForm(false);
            setEditingJob(null);
          }}
          onSaved={handleJobSaved}
        />
      )}

      {showEmployeeForm && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={() => {
            setShowEmployeeForm(false);
            setEditingEmployee(null);
          }}
          onSaved={handleEmployeeSaved}
        />
      )}
    </div>
  );
};

export default Admin;
