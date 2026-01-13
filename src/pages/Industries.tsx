import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Stethoscope, ShoppingCart, Building2, Truck, GraduationCap, Factory, DollarSign, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AnimatedSection, { GradientText } from '../components/AnimatedSection';

const Industries = () => {
  const industries = [
    {
      name: 'Healthcare & Medical',
      icon: <Stethoscope className="w-10 h-10" />,
      gradient: 'from-emerald-500 to-teal-600',
      description: 'Comprehensive healthcare solutions including EMR systems, patient portals, and telemedicine platforms.',
      services: ['Electronic Medical Records', 'Patient Management', 'Telemedicine', 'Hospital Management', 'Medical Billing']
    },
    {
      name: 'E-Commerce & Retail',
      icon: <ShoppingCart className="w-10 h-10" />,
      gradient: 'from-blue-600 to-indigo-700',
      description: 'Full-featured e-commerce platforms with custom admin dashboards and inventory management.',
      services: ['E-Commerce Platforms', 'Multi-Vendor Marketplaces', 'Inventory Management', 'Payment Integration', 'Admin Dashboards']
    },
    {
      name: 'Real Estate & PropTech',
      icon: <Building2 className="w-10 h-10" />,
      gradient: 'from-orange-500 to-red-600',
      description: 'Real estate platforms with property listings, booking systems, CRM, and property management tools.',
      services: ['Property Listings', 'Booking Systems', 'Real Estate CRM', 'Property Management', 'Tenant Portals']
    },
    {
      name: 'Logistics & Supply Chain',
      icon: <Truck className="w-10 h-10" />,
      gradient: 'from-amber-500 to-orange-600',
      description: 'Logistics management systems with fleet tracking, route optimization, and warehouse management.',
      services: ['Fleet Management', 'Route Optimization', 'Warehouse Management', 'Real-Time Tracking', 'Delivery Management']
    },
    {
      name: 'Education & E-Learning',
      icon: <GraduationCap className="w-10 h-10" />,
      gradient: 'from-purple-600 to-pink-600',
      description: 'Learning management systems, online course platforms, and educational tools.',
      services: ['Learning Management Systems', 'Online Course Platforms', 'Student Management', 'Assessment Tools', 'Certification']
    },
    {
      name: 'Manufacturing',
      icon: <Factory className="w-10 h-10" />,
      gradient: 'from-slate-600 to-gray-700',
      description: 'Manufacturing ERP systems, production planning, and quality control.',
      services: ['Manufacturing ERP', 'Production Planning', 'Quality Control', 'Inventory Management', 'Supply Chain']
    },
    {
      name: 'Finance & FinTech',
      icon: <DollarSign className="w-10 h-10" />,
      gradient: 'from-green-600 to-emerald-600',
      description: 'Financial software, payment systems, and accounting platforms.',
      services: ['Accounting Software', 'Payment Processing', 'Financial Analytics', 'Billing Systems', 'Tax Management']
    },
    {
      name: 'Custom Software',
      icon: <Code className="w-10 h-10" />,
      gradient: 'from-cyan-600 to-blue-600',
      description: 'Tailored software solutions for any industry with specific business requirements.',
      services: ['Custom Web Apps', 'Mobile Development', 'API Development', 'System Integration', 'Cloud Solutions']
    }
  ];

  return (
    <>
      <SEO
        title="Industries We Serve | Tech Birds Consulting"
        description="Custom software solutions for Healthcare, E-Commerce, Real Estate, Logistics, Education, Manufacturing, Finance, and more. Industry-specific ERP, CRM, and enterprise applications."
        keywords="healthcare software, e-commerce platform, real estate software, custom software, logistics software, education software, manufacturing software, finance software, industry solutions"
        canonical="https://techbirdsconsulting.com/industries"
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
                "name": "Industries",
                "item": "https://techbirdsconsulting.com/industries"
              }
            ]
          }
        ]}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero with 3D */}
        <section className="pt-32 pb-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
          
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1 }}
              style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            >
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">Industries</span>
              <h1 className="text-6xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">
                Industries <GradientText from="#2563eb" to="#0891b2">We Serve.</GradientText>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
                Delivering specialized software solutions across multiple industries with deep domain expertise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Industries Grid with 3D */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style={{ perspective: '3000px' }}>
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, rotateX: 45, z: -150 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.9 }}
                  whileHover={{ 
                    y: -25, 
                    rotateX: -15,
                    rotateY: index % 2 === 0 ? 10 : -10,
                    z: 80,
                    scale: 1.05,
                    transition: { duration: 0.4 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group"
                >
                  <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 hover:bg-white hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] hover:border-blue-100 transition-all duration-500 h-full">
                    <motion.div
                      className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${industry.gradient} text-white mb-8 shadow-xl`}
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    >
                      {industry.icon}
                    </motion.div>

                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{industry.name}</h3>
                    <p className="text-slate-500 mb-6 leading-relaxed font-medium">{industry.description}</p>

                    <div className="space-y-2">
                      {industry.services.map((service, idx) => (
                        <div key={idx} className="flex items-center text-sm text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" strokeWidth={3} />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA with 3D */}
        <section className="py-28 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
                Let's Build Something Great
              </h2>
              <p className="text-2xl text-slate-400 mb-12">
                Tell us about your industry and we'll create a custom solution for your needs.
              </p>
              <motion.div whileHover={{ rotateX: -10, scale: 1.05 }} style={{ transformStyle: 'preserve-3d' }}>
                <Link to="/contact" className="inline-block bg-white text-slate-900 px-14 py-6 rounded-3xl font-black text-xl hover:bg-blue-50 shadow-2xl">
                  Start Your Project
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Industries;
