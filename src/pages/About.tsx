import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Globe, Award, Target, TrendingUp, Zap, Code, Database, Cloud, Shield, Users, Star, Heart, Sparkles, Trophy, CircleDot, Hexagon } from 'lucide-react';
import SEO from '../components/SEO';
import { GradientText } from '../components/AnimatedSection';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

// 3D Animated Globe Component
const Globe3D = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Sphere>
      <mesh>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  );
};

const About = () => {
  const stats = [
    { value: '300+', label: 'Projects Delivered', icon: <Trophy />, gradient: 'from-blue-500 to-cyan-500' },
    { value: '15+', label: 'Countries Served', icon: <Globe />, gradient: 'from-emerald-500 to-teal-500' },
    { value: '99%', label: 'Client Satisfaction', icon: <Heart />, gradient: 'from-rose-500 to-pink-500' },
    { value: '24/7', label: 'Support Available', icon: <Shield />, gradient: 'from-purple-500 to-indigo-500' }
  ];

  const journey = [
    {
      year: '2021',
      title: 'The Beginning',
      description: 'Founded with a vision to revolutionize digital transformation for businesses worldwide.',
      icon: <Rocket />,
      color: 'from-blue-500 via-indigo-500 to-purple-500'
    },
    {
      year: '2022',
      title: 'Global Reach',
      description: 'Expanded operations to USA, UK, UAE, and Germany, serving enterprise clients globally.',
      icon: <Globe />,
      color: 'from-emerald-500 via-teal-500 to-cyan-500'
    },
    {
      year: '2023',
      title: 'AI Innovation',
      description: 'Pioneered AI-integrated solutions and cloud-native architectures for scalable systems.',
      icon: <Sparkles />,
      color: 'from-amber-500 via-orange-500 to-red-500'
    },
    {
      year: '2024',
      title: 'Enterprise Excellence',
      description: 'Achieved milestone of 200+ projects with Fortune 500 companies and startups alike.',
      icon: <Award />,
      color: 'from-violet-500 via-purple-500 to-fuchsia-500'
    },
    {
      year: '2025',
      title: 'Industry Leaders',
      description: 'Recognized as top-tier software engineering studio with 99% client retention rate.',
      icon: <Star />,
      color: 'from-rose-500 via-pink-500 to-purple-500'
    }
  ];

  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Speed & Agility',
      description: 'Rapid development cycles with continuous deployment. We ship features 3x faster than industry average through optimized workflows and cutting-edge tooling.',
      color: 'from-amber-500 to-orange-600',
      stats: '40% Faster Delivery'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Precision Engineering',
      description: 'Every line of code is crafted with meticulous attention to detail. We maintain 98% code quality scores and zero-bug deployment standards.',
      color: 'from-blue-500 to-cyan-600',
      stats: '98% Quality Score'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'Leveraging AI, machine learning, and emerging technologies to build future-proof solutions that scale seamlessly from startup to enterprise.',
      color: 'from-purple-500 to-pink-600',
      stats: 'AI-Powered Solutions'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client Partnership',
      description: 'We don\'t just build software – we build relationships. Transparent communication, honest timelines, and dedicated support teams ensure your success.',
      color: 'from-emerald-500 to-teal-600',
      stats: '99% Satisfaction Rate'
    }
  ];

  const expertise = [
    { icon: <Code />, title: 'Full-Stack Development', tech: 'React, Node.js, TypeScript, Python, Next.js', color: 'bg-blue-500' },
    { icon: <Database />, title: 'Database Architecture', tech: 'PostgreSQL, MongoDB, Redis, Supabase', color: 'bg-emerald-500' },
    { icon: <Cloud />, title: 'Cloud Infrastructure', tech: 'AWS, Azure, GCP, Vercel, Cloudflare', color: 'bg-purple-500' },
    { icon: <Shield />, title: 'Security & DevOps', tech: 'SSL, OAuth, CI/CD, Docker, Kubernetes', color: 'bg-rose-500' }
  ];

  return (
    <>
      <SEO
        title="About Us | Elite Software Engineering Studio"
        description="Learn about Tech Birds Consulting - a leading software development company founded in 2021, serving 300+ clients globally with custom ERP systems, CRM solutions, e-commerce platforms, and enterprise applications."
        keywords="about tech birds, software development company, custom software development, enterprise solutions, ERP systems, CRM development, web development company"
        canonical="https://techbirdsconsulting.com/about"
      />

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* CINEMATIC HERO */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.05) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
              animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* 3D Globe */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[400px] h-[400px] hidden lg:block opacity-40">
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Globe3D />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
              </Canvas>
            </Suspense>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-20">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-xl">
                  <Award className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-black tracking-[0.2em] text-blue-400">ESTABLISHED 2021</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[0.95]">
                  Architecting the
                  <br />
                  <GradientText from="#3b82f6" to="#06b6d4">Digital Future.</GradientText>
                </h1>

                <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed mb-12 max-w-3xl">
                  We're not just developers – we're <span className="text-white font-bold">digital architects</span> transforming ambitious visions into scalable, enterprise-grade software that powers global businesses.
                </p>

                <div className="flex flex-wrap gap-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all duration-300 shadow-2xl shadow-blue-500/30 group"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center bg-white/10 backdrop-blur-xl text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all duration-300"
                  >
                    View Our Work
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-10 opacity-10"
            animate={{ rotate: 360, y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Hexagon size={120} className="text-blue-500" strokeWidth={1} />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-1/4 opacity-10"
            animate={{ rotate: -360, y: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <CircleDot size={100} className="text-cyan-500" strokeWidth={1} />
          </motion.div>
        </section>

        {/* STATS SHOWCASE - New Design */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group"
                >
                  <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-100 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      {React.cloneElement(stat.icon as React.ReactElement, { size: 28 })}
                    </div>
                    <div className="text-5xl font-black text-slate-950 mb-3 tracking-tighter">{stat.value}</div>
                    <div className="text-sm font-bold text-slate-600 tracking-wide">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR EXPERTISE - Premium Bento Grid Design */}
        <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -50, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, 50, 0]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Technology Stack</span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 mb-6 tracking-tight">
                  Our <GradientText from="#3b82f6" to="#8b5cf6">Expertise.</GradientText>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Cutting-edge technologies powering enterprise-grade solutions
                </p>
              </motion.div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Large Featured Card - Full-Stack */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="lg:col-span-2 lg:row-span-2 group"
              >
                <div className="relative h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 overflow-hidden shadow-2xl hover:shadow-blue-500/30 transition-all duration-500">
                  {/* Animated Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Code size={36} />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Full-Stack Development</h3>
                    <p className="text-lg text-white/90 leading-relaxed mb-8 flex-1">
                      End-to-end application development with modern frameworks and best practices. From frontend to backend, we build scalable, performant systems.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['React', 'Node.js', 'TypeScript', 'Python', 'Next.js', 'Express'].map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl text-white text-sm font-bold border border-white/30"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Database Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group"
              >
                <div className="relative h-full bg-white rounded-3xl p-8 border-2 border-emerald-100 hover:border-emerald-300 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Database size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Database Architecture</h3>
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                      Robust data solutions with optimized queries and scalability.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['PostgreSQL', 'MongoDB', 'Redis'].map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Cloud Infrastructure Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group"
              >
                <div className="relative h-full bg-white rounded-3xl p-8 border-2 border-purple-100 hover:border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Cloud size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Cloud Infrastructure</h3>
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                      Scalable cloud solutions with automated deployment.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['AWS', 'Azure', 'GCP', 'Vercel'].map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Security & DevOps - Wide Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="lg:col-span-3 group"
              >
                <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl p-8 overflow-hidden shadow-2xl hover:shadow-rose-500/30 transition-all duration-500">
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)',
                      backgroundSize: '40px 40px',
                      backgroundPosition: '0 0, 20px 20px'
                    }}
                    animate={{ backgroundPosition: ['0px 0px, 20px 20px', '40px 40px, 60px 60px'] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 flex-shrink-0">
                      <Shield size={36} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Security & DevOps</h3>
                      <p className="text-lg text-white/90 leading-relaxed mb-6">
                        Enterprise-grade security with automated CI/CD pipelines, containerization, and monitoring.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {['SSL/TLS', 'OAuth 2.0', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring'].map((tech, i) => (
                          <motion.span
                            key={i}
                            className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl text-white text-sm font-bold border border-white/30"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OUR JOURNEY - Timeline Redesign */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Our Story</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 mb-6 tracking-tight">
                The <GradientText from="#3b82f6" to="#06b6d4">Journey.</GradientText>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                From startup vision to global engineering excellence
              </p>
            </div>

            <div className="space-y-8">
              {journey.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.02, x: index % 2 === 0 ? 10 : -10 }}
                  className="group"
                >
                  <div className={`relative bg-gradient-to-r ${milestone.color} rounded-3xl p-1 shadow-xl hover:shadow-2xl transition-all duration-500`}>
                    <div className="bg-white rounded-3xl p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                          {React.cloneElement(milestone.icon as React.ReactElement, { size: 32 })}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-black text-white bg-gradient-to-r from-slate-900 to-slate-700 mb-4 shadow-md">
                          {milestone.year}
                        </div>
                        <h3 className="text-3xl font-black mb-3 text-slate-900 tracking-tight">{milestone.title}</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE VALUES - Card Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Core Principles</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 mb-6 tracking-tight">
                Our <GradientText from="#3b82f6" to="#06b6d4">Values.</GradientText>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                The principles that drive exceptional results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.7 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative h-full bg-gradient-to-br from-slate-50 to-white rounded-3xl p-10 border border-slate-100 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {value.icon}
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">{value.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed mb-6">{value.description}</p>
                    <div className={`inline-block px-4 py-2 rounded-xl text-sm font-black text-white bg-gradient-to-r ${value.color} shadow-md`}>
                      {value.stats}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL EXPERTISE */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Technology Stack</span>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Excellence.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertise.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-500 h-full">
                    <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.tech}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION & VISION - Side by Side */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12 border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-8 shadow-lg">
                    <Target className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-950 mb-6 tracking-tight">Our Mission</h2>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    To democratize access to cutting-edge technology by delivering fast, scalable, and innovative software solutions that empower businesses globally.
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    We transform complex business requirements into elegant, high-performance digital ecosystems that drive growth and efficiency.
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
                <div className="relative h-full bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 rounded-3xl p-12 border-2 border-cyan-100 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 text-white flex items-center justify-center mb-8 shadow-lg">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-950 mb-6 tracking-tight">Our Vision</h2>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">
                    To be the world's most trusted software engineering studio, recognized for exceptional quality, innovation, and unwavering commitment to client success.
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    We envision a future where every business has access to enterprise-grade software that scales seamlessly with their ambitions.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-28 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_70%)]" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                Ready to Build
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                  Something Amazing?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Let's transform your vision into a world-class digital product
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-blue-600 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all duration-500 shadow-2xl shadow-blue-500/30 group"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
                <a
                  href="mailto:info@techbirdsconsulting.com"
                  className="inline-flex items-center bg-white/10 backdrop-blur-xl text-white border-2 border-white/20 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/20 transition-all duration-300"
                >
                  Email Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
