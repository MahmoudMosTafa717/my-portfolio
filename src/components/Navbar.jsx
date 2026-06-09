import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'connect'];
      let current = '';
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - window.innerHeight / 2) {
          current = section;
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.23, 1, 0.32, 1] 
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileLinkVariants = {
    closed: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed left-0 right-0 top-6 z-50 mx-auto w-max transition-all duration-500 ${
          scrolled ? 'scale-95' : 'scale-100'
        }`}
      >
        {/* Floating Glass Pill */}
        <div className="flex items-center gap-8 rounded-full border border-zinc-200 bg-white/70 px-6 py-3 shadow-2xl backdrop-blur-md dark:bg-zinc-950/40 dark:border-white/10 transition-colors duration-500">
          
          <a href="#home" className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white transition-colors duration-500">
            M<span className="text-gradient">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-6 md:flex relative">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive 
                      ? 'text-zinc-900 dark:text-white font-bold' 
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-plum rounded-full"
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <a 
              href="#connect" 
              className="hidden md:flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Let's Talk
            </a>

            {/* Hamburger Morph */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="block h-[2px] w-5 bg-zinc-900 dark:bg-white transition-colors duration-500"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="block h-[2px] w-5 bg-zinc-900 dark:bg-white transition-colors duration-500"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="block h-[2px] w-5 bg-zinc-900 dark:bg-white transition-colors duration-500"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Massive Screen-filling Overlay for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 flex h-[100dvh] w-full flex-col justify-center bg-zinc-100/95 px-6 backdrop-blur-3xl dark:bg-zinc-950/95 transition-colors duration-500"
          >
            <div className="flex flex-col gap-8 text-center">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={mobileLinkVariants}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-500"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div variants={mobileLinkVariants} className="mt-8 flex justify-center gap-6">
                <a href={PROFILE_DATA.contact.github} target="_blank" rel="noreferrer" className="btn-icon-wrapper w-12 h-12" aria-label="GitHub Profile">
                  <Github className="h-6 w-6 text-zinc-900 dark:text-white" />
                </a>
                <a href={PROFILE_DATA.contact.linkedin} target="_blank" rel="noreferrer" className="btn-icon-wrapper w-12 h-12" aria-label="LinkedIn Profile">
                  <Linkedin className="h-6 w-6 text-zinc-900 dark:text-white" />
                </a>
                <a href={`mailto:${PROFILE_DATA.contact.email}`} className="btn-icon-wrapper w-12 h-12" aria-label="Send Email">
                  <Mail className="h-6 w-6 text-zinc-900 dark:text-white" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
