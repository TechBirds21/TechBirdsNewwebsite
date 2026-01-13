import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Check, Send, MessageCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FAQ from '@/components/FAQ';
import SEO from '@/components/SEO';
import AnimatedSection, { GradientText } from '@/components/AnimatedSection';
import { supabase } from '@/integrations/supabase/client';
import { trackFormSubmission } from '@/components/GoogleAnalytics';
import { checkRateLimit, recordSubmission } from '@/components/RateLimiter';
import SimpleCaptcha from '@/components/SimpleCaptcha';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setCaptchaError(null);
    
    try {
      // Check CAPTCHA
      if (!captchaVerified) {
        setCaptchaError('Please complete the security verification');
        setIsSubmitting(false);
        return;
      }

      // Check rate limit
      const rateLimitCheck = checkRateLimit();
      if (!rateLimitCheck.allowed) {
        throw new Error(
          `Too many submissions. Please try again in ${rateLimitCheck.remainingTime} minute(s).`
        );
      }

      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Prepare message with service type if selected
      const fullMessage = formData.serviceType 
        ? `Service Type: ${formData.serviceType}\n\n${formData.message}`
        : formData.message;

      // Insert into Supabase
      const { data, error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          message: fullMessage.trim(),
          type: 'contact'
        })
        .select();

      if (supabaseError) {
        throw new Error(supabaseError.message || 'Failed to submit form. Please try again.');
      }

      // Record submission for rate limiting
      recordSubmission();

      // Success
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: ''
      });
      setCaptchaVerified(false);

      // Track form submission
      trackFormSubmission('contact_form');

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const serviceTypes = [
    'Custom Software Development',
    'E-Commerce Platform',
    'Digital Marketing Services',
    'Mobile App Development',
    'Enterprise System Integration',
    'Cloud-Based Solutions',
    'UI/UX Design & Architecture',
    'IT Consulting & Staffing',
    'Digital Transformation'
  ];

  return (
    <>
      <SEO
        title="Contact Us | Get in Touch for Custom Software Development"
        description="Contact Tech Birds Consulting for custom software development, e-commerce solutions, mobile apps, and enterprise systems. Based in Hyderabad, serving clients globally. Get a free consultation and project quote today."
        keywords="contact tech birds consulting, software development quote, custom software inquiry, e-commerce development contact, get in touch, ERP consultation, CRM development contact"
        canonical="https://techbirdsconsulting.com/contact"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Tech Birds Consulting",
            "description": "Get in touch with Tech Birds Consulting for custom software development, ERP systems, CRM solutions, and enterprise applications.",
            "url": "https://techbirdsconsulting.com/contact"
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://techbirdsconsulting.com",
            "name": "Tech Birds Consulting",
            "image": "https://techbirdsconsulting.com/images/logo.png",
            "description": "Tech Birds Consulting - Custom software development, ERP systems, CRM solutions, e-commerce platforms, and mobile applications.",
            "url": "https://techbirdsconsulting.com",
            "telephone": "+91-7702427569",
            "email": "info@techbirdsconsulting.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hyderabad",
              "addressRegion": "Telangana",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "17.3850",
              "longitude": "78.4867"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Worldwide"
            }
          },
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
                "name": "Contact",
                "item": "https://techbirdsconsulting.com/contact"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What types of digital solutions does Tech Birds Consulting develop?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We develop a wide spectrum of digital solutions including custom web applications for internal business use, scalable e-commerce platforms with custom admin panels, mobile applications for Android and iOS, enterprise systems, API integrations, automation tools, and cloud-based solutions."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide ongoing support and maintenance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We provide comprehensive ongoing support including regular updates, security patches, performance monitoring, feature enhancements, and technical assistance."
                }
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
          <span className="font-semibold">Message sent successfully! We'll get back to you within 24 hours.</span>
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
            <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">Get In Touch</span>
            <h1 className="text-6xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">
              Let's Build <GradientText from="#2563eb" to="#0891b2">Together.</GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium">
              Ready to develop your digital solution? We build all types of software - custom web applications, e-commerce platforms, mobile apps, enterprise systems, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with 3D */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" style={{ perspective: '2500px' }}>
            {/* Contact Form with 3D */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 30, z: -100 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              whileHover={{ y: -10, rotateY: -5, scale: 1.02, transition: { duration: 0.4 } }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-500">
                <h2 className="text-4xl font-black mb-6 text-slate-950 tracking-tight">Start Your Project</h2>
                <p className="text-slate-600 mb-10 text-lg leading-relaxed font-medium">
                  Ready to develop your digital solution? Fill out the form below and we'll respond within 24 hours.
                </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-300 bg-white text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select service type</option>
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Describe your project requirements, business goals, target audience, and any specific features you need..."
                  />
                </div>

                <SimpleCaptcha 
                  onVerify={(isValid) => {
                    setCaptchaVerified(isValid);
                    setCaptchaError(null);
                  }}
                  error={captchaError}
                />

                <button
                  type="submit"
                  disabled={isSubmitting || !captchaVerified}
                  className="w-full bg-gradient-to-r from-blue-600 to-slate-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center group disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
              </div>
            </motion.div>

            {/* Contact Info with 3D */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 60, rotateX: 30, z: -100 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="icon-box w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-lg">Headquarters</h4>
                      <p className="text-gray-600">
                        Hyderabad, India<br />
                        <span className="text-sm">Serving clients globally 🌍</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="icon-box w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-lg">Email</h4>
                      <a href="mailto:info@techbirdsconsulting.com" className="text-blue-600 hover:text-cyan-600 transition-colors font-medium">
                        info@techbirdsconsulting.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="icon-box w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-lg">Phone</h4>
                      <a href="tel:+917702427569" className="text-blue-600 hover:text-cyan-600 transition-colors font-medium" title="Call us on mobile">
                        +91-7702427569
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-cyan-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:border-cyan-300 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Expertise</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Comprehensive digital solutions delivered with expertise across multiple technology stacks and business domains.
                </p>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-2xl">💻</div>
                    <div>
                      <div className="font-bold text-gray-900">Custom Development</div>
                      <div className="text-sm text-gray-600">Web Apps, Mobile Apps, Enterprise Systems</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center text-2xl">🛍️</div>
                    <div>
                      <div className="font-bold text-gray-900">E-Commerce Platforms</div>
                      <div className="text-sm text-gray-600">Custom platforms with admin panels</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-2xl">☁️</div>
                    <div>
                      <div className="font-bold text-gray-900">Cloud Solutions</div>
                      <div className="text-sm text-gray-600">Scalable, secure, and reliable</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center text-2xl">🎨</div>
                    <div>
                      <div className="font-bold text-gray-900">Full-Service</div>
                      <div className="text-sm text-gray-600">Design, Development, Testing, Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Develop Your Digital Solution Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join businesses worldwide who trust Tech Birds Consulting for innovative, reliable, and scalable digital products that drive growth and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 inline-flex items-center justify-center group relative overflow-hidden">
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
            <a href="mailto:info@techbirdsconsulting.com" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-500 hover:scale-105 hover:-translate-y-1 inline-flex items-center justify-center group">
              <span>Email Us Directly</span>
              <Mail className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;
