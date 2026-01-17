import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, X, Send, Sparkles } from 'lucide-react';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const contactOptions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Us',
      action: () => window.open('tel:+917702427569'),
      color: 'from-emerald-500 to-green-600',
      delay: 0.1
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      action: () => window.open('mailto:info@techbirdsconsulting.com'),
      color: 'from-blue-500 to-indigo-600',
      delay: 0.2
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      action: () => window.open('https://wa.me/+917702427569'),
      color: 'from-green-500 to-emerald-600',
      delay: 0.3
    }
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+917702427569', '_blank');
  };

  return (
    <>
      {/* Desktop WhatsApp Button - Bottom Left - FIXED z-index */}
      <motion.button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden md:flex fixed bottom-8 left-8 z-[9998] items-center group"
        initial={{ opacity: 0, scale: 0, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1 
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with us on WhatsApp"
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-40"
          animate={{ 
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.6 : 0.4 
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-400"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Button */}
        <div className="relative bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center overflow-hidden">
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          
          <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
        
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              className="absolute left-full ml-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shadow-xl"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-400" />
                Chat with us!
              </span>
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Contact Menu - Bottom Right - FIXED z-index below navbar */}
      <div className="fixed bottom-6 right-6 z-[50]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
              className="mb-4 space-y-3 flex flex-col items-end"
            >
              {contactOptions.map((option, index) => (
                <motion.button
                  key={option.label}
                  initial={{ opacity: 0, x: 30, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.8 }}
                  transition={{ 
                    delay: option.delay,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={option.action}
                  className={`bg-gradient-to-r ${option.color} text-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 group overflow-hidden relative`}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <span className="relative z-10">{option.icon}</span>
                  <span className="text-sm font-bold relative z-10">{option.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl shadow-blue-500/30 group overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: isOpen ? 45 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut" 
            }}
          />
          
          <motion.div
            className="relative z-10"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-6 h-6" strokeWidth={2.5} />
            ) : (
              <Send className="w-6 h-6" strokeWidth={2.5} />
            )}
          </motion.div>
        </motion.button>
      </div>
    </>
  );
};

export default FloatingContact;
