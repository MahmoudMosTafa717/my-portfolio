import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

function TypewriterText({ text }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    
    // Natural, slightly randomized typing speed
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        setDisplayedText(currentText);
        currentIndex++;
        const randomDelay = Math.random() * 50 + 50; // 50ms - 100ms per char
        setTimeout(typeNextChar, randomDelay);
      } else {
        setIsTyping(false);
      }
    };

    // Initial delay before typing starts
    setTimeout(typeNextChar, 800);
  }, [text]);

  return (
    <span className="inline-flex items-center text-zinc-900 dark:text-white font-bold">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ 
          duration: 0.8, 
          repeat: isTyping ? Infinity : 3, // Blink forever while typing, then stop elegantly after 3 blinks
          ease: "linear"
        }}
        className={`inline-block w-[3px] h-[1em] ml-[2px] bg-brand-plum translate-y-[1px] ${!isTyping ? 'opacity-0' : ''}`}
      />
    </span>
  );
}

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section id="home" className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden pt-24">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute h-[600px] w-[600px] rounded-full bg-brand-plum/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen" style={{ transform: 'translate(-20%, -20%)' }} />
        <div className="absolute h-[500px] w-[500px] rounded-full bg-brand-indigo/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen" style={{ transform: 'translate(30%, 30%)' }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Headline */}
          <motion.h1 variants={itemVariants} className="mb-6 text-5xl font-extrabold tracking-tighter text-zinc-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl transition-colors duration-500">
            Building premium <br className="hidden sm:block" />
            <span className="text-gradient">digital experiences.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={itemVariants} className="mb-12 max-w-2xl text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl transition-colors duration-500">
            Hi, I'm <TypewriterText text={PROFILE_DATA.name} />.<br /> A Full-Stack Software Engineer specializing in scalable web applications, React ecosystems, and AI-powered solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 w-full sm:w-auto">
            {/* Primary Button */}
            <a href="#projects" className="group btn-island-primary w-full sm:w-auto justify-center shadow-md dark:shadow-none">
              <span className="pl-2">View Projects</span>
              <div className="btn-icon-wrapper">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </a>

            {/* Secondary Button */}
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noreferrer"
              className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all duration-300 ease-[var(--ease-ui)] hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-400 active:scale-[0.97] shadow-sm dark:shadow-none dark:border-zinc-800 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white dark:hover:border-zinc-700"
            >
              <Github className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span>GitHub Profile</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
