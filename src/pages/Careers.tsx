import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Building, DollarSign, Users, Send, Check, X, Briefcase, Code, TrendingUp, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import AnimatedSection, { GradientText } from '@/components/AnimatedSection';
import { supabase } from '@/integrations/supabase/client';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string | null;
  salary: string | null;
  description: string;
  requirements: string[];
  responsibilities: string[] | null;
  nice_to_have: string[] | null;
  is_active: boolean;
}

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentLocation: '',
    expectedSalary: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load job listings. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique departments from jobs
  const departments = ['All', ...Array.from(new Set(jobs.map(job => job.department)))];

  const filteredPositions = selectedDepartment === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDepartment);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: selectedJob.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || '',
          experience: formData.experience || null,
          current_location: formData.currentLocation || null,
          expected_salary: formData.expectedSalary || null,
          cover_letter: formData.message
        });

      if (error) throw error;

      setShowSuccess(true);
      setShowApplicationForm(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        currentLocation: '',
        expectedSalary: '',
        message: ''
      });
      setSelectedJob(null);

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon."
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Careers | Join Tech Birds Consulting Team"
        description="Explore career opportunities at Tech Birds Consulting. Join our team of talented developers, designers, and engineers building innovative software solutions. Grow your career with us."
        keywords="software developer jobs, tech careers, remote developer jobs, UI UX designer jobs, digital marketing careers, ERP developer jobs, CRM developer jobs, web developer jobs, mobile developer jobs"
        canonical="https://techbirdsconsulting.com/careers"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://techbirdsconsulting.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Careers",
                "item": "https://techbirdsconsulting.com/careers"
              }
            ]
          }
        ]}
      />
      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center animate-fade-in">
            <Check className="w-5 h-5 mr-2" />
            <span className="font-semibold">Application submitted successfully!</span>
          </div>
        )}

        {/* Hero Section with 3D */}
        <section className="pt-32 pb-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
          
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1 }}
              style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            >
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">Careers</span>
              <h1 className="text-6xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">
                Join Our <GradientText from="#2563eb" to="#0891b2">Team.</GradientText>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
                Build innovative software solutions with a talented team. We're always looking for passionate developers, designers, and digital marketers.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: <Briefcase />, text: `${jobs.length}+ Open Positions` },
                  { icon: <Users />, text: 'Remote & Hybrid' },
                  { icon: <TrendingUp />, text: 'Growth Opportunities' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full border border-slate-200 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.3 } }}
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
                      {item.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedDepartment === dept
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs Listing */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : filteredPositions.length === 0 ? (
              <div className="text-center py-20">
                <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Open Positions</h3>
                <p className="text-gray-600">Check back later for new opportunities!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPositions.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="w-4 h-4" />
                          {job.department}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      {job.experience && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {job.experience}
                        </div>
                      )}
                      {job.salary && (
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {job.salary}
                        </div>
                      )}
                    </div>

                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 6).map((requirement, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                            >
                              {requirement}
                            </span>
                          ))}
                          {job.requirements.length > 6 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                              +{job.requirements.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleApply(job)}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Apply Now
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Application Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Apply for {selectedJob?.title}</h2>
                <button
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSelectedJob(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="5+ years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Location
                  </label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Salary (Optional)
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="₹10-15 LPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter / Why are you interested in this position? *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your experience and why you'd be a great fit..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  {!isSubmitting && <Send className="ml-2 w-5 h-5" />}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Careers;
