import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Zap, Globe, Award, Rocket, Shield, TrendingUp, Code, Database, Cloud, Cpu, Layers, Binary, Box, Star } from 'lucide-react';
import SEO from '../components/SEO';
import AnimatedSection, { GradientText } from '../components/AnimatedSection';

const About = () => {
  const milestones = [
    {
      year: '2021',
      title: 'Foundation',
      description: 'Started with a vision to bridge innovative technology and business growth.',
      icon: <Rocket className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded to serve clients across USA, UK, UAE, and Germany.',
      icon: <Globe className="w-5 h-5" />,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Pioneered AI-integrated development and cloud solutions.',
      icon: <Cpu className="w-5 h-5" />,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      year: '2024',
      title: 'Enterprise Scale',
      description: 'Delivered 200+ projects across 12+ industries globally.',
      icon: <Database className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      year: '2025',
      title: 'Innovation Leaders',
      description: 'Recognized for excellence with 99% client satisfaction.',
      icon: <Award className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-500'
    },
    {
      year: 'Today',
      title: 'Global Excellence',
      description: 'Serving 300+ clients with cutting-edge solutions worldwide.',
      icon: <Star className="w-5 h-5" />,
      color: 'from-blue-600 to-cyan-500'
    }
  ];

  const values = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Rapid Delivery',
      description: 'Fast execution through agile methodologies with continuous iterations.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: 'Precision',
      description: 'Attention to detail with transparent communication and honest timelines.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      title: 'Innovation',
      description: 'Staying ahead with AI and cutting-edge solutions for the future.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: 'Global',
      description: 'Operating across 15+ countries delivering world-class solutions.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const expertise = [
    { icon: <Code />, title: 'Full-Stack', desc: 'React, Node.js, Python, TypeScript' },
    { icon: <Database />, title: 'Data', desc: 'PostgreSQL, MongoDB, Redis' },
    { icon: <Cloud />, title: 'Cloud', desc: 'AWS, Azure, GCP' },
    { icon: <Shield />, title: 'Security', desc: 'SSL, OAuth, Encryption' }
  ];

  return (
    <>
      <SEO
        title="About Us | Elite Software Engineering Studio"
        description="Learn about Tech Birds Consulting - a leading software development company founded in 2021, serving 300+ clients globally with custom ERP systems, CRM solutions, e-commerce platforms, and enterprise applications."
        keywords="about tech birds, software development company, custom software development, enterprise solutions, ERP systems, CRM development, web development company"
        canonical="https://techbirdsconsulting.com/about"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Tech Birds Consulting",
            "description": "Learn about Tech Birds Consulting - a leading software development company specializing in custom solutions, ERP systems, CRM platforms, and enterprise applications.",
            "url": "https://techbirdsconsulting.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "Tech Birds Consulting",
              "foundingDate": "2021",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "50-100"
              },
              "description": "Tech Birds Consulting is a premier software engineering studio delivering custom solutions globally. We serve clients across USA, UK, UAE, Germany, and 15+ countries worldwide."
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
                "name": "About",
                "item": "https://techbirdsconsulting.com/about"
              }
            ]
          }
        ]}
      />
      
      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* HERO */}
        <section className="pt-32 pb-16 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-black tracking-[0.25em] text-blue-600">EST. 2021</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 mb-6 tracking-tight leading-tight">
                Engineering the <br />
                <GradientText from="#2563eb" to="#0891b2">Digital Future.</GradientText>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium mb-6 px-4">
                Since 2021, Tech Birds has been engineering world-class software solutions across <span className="text-slate-900 font-bold">12+ industries globally</span>.
              </p>

              {/* Quick Stats - Mobile Optimized */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                {[
                  { value: '300+', label: 'Projects', icon: <Box /> },
                  { value: '15+', label: 'Countries', icon: <Globe /> },
                  { value: '99%', label: 'Happy', icon: <Star /> },
                  { value: '24/7', label: 'Support', icon: <Shield /> }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className="text-blue-600 mb-2 flex justify-center">
                      {React.cloneElement(stat.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-950">{stat.value}</div>
                    <div className="text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Link 
                  to="/contact" 
                  className="inline-flex items-center bg-slate-900 text-white px-10 py-4 sm:px-12 sm:py-5 rounded-2xl sm:rounded-3xl font-bold sm:font-black text-base sm:text-lg hover:bg-blue-600 transition-all duration-500 shadow-2xl"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
              </div>
        </section>

        {/* EXPERTISE */}
        <section className="py-16 bg-white border-y border-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-4">
                Our <GradientText>Expertise.</GradientText>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {expertise.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:bg-white hover:shadow-lg transition-all text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

        {/* JOURNEY TIMELINE - Mobile Optimized */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-3 block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-4 tracking-tight">
                Our <GradientText>Journey.</GradientText>
            </h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium px-4">
                From startup vision to global engineering excellence
            </p>
          </div>

          <div className="relative">
              {/* Centered Line - Hidden on Mobile */}
              <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent -translate-x-1/2" />
              
              {/* Timeline Items - Proper Mobile Spacing */}
              <div className="space-y-12 sm:space-y-24">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    className="relative w-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.05, duration: 0.7 }}
                  >
                    {/* Center Icon */}
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border-2 border-white relative overflow-hidden group z-10"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color}`} />
                        <div className="relative z-10 text-white">
                          {milestone.icon}
                        </div>
                      </motion.div>
                  </div>
                  
                    {/* Content Card - Full Width on Mobile */}
                    <motion.div
                      className="w-full"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-lg hover:shadow-2xl hover:border-blue-100 transition-all duration-500 text-center mx-auto max-w-lg">
                        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 tracking-wide shadow-md">
                          {milestone.year}
                    </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 text-slate-900 tracking-tight">{milestone.title}</h3>
                        <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">{milestone.description}</p>
                  </div>
                    </motion.div>
                  </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* VALUES - Mobile Optimized */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-3 block">Core Principles</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-4 tracking-tight">
                Our <GradientText>Values.</GradientText>
            </h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium px-4">
                The principles that guide every project
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group"
                >
                  <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-500 h-full">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {value.icon}
                </div>
                    <h3 className="text-2xl sm:text-3xl font-black mb-4 text-slate-900 tracking-tight">{value.title}</h3>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">{value.description}</p>
              </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* MISSION & VISION */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-blue-100 shadow-xl h-full">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg">
                    <Target className="w-7 h-7" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-4 tracking-tight">Our Mission</h2>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-6">
                    To democratize access to cutting-edge technology by delivering fast, scalable solutions that empower businesses globally.
                  </p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    We transform complex business requirements into elegant, high-performance digital ecosystems.
                  </p>
                </div>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-cyan-100 shadow-xl h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white flex items-center justify-center mb-6 shadow-lg">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-4 tracking-tight">Our Vision</h2>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-6">
                    To be the world's most trusted software engineering studio, known for exceptional quality and innovation.
                  </p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    We envision a future where every business has access to enterprise-grade software that scales seamlessly.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight px-4">
                Ready to Join Our <br />
                <span className="text-blue-500 font-serif italic font-light">Success Story?</span>
          </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Let's create the next chapter together with innovative solutions.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-slate-950 px-10 py-5 sm:px-14 sm:py-6 rounded-2xl sm:rounded-3xl font-black text-lg sm:text-xl hover:bg-blue-50 transition-all duration-500 shadow-2xl"
              >
                Start Your Journey
                <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
