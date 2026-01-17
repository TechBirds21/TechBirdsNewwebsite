import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence, useMotionTemplate, useVelocity, useAnimationFrame } from 'framer-motion';
import { ArrowRight, Code, Rocket, Users, Star, Clock, Shield, Database, Globe, Zap, ShoppingCart, Smartphone, Cloud, ArrowUpRight, Cpu, Activity, Server, Layout, Boxes, Binary, Workflow, TrendingUp, CheckCircle2, Sparkles, Target, CircleDot, Hexagon, Layers } from 'lucide-react';
import FAQ from '../components/FAQ';
import TechStackBadges from '../components/TechStackBadges';
import SEO from '../components/SEO';
import AnimatedSection, { StaggerContainer, StaggerItem, GradientText } from '../components/AnimatedSection';
import { Link } from 'react-router-dom';
import Advanced3DHero from '../components/Advanced3DHero';
import { useService } from '../contexts/ServiceContext';

// Animated Counter
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = Math.floor(latest) + suffix;
    });
  }, [springValue, suffix]);

  return <div ref={ref} />;
};

// ULTIMATE Letter Animation with Physics
const AnimatedWord = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          initial={{ opacity: 0, y: 120, rotateX: 90, z: -100 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
          exit={{ opacity: 0, y: -120, rotateX: -90, z: 100 }}
          transition={{
            duration: 0.7,
            delay: delay + (i * 0.04),
            ease: [0.16, 1, 0.3, 1],
            z: { duration: 0.4 }
          }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  );
};

// Parallax Layer Component
const ParallaxLayer = ({ children, speed = 0.5, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100]);
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const [currentWord, setCurrentWord] = useState(0);
  const words = ["ERP Systems.", "E-Commerce.", "Mobile Apps.", "Custom CRM."];
  const { setCurrentService } = useService();

  useEffect(() => {
    const timer = setInterval(() => setCurrentWord(prev => (prev + 1) % words.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Update 3D scene based on current service word
  useEffect(() => {
    const serviceName = words[currentWord].replace('.', '').trim();
    setCurrentService(serviceName);
  }, [currentWord, setCurrentService, words]);
  
  // Set initial service on mount
  useEffect(() => {
    const initialService = words[0].replace('.', '').trim();
    setCurrentService(initialService);
  }, [setCurrentService, words]);

  const services = [
    { icon: <Database />, title: 'ERP Systems', desc: 'Complete Enterprise Resource Planning solutions for inventory, accounting, and operations.' },
    { icon: <Users />, title: 'CRM Solutions', desc: 'Custom Customer Relationship Management systems to manage leads and sales pipelines.' },
    { icon: <ShoppingCart />, title: 'E-Commerce', desc: 'Scalable online stores with custom admin panels and payment gateways.' },
    { icon: <Code />, title: 'Custom Apps', desc: 'Bespoke software built to solve your specific business challenges.' },
    { icon: <Smartphone />, title: 'Mobile Apps', desc: 'Native iOS and Android apps with excellent user experiences.' },
    { icon: <Cloud />, title: 'Cloud & DevOps', desc: 'Scalable cloud infrastructure with automated deployment.' }
  ];

  const stats = [
    { icon: <Star />, number: 200, suffix: '+', label: 'Projects', color: 'from-amber-400 to-orange-500' },
    { icon: <Clock />, number: 95, suffix: '%', label: 'On-Time', color: 'from-emerald-400 to-green-500' },
    { icon: <Rocket />, number: 40, suffix: '%', label: 'Faster', color: 'from-blue-400 to-indigo-500' },
    { icon: <Shield />, number: 100, suffix: '%', label: 'Secure', color: 'from-purple-400 to-pink-500' }
  ];

  return (
    <>
      <SEO
        title="Tech Birds | Elite Software Engineering Studio"
        description="We architect high-performance digital ecosystems for global enterprises. Custom software development, ERP systems, CRM solutions, e-commerce platforms, and mobile applications."
        keywords="software development, ERP systems, CRM solutions, custom software, e-commerce development, mobile apps, enterprise systems, web development, cloud solutions, Tech Birds Consulting"
        canonical="https://techbirdsconsulting.com"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Tech Birds Consulting",
            "url": "https://techbirdsconsulting.com",
            "logo": "https://techbirdsconsulting.com/images/logo.png",
            "description": "Tech Birds Consulting develops innovative digital solutions including custom business applications, e-commerce platforms, ERP systems, CRM solutions, and enterprise systems.",
            "foundingDate": "2021",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hyderabad",
              "addressRegion": "Telangana",
              "addressCountry": "IN"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+91-7702427569",
                "contactType": "Customer Service",
                "email": "info@techbirdsconsulting.com",
                "availableLanguage": ["English", "Hindi"]
              }
            ],
            "sameAs": ["https://www.linkedin.com/company/techbirdsconsulting"]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Tech Birds Consulting",
            "url": "https://techbirdsconsulting.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://techbirdsconsulting.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
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
                "name": "How long does it typically take to develop a project?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Development timelines vary based on project complexity and scope. Simple custom applications take 4-8 weeks, e-commerce platforms typically require 8-16 weeks, while complex enterprise systems may take 3-6 months. We provide detailed timelines during our initial consultation phase."
                }
              },
              {
                "@type": "Question",
                "name": "Do you develop both web and mobile applications?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we specialize in both web and mobile application development. We create responsive web applications, native iOS and Android apps, cross-platform solutions using React Native, and progressive web apps (PWAs)."
                }
              }
            ]
          }
        ]}
      />

      {/* Ultra-Premium Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 origin-left z-[10001] shadow-lg shadow-blue-500/50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="min-h-screen bg-transparent relative">
        {/* Premium 3D Hero Section with Tech Birds Hub */}
        <Advanced3DHero />
        
        {/* Service-Specific 3D Background that changes with hero text */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* This section is for scroll tracking only - content is in Advanced3DHero */}
        </section>

        {/* SERVICES - Full 3D Card Flip */}
        <section className="py-24 bg-transparent relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center mb-20">
              <span className="text-blue-600 font-black tracking-[0.35em] text-[10px] mb-5 block">CAPABILITIES</span>
              <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tight">
                Software <GradientText from="#60a5fa" to="#22d3ee">Ecosystems.</GradientText>
              </h2>
              <p className="text-2xl text-white/80 max-w-3xl mx-auto font-medium">
                Enterprise-grade solutions engineered for scale, security, and performance.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style={{ perspective: '3000px' }}>
              {services.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: 50, z: -200 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 1 }}
                  whileHover={{ 
                    y: -30, 
                    rotateX: -18,
                    rotateY: i % 2 === 0 ? 10 : -10,
                    z: 100,
                    scale: 1.06,
                    transition: { duration: 0.5 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-12 border border-white/20 hover:border-blue-400/50 hover:shadow-[0_60px_120px_-20px_rgba(59,130,246,0.4)] transition-all duration-700 h-full relative overflow-hidden">
                    {/* Background Icon */}
                    <div className="absolute top-0 right-0 p-10 text-slate-100 group-hover:text-blue-100 transition-colors opacity-40">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 120 })}
                    </div>
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="mb-10 inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-white border-2 border-slate-200 text-slate-950 shadow-xl group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-500"
                        whileHover={{ rotate: 360, scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      >
                        {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                      </motion.div>
                      <h3 className="text-3xl font-black mb-5 text-white tracking-tight">{item.title}</h3>
                      <p className="text-white/70 leading-relaxed font-medium text-lg">{item.desc}</p>
                      <motion.div 
                        className="flex items-center text-blue-600 font-black text-sm mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0"
                        whileHover={{ x: 10 }}
                      >
                        EXPLORE <ArrowUpRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS - Cinematic Dark with Depth + 3D Background */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          {/* 3D Background Scene */}
          
          <div className="absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
              animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-[2]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16" style={{ perspective: '3000px' }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center group"
                  initial={{ opacity: 0, y: 80, rotateX: 60, z: -200 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 1 }}
                  whileHover={{ 
                    y: -30,
                    rotateX: -20,
                    rotateZ: i % 2 === 0 ? 5 : -5,
                    z: 100,
                    scale: 1.2,
                    transition: { duration: 0.5 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    className="text-white/10 group-hover:text-blue-500 mb-10 flex justify-center transition-all duration-700"
                    whileHover={{ rotate: 360, scale: 1.3 }}
                    transition={{ duration: 0.8 }}
                  >
                    {React.cloneElement(stat.icon as React.ReactElement, { size: 56 })}
                  </motion.div>
                  <div className="text-7xl font-black mb-4 text-white tracking-tighter">
                    <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-[10px] font-black tracking-[0.35em] text-white/90 uppercase">{stat.label}</p>
                  
                  {/* Animated underline */}
                  <motion.div 
                    className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mt-4 mx-auto`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <TechStackBadges />
        <FAQ />

        {/* FINALE - Maximum Impact */}
        <section className="py-40 bg-transparent relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06)_0%,transparent_60%)]"
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{ perspective: '2500px', transformStyle: 'preserve-3d' }}
            >
              <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-12 tracking-tighter leading-[0.85]">
                Let's Build Your <br />
                <span className="text-blue-400 font-serif italic font-light">Masterpiece.</span>
              </h2>
              <p className="text-3xl text-white/80 mb-20 max-w-4xl mx-auto leading-relaxed font-medium">
                Our engineering studio is ready to architect your next breakthrough. Premium results, zero compromises.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <motion.div
                  whileHover={{ rotateX: -15, rotateY: 15, scale: 1.08, z: 80 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Link
                    to="/contact"
                    className="inline-block bg-slate-950 text-white px-20 py-8 rounded-[2.5rem] font-black text-3xl hover:bg-blue-600 transition-all duration-600 shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                  >
                    Start Brief
                  </Link>
                </motion.div>
                <motion.a
                  href="mailto:info@techbirdsconsulting.com"
                    className="inline-flex items-center text-white font-black text-3xl hover:text-blue-400 transition-colors gap-6"
                  whileHover={{ x: 15, scale: 1.05 }}
                >
                  Email Us <ArrowRight className="w-10 h-10" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
