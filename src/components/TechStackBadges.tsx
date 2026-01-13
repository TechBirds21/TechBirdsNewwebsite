import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const TechStackBadges = () => {
  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'AI/ML', icon: '🤖' },
    { name: 'Stripe', icon: '💳' },
    { name: 'GraphQL', icon: '📊' },
    { name: 'Redis', icon: '⚡' },
  ];

  // Simplified for performance - just one row or two simple ones
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <div className="py-20 bg-white overflow-hidden relative border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Modern Tech Stack.
          </h3>
          <p className="text-slate-500 font-medium text-sm">
            We use industry-leading technologies to build scalable and secure products.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Simple CSS-based scroll for better performance if needed, but motion is fine if simple */}
        <motion.div
          className="flex space-x-6"
          animate={{
            x: [0, -techStack.length * 160], // Approximate width
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedTechStack.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-slate-50 px-6 py-3 rounded-2xl flex items-center space-x-3 border border-slate-100"
            >
              <span className="text-xl">{tech.icon}</span>
              <span className="font-bold text-sm text-slate-700">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechStackBadges;
