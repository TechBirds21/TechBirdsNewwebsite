import React from 'react';
import { motion } from 'framer-motion';

const WorldMap = () => {
  const locations = [
    { name: 'USA', x: '20%', y: '35%', flag: '🇺🇸', clients: '50+' },
    { name: 'UK', x: '48%', y: '25%', flag: '🇬🇧', clients: '30+' },
    { name: 'Germany', x: '52%', y: '28%', flag: '🇩🇪', clients: '25+' },
    { name: 'UAE', x: '62%', y: '45%', flag: '🇦🇪', clients: '40+' },
    { name: 'India', x: '72%', y: '50%', flag: '🇮🇳', clients: '100+' },
    { name: 'Australia', x: '85%', y: '75%', flag: '🇦🇺', clients: '15+' },
  ];

  return (
    <section className="py-20 bg-deep-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted <span className="text-tech-teal">Globally</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Serving clients across 6 countries with world-class digital solutions
          </p>
        </motion.div>

        <div className="relative">
          {/* Simplified World Map SVG */}
          <div className="relative w-full h-96 bg-gradient-to-br from-tech-teal/10 to-vibrant-orange/10 rounded-3xl overflow-hidden">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full opacity-20"
              fill="currentColor"
            >
              {/* Simplified world continents */}
              <path d="M150,200 Q200,150 300,180 L350,220 Q320,280 250,260 Q180,240 150,200 Z" />
              <path d="M400,150 Q500,120 600,160 L650,200 Q600,250 500,230 Q420,210 400,150 Z" />
              <path d="M700,200 Q800,180 900,220 L950,280 Q900,320 800,300 Q720,280 700,200 Z" />
              <path d="M800,350 Q850,330 900,360 L920,400 Q880,420 840,400 Q810,380 800,350 Z" />
            </svg>

            {/* Location Markers */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: location.x, top: location.y }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.3,
                    },
                  }}
                >
                  {/* Pulsing circle */}
                  <div className="absolute inset-0 bg-tech-teal rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-tech-teal w-4 h-4 rounded-full border-2 border-white shadow-lg"></div>
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">{location.flag}</div>
                      <div className="font-semibold text-sm">{location.name}</div>
                      <div className="text-xs text-tech-teal">{location.clients} clients</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-teal mb-2">6</div>
              <div className="text-gray-300">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-teal mb-2">260+</div>
              <div className="text-gray-300">Global Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-teal mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-teal mb-2">15+</div>
              <div className="text-gray-300">Time Zones</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
