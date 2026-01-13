import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
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

  return (
    <nav
      className={`fixed w-full top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled
        ? 'bg-white/90 backdrop-blur-2xl border-b border-slate-100 py-3'
        : 'bg-white/80 backdrop-blur-lg py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* DESKTOP LAYOUT */}
        <div className="hidden md:flex justify-between items-center">
          {/* Logo - MUCH LARGER on Desktop */}
          <Link to="/" className="flex items-center gap-4 group">
            <motion.img
              src="/images/logo.png"
              alt="Tech Birds"
              className="h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
              transition={{ duration: 0.6 }}
            />
            <span className="text-3xl font-black tracking-tighter text-slate-900">
              Tech<span className="text-blue-600">Birds</span>
            </span>
          </Link>

          {/* Navigation Pills */}
          <div className="flex items-center bg-slate-50 p-1.5 rounded-full border border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 text-sm font-bold tracking-wide rounded-full transition-all duration-300 ${isActive(link.path)
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://wa.me/+917702427569"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.a>
            <Link
              to="/contact"
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-xl active:scale-95"
            >
              Start Brief
            </Link>
          </div>
        </div>

        {/* MOBILE LAYOUT - Hamburger Left, Logo Center */}
        <div className="flex md:hidden items-center justify-between">
          {/* Hamburger Menu - LEFT - Hidden when sidebar is open */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 text-slate-900 relative z-50 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </motion.button>

          {/* Logo - CENTER - MUCH LARGER on Mobile */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Tech Birds"
              className="h-20 w-20 object-contain"
            />
            <span className="text-3xl font-black tracking-tighter text-slate-900">
              Tech<span className="text-blue-600">Birds</span>
            </span>
          </Link>

          {/* WhatsApp - RIGHT */}
          <a
            href="https://wa.me/+917702427569"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* MOBILE MENU - Sidebar with Backdrop */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1001] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300
              }}
              className="fixed left-0 top-0 h-screen w-[85%] max-w-[320px] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.15)] z-[1002] md:hidden flex flex-col"
              style={{ willChange: 'transform' }}
            >
              {/* Header with Close Button */}
              <div className="flex-shrink-0 bg-white border-b border-slate-200 px-5 py-5 flex items-center justify-between">
                <Link
                  to="/"
                  className="flex items-center gap-3"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src="/images/logo.png"
                    alt="Tech Birds"
                    className="h-18 w-18 object-contain"
                  />
                  <span className="text-2xl font-black tracking-tighter text-slate-900">
                    Tech<span className="text-blue-600">Birds</span>
                  </span>
                </Link>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  aria-label="Close menu"
                >
                  <X size={24} strokeWidth={2.5} />
                </motion.button>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Navigation Links */}
                <div className="px-4 py-6 space-y-1.5">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{
                        delay: index * 0.06,
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between px-5 py-4 text-base font-bold rounded-xl transition-all duration-200 group ${isActive(link.path)
                          ? 'text-blue-600 bg-blue-50/80 shadow-sm'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="tracking-wide">{link.name}</span>
                        <ArrowRight
                          size={16}
                          strokeWidth={2.5}
                          className={`transition-transform duration-200 ${isActive(link.path)
                            ? 'text-blue-600'
                            : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1'
                            }`}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="px-4 pb-4 pt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      delay: 0.4,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20
                    }}
                  >
                    <Link
                      to="/contact"
                      className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3.5 rounded-xl font-black text-base shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                      onClick={() => setIsOpen(false)}
                    >
                      START PROJECT
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Footer - Fixed at Bottom */}
              <div className="flex-shrink-0 px-4 py-4 border-t border-slate-200 bg-slate-50/50">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <a
                    href="https://wa.me/+917702427569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all"
                    onClick={() => setIsOpen(false)}
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
