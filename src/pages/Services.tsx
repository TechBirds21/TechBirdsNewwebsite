import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, ShoppingCart, Smartphone, Database, Cloud, ArrowRight, Check, Users } from 'lucide-react';
import SEO from '../components/SEO';
import AnimatedSection, { GradientText } from '../components/AnimatedSection';

const Services = () => {
  const services = [
    { 
      icon: Database, 
      title: 'ERP Systems', 
      desc: 'Complete Enterprise Resource Planning solutions for inventory, accounting, and operations management.',
      features: ['Financial Management', 'Inventory Control', 'HR & Payroll', 'Supply Chain Management'],
      gradient: 'from-blue-600 to-blue-800'
    },
    { 
      icon: Users, 
      title: 'CRM Solutions', 
      desc: 'Custom Customer Relationship Management systems to manage leads, sales pipelines, and customer service.',
      features: ['Lead Tracking', 'Sales Pipeline', 'Customer Portal', 'Service Automation'],
      gradient: 'from-teal-500 to-cyan-700'
    },
    { 
      icon: ShoppingCart, 
      title: 'E-Commerce Platforms', 
      desc: 'Full-featured online stores with custom admin panels, payment gateways, and inventory systems.',
      features: ['Custom Admin Panel', 'Payment Integration', 'Order Management', 'Multi-vendor Support'],
      gradient: 'from-indigo-600 to-blue-700'
    },
    { 
      icon: Code, 
      title: 'Custom Business Applications', 
      desc: 'Tailor-made software built to solve your specific business challenges and operational needs.',
      features: ['Process Automation', 'Custom Features', 'System Integration', 'Reporting Tools'],
      gradient: 'from-purple-600 to-indigo-700'
    },
    { 
      icon: Smartphone, 
      title: 'Mobile Applications', 
      desc: 'Native and cross-platform mobile apps for iOS and Android with excellent user experiences.',
      features: ['iOS & Android Apps', 'Offline Functionality', 'Push Notifications', 'Native Performance'],
      gradient: 'from-emerald-600 to-teal-700'
    },
    { 
      icon: Cloud, 
      title: 'Cloud & DevOps', 
      desc: 'Scalable cloud infrastructure with automated deployment, monitoring, and enterprise-grade security.',
      features: ['Cloud Migration', 'AWS/Azure Setup', 'CI/CD Pipelines', 'System Monitoring'],
      gradient: 'from-cyan-600 to-blue-600'
    }
  ];

  return (
    <>
      <SEO
        title="Software Development Services | Custom ERP, CRM & Mobile Apps"
        description="Comprehensive software development services including custom ERP systems, CRM solutions, e-commerce platforms, mobile applications, and cloud solutions. Expert development team for enterprise solutions."
        keywords="software development services, ERP systems, CRM solutions, mobile apps, custom software, e-commerce development, web development, cloud solutions, enterprise software, application development"
        canonical="https://techbirdsconsulting.com/services"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Software Development Services",
            "provider": {
              "@type": "Organization",
              "name": "Tech Birds Consulting",
              "url": "https://techbirdsconsulting.com"
            },
            "areaServed": { "@type": "Country", "name": "Worldwide" },
            "description": "Custom software development services including ERP systems, CRM solutions, e-commerce platforms, mobile applications, and enterprise solutions.",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Software Development Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "ERP Systems Development",
                    "description": "Complete Enterprise Resource Planning solutions for inventory, accounting, and operations management."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "CRM Solutions",
                    "description": "Custom Customer Relationship Management systems to manage leads, sales pipelines, and customer service."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-Commerce Platforms",
                    "description": "Full-featured online stores with custom admin panels, payment gateways, and inventory systems."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile Applications",
                    "description": "Native and cross-platform mobile apps for iOS and Android with excellent user experiences."
                  }
                }
              ]
            }
          }
        ]}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section with 3D */}
        <section className="pt-32 pb-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
          
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1 }}
              style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            >
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-6 block">Our Expertise</span>
              <h1 className="text-6xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">
                Premium <GradientText from="#2563eb" to="#0891b2">Software</GradientText> Services.
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
                We design and build high-end digital products that solve complex business problems through superior engineering.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid with 3D */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style={{ perspective: '3000px' }}>
              {services.map((service, index) => (
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
                    scale: 1.05,
                    transition: { duration: 0.4 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group"
                >
                  <div className="relative bg-slate-50 rounded-[3rem] p-10 border border-slate-100 hover:bg-white hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] hover:border-blue-100 transition-all duration-500 h-full">
                    <motion.div 
                      className={`mb-8 inline-flex items-center justify-center w-18 h-18 rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-xl`}
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon size={36} />
                    </motion.div>
                    
                    <h3 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">{service.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium mb-6">{service.desc}</p>

                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm font-bold text-slate-700">
                          <Check className="w-4 h-4 text-blue-600 mr-3" strokeWidth={3} />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
              transition={{ duration: 1 }}
              style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
                Ready to <span className="text-blue-400">Scale?</span>
              </h2>
              <p className="text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how our custom software solutions can transform your business operations.
              </p>
              <motion.div whileHover={{ rotateX: -10, scale: 1.05 }} style={{ transformStyle: 'preserve-3d' }}>
                <Link
                  to="/contact"
                  className="inline-block bg-white text-slate-900 px-14 py-6 rounded-3xl font-black text-xl hover:bg-blue-50 transition-all duration-500 shadow-2xl"
                >
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

export default Services;
