import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const OverlayNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        '.nav-item',
        {
          opacity: 0,
          y: 50,
          rotationX: 90
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation Bar - Centered and Premium */}
      <motion.nav 
        className="hidden lg:flex fixed top-0 left-0 right-0 z-[9999]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div 
          className={`w-full px-8 py-4 transition-all duration-500 ${
            isScrolled 
              ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-white/10' 
              : 'bg-slate-950/80 backdrop-blur-xl'
          }`}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center">
            {/* Logo - Left */}
            <Link to="/" className="flex items-center gap-3 group absolute left-8">
              <motion.img 
                src="/images/logo.png" 
                alt="Tech Birds" 
                className="h-12 w-12 object-contain transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-tight">
                  Tech<span className="text-blue-400">Birds</span>
                </span>
                <span className="text-[9px] font-medium text-white/60 uppercase tracking-wider">
                  Technology Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full px-3 py-2 border border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-white/10 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-[9999] w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Logo */}
      <Link 
        to="/" 
        className="lg:hidden fixed top-6 left-6 z-[9999] flex items-center gap-2 group"
        onClick={() => setIsOpen(false)}
      >
        <motion.img 
          src="/images/logo.png" 
          alt="Tech Birds" 
          className="h-12 w-12 object-contain"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tight text-white leading-tight">
            Tech<span className="text-blue-400">Birds</span>
          </span>
          <span className="text-[9px] font-medium text-white/60 uppercase tracking-wider">
            Technology Solutions
          </span>
        </div>
      </Link>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[9998]"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[9999] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={handleClose}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg z-[10000]"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                <X size={20} />
              </motion.button>

              <div className="absolute top-6 left-6 z-[10000]">
                <Link 
                  to="/" 
                  className="flex items-center gap-3 group"
                  onClick={handleClose}
                >
                  <motion.img 
                    src="/images/logo.png" 
                    alt="Tech Birds" 
                    className="h-14 w-14 object-contain"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white/80 uppercase tracking-wider">
                      TECH BIRDS
                    </div>
                    <div className="text-[10px] font-medium text-white/50">
                      TECHNOLOGY SOLUTIONS
                    </div>
                  </div>
                </Link>
              </div>

              <nav className="flex-1 flex items-center justify-center text-center px-6">
                <div>
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      className="nav-item"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={handleClose}
                        className="block text-5xl sm:text-6xl md:text-7xl font-black text-white hover:text-blue-400 transition-colors mb-6 relative group"
                      >
                        <span className="relative z-10">{link.name}</span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-2xl"
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default OverlayNavigation;
