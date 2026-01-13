import React, { useEffect, useState, useRef, Suspense } from 'react';
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence, useMotionTemplate, useVelocity, useAnimationFrame } from 'framer-motion';
import { ArrowRight, Code, Rocket, Users, Star, Clock, Shield, Database, Globe, Zap, ShoppingCart, Smartphone, Cloud, ArrowUpRight, Cpu, Activity, Server, Layout, Boxes, Binary, Workflow, TrendingUp, CheckCircle2, Sparkles, Target, CircleDot, Hexagon, Layers } from 'lucide-react';
import FAQ from '../components/FAQ';
import TechStackBadges from '../components/TechStackBadges';
import SEO from '../components/SEO';
import AnimatedSection, { StaggerContainer, StaggerItem, GradientText } from '../components/AnimatedSection';
import { Link } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import PremiumCursor from '../components/PremiumCursor';
import Scene3D from '../components/Scene3D';

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

  useEffect(() => {
    const timer = setInterval(() => setCurrentWord(prev => (prev + 1) % words.length), 4000);
    return () => clearInterval(timer);
  }, []);

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

      <PremiumCursor />

      <div className="min-h-screen bg-white relative">
        {/* ULTIMATE HERO - CINEMATIC FULL-SCREEN */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Multi-Layer Background System */}
          <div className="absolute inset-0 z-0">
            {/* 3D Scene */}
            <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />}>
              <Scene3D />
            </Suspense>

            {/* Dynamic Animated Gradient based on current service */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  background: currentWord === 0
                    ? 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)' // Blue for ERP
                    : currentWord === 1
                      ? 'radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)' // Green for E-Commerce
                      : currentWord === 2
                        ? 'radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)' // Purple for Mobile Apps
                        : 'radial-gradient(circle at 50% 30%, rgba(236, 72, 153, 0.12) 0%, transparent 50%)' // Pink for CRM
                }}
              />
            </AnimatePresence>

            {/* Floating Geometric Shapes */}
            <ParallaxLayer speed={0.3} className="absolute inset-0">
              <motion.div
                className="absolute top-[20%] right-[10%] opacity-5"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <Hexagon size={300} className="text-blue-600" strokeWidth={1} />
              </motion.div>
            </ParallaxLayer>

            <ParallaxLayer speed={0.5} className="absolute inset-0">
              <motion.div
                className="absolute bottom-[20%] left-[15%] opacity-5"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >
                <CircleDot size={250} className="text-indigo-600" strokeWidth={1} />
              </motion.div>
            </ParallaxLayer>

            {/* Dynamic Morphing Blobs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`blob1-${currentWord}`}
                className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
                style={{
                  top: '-20%',
                  right: '-15%',
                  backgroundColor: currentWord === 0
                    ? 'rgba(59, 130, 246, 0.08)' // Blue for ERP
                    : currentWord === 1
                      ? 'rgba(16, 185, 129, 0.08)' // Green for E-Commerce
                      : currentWord === 2
                        ? 'rgba(139, 92, 246, 0.08)' // Purple for Mobile Apps
                        : 'rgba(236, 72, 153, 0.08)' // Pink for CRM
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  x: [0, 100, 0],
                  y: [0, -80, 0],
                  scale: [1, 1.3, 1],
                  borderRadius: ['50%', '40% 60%', '50%']
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[100px]"
              style={{ bottom: '-10%', left: '-10%' }}
              animate={{
                x: [0, -100, 0],
                y: [0, 80, 0],
                scale: [1, 1.2, 1],
                borderRadius: ['50%', '60% 40%', '50%']
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            style={{ y, opacity, scale }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 sm:pt-24"
          >
            <div className="text-center max-w-6xl mx-auto">

              {/* CINEMATIC HEADLINE - Mobile Optimized */}
              <div className="mb-12 sm:mb-16" style={{ perspective: '3000px' }}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-slate-950 tracking-tighter leading-[0.9]">
                  {/* Line 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-3 sm:mb-4"
                  >
                    We Craft
                  </motion.div>

                  {/* Line 2 */}
                  <motion.div
                    className="text-blue-600 mb-4 sm:mb-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-serif italic font-light tracking-normal">
                      Digital
                    </span>
                  </motion.div>

                  {/* Line 3 - Letter by Letter - Mobile Optimized */}
                  <div className="min-h-[1em] sm:min-h-[1.2em] overflow-visible relative px-2 sm:px-4 mx-auto max-w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentWord}
                        className="text-slate-600 whitespace-nowrap"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <AnimatedWord text={words[currentWord]} delay={0} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </h1>
              </div>

              {/* Description - Mobile Optimized */}
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 font-medium max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-16 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                Transform your business with enterprise-grade software. We architect <span className="text-slate-950 font-bold">ERP systems</span>, <span className="text-slate-950 font-bold">CRM platforms</span>, <span className="text-slate-950 font-bold">E-Commerce</span>, and custom applications that scale globally.
              </motion.p>

              {/* CTAs - Mobile Optimized */}
              <motion.div
                className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12 sm:mb-16 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-slate-950 text-white px-10 py-5 sm:px-14 sm:py-6 rounded-2xl font-bold sm:font-black text-lg sm:text-xl flex items-center justify-center gap-3 group shadow-2xl hover:bg-blue-600 transition-all duration-500"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>

                <Link
                  to="/projects"
                  className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-300 px-10 py-5 sm:px-14 sm:py-6 rounded-2xl font-bold sm:font-black text-lg sm:text-xl hover:border-blue-600 hover:bg-slate-50 transition-all duration-300 shadow-xl text-center"
                >
                  View Portfolio
                </Link>
              </motion.div>

              {/* Stats Grid - Mobile Optimized */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                {[
                  { value: '300+', label: 'Projects', icon: <Boxes />, gradient: 'from-blue-500 to-indigo-600' },
                  { value: '99%', label: 'Happy', icon: <Star />, gradient: 'from-amber-500 to-orange-600' },
                  { value: '15+', label: 'Countries', icon: <Globe />, gradient: 'from-emerald-500 to-teal-600' },
                  { value: '99.9%', label: 'Uptime', icon: <Activity />, gradient: 'from-purple-500 to-pink-600' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 + (i * 0.1), duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 sm:p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg mx-auto mb-3 sm:mb-5 group-hover:scale-110 transition-transform`}>
                        {React.cloneElement(item.icon as React.ReactElement, { size: 20, className: 'sm:w-6 sm:h-6' })}
                      </div>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-1 tracking-tighter">{item.value}</div>
                      <div className="text-[9px] sm:text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SERVICES - Full 3D Card Flip */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="text-center mb-20">
              <span className="text-blue-600 font-black tracking-[0.35em] text-[10px] mb-5 block">CAPABILITIES</span>
              <h2 className="text-6xl md:text-7xl font-black text-slate-950 mb-8 tracking-tight">
                Software <GradientText from="#2563eb" to="#0891b2">Ecosystems.</GradientText>
              </h2>
              <p className="text-2xl text-slate-700 max-w-3xl mx-auto font-medium">
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
                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-[3rem] p-12 border border-slate-100 hover:border-blue-200 hover:shadow-[0_60px_120px_-20px_rgba(59,130,246,0.2)] transition-all duration-700 h-full relative overflow-hidden">
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
                      <h3 className="text-3xl font-black mb-5 text-slate-900 tracking-tight">{item.title}</h3>
                      <p className="text-slate-700 leading-relaxed font-medium text-lg">{item.desc}</p>
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

        {/* STATS - Cinematic Dark with Depth */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0">
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

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
        <section className="py-40 bg-white relative overflow-hidden">
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
              <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 mb-12 tracking-tighter leading-[0.85]">
                Let's Build Your <br />
                <span className="text-blue-600 font-serif italic font-light">Masterpiece.</span>
              </h2>
              <p className="text-3xl text-slate-700 mb-20 max-w-4xl mx-auto leading-relaxed font-medium">
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
                  className="inline-flex items-center text-slate-950 font-black text-3xl hover:text-blue-600 transition-colors gap-6"
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
