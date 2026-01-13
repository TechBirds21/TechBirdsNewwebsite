import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Stethoscope, Globe, ShoppingCart, FileText, Database, Users } from 'lucide-react';
import SEO from '../components/SEO';
import AnimatedSection, { GradientText } from '../components/AnimatedSection';

const Projects = () => {
  const projects = [
    {
      title: 'Hospverse - Healthcare Management',
      category: 'Healthcare',
      description: 'Comprehensive hospital management platform with patient tracking, EMR, appointment scheduling, and pharmacy management.',
      icon: <Stethoscope className="w-12 h-12" />,
      gradient: 'from-emerald-500 to-teal-600',
      features: ['Patient Management', 'Electronic Health Records', 'Appointment Scheduling', 'Pharmacy Integration', 'Multi-Location Support'],
      status: 'Active'
    },
    {
      title: 'Common Delivery Platform',
      category: 'Logistics',
      description: 'Universal logistics platform for delivery management with real-time tracking and route optimization.',
      icon: <Globe className="w-12 h-12" />,
      gradient: 'from-blue-600 to-cyan-500',
      features: ['Real-Time Tracking', 'Route Optimization', 'Multi-Vendor Management', 'Automated Dispatch', 'Analytics Dashboard'],
      status: 'Active'
    },
    {
      title: 'E-Commerce Solutions',
      category: 'E-Commerce',
      description: 'Custom e-commerce platforms with powerful admin dashboards and inventory management.',
      icon: <ShoppingCart className="w-12 h-12" />,
      gradient: 'from-blue-600 to-indigo-700',
      features: ['Custom Admin Dashboard', 'Inventory Management', 'Payment Integration', 'Order Management', 'Customer Analytics'],
      status: 'Delivered'
    },
    {
      title: 'EDCPro - Clinical Data Capture',
      category: 'Clinical Research',
      description: 'Advanced clinical trial management system with dynamic CRF builder and data validation.',
      icon: <FileText className="w-12 h-12" />,
      gradient: 'from-violet-600 to-purple-600',
      features: ['Dynamic CRF Builder', 'Subject Management', 'Data Lock & Audit', 'Electronic Signatures', 'CDISC Exports'],
      status: 'Active'
    },
    {
      title: 'Custom ERP Systems',
      category: 'Enterprise',
      description: 'Tailored ERP solutions for inventory, accounting, HR, and supply chain optimization.',
      icon: <Database className="w-12 h-12" />,
      gradient: 'from-slate-600 to-gray-700',
      features: ['Financial Management', 'Inventory Control', 'HR & Payroll', 'Supply Chain', 'Reporting Tools'],
      status: 'Ongoing'
    },
    {
      title: 'Custom CRM Solutions',
      category: 'CRM',
      description: 'Customer relationship management systems with lead tracking and sales pipeline automation.',
      icon: <Users className="w-12 h-12" />,
      gradient: 'from-orange-500 to-red-600',
      features: ['Lead Management', 'Sales Pipeline', 'Customer Portal', 'Service Tickets', 'Analytics & Reports'],
      status: 'Ongoing'
    }
  ];

  return (
    <>
      <SEO
        title="Projects & Portfolio | Tech Birds Consulting"
        description="Explore our software development projects and portfolio including healthcare systems, e-commerce platforms, delivery solutions, and enterprise applications. See our successful client implementations."
        keywords="software projects, portfolio, healthcare software, e-commerce platform, ERP projects, CRM projects, mobile app portfolio, custom software examples"
        canonical="https://techbirdsconsulting.com/projects"
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
                "name": "Projects",
                "item": "https://techbirdsconsulting.com/projects"
              }
            ]
          }
        ]}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
          
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1 }}
              style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            >
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">Our Work</span>
              <h1 className="text-6xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">
                Projects & <GradientText from="#2563eb" to="#0891b2">Portfolio.</GradientText>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
                Delivering custom software solutions from healthcare systems to e-commerce platforms.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid with 3D */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10" style={{ perspective: '3000px' }}>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, rotateX: 45, z: -150 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.9 }}
                  whileHover={{ 
                    y: -25, 
                    rotateX: -15,
                    rotateY: index % 2 === 0 ? 10 : -10,
                    z: 80,
                    scale: 1.03,
                    transition: { duration: 0.4 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group"
                >
                  <div className="relative bg-slate-50 rounded-[3rem] p-10 border border-slate-100 hover:bg-white hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] hover:border-blue-100 transition-all duration-500">
                    <div className="absolute top-8 right-8">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black ${
                        project.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        project.status === 'Delivered' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <motion.div
                      className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${project.gradient} text-white mb-8 shadow-xl`}
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    >
                      {project.icon}
                    </motion.div>

                    <div className="text-sm text-slate-500 font-bold mb-2">{project.category}</div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{project.title}</h3>
                    <p className="text-slate-500 mb-6 leading-relaxed font-medium">{project.description}</p>

                    <div className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-emerald-500 mr-2" strokeWidth={3} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
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
                Ready to Start Your Project?
              </h2>
              <p className="text-2xl text-slate-400 mb-12">
                Let's discuss how we can build a custom solution for your business needs.
              </p>
              <motion.div whileHover={{ rotateX: -10, scale: 1.05 }} style={{ transformStyle: 'preserve-3d' }}>
                <Link to="/contact" className="inline-block bg-white text-slate-900 px-14 py-6 rounded-3xl font-black text-xl hover:bg-blue-50 shadow-2xl">
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
