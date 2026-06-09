import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
import { PROFILE_DATA } from '../data/portfolioData';

function SocialLink({ href, icon: Icon, label, colorClass, external = true }) {
  return (
    <div className="group relative flex items-center justify-center">
      <a
        href={href}
        target={external ? "_blank" : "_self"}
        rel={external ? "noreferrer" : ""}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-all duration-300 hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 shadow-sm hover:shadow-md ${colorClass.hoverBorder} ${colorClass.hoverBg}`}
        aria-label={label}
      >
        <Icon 
          className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${colorClass.icon}`} 
        />
      </a>
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white dark:text-zinc-900 shadow-md">
        {label}
        {/* Tooltip arrow */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-white" />
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full border-t border-zinc-200 bg-zinc-50 py-8 dark:border-white/10 dark:bg-zinc-950 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <a href="#home" className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white transition-colors duration-500">
              M<span className="text-gradient">.</span>
            </a>
          </div>

          {/* Middle: Copyright & Crafted With */}
          <div className="flex flex-col items-center text-center text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-colors duration-500 md:gap-1">
            <p>© {new Date().getFullYear()} {PROFILE_DATA.name}. All rights reserved.</p>
            <p className="flex items-center gap-1 justify-center mt-2 md:mt-0">
              Crafted with <Heart className="h-4 w-4 text-brand-plum animate-pulse" /> and React
            </p>
          </div>

          {/* Right: Social Icons with Real Brand Colors */}
          <div className="flex gap-4">
            <SocialLink 
              href={PROFILE_DATA.contact.github} 
              icon={FaGithub} 
              label="GitHub" 
              colorClass={{
                icon: "text-[#181717] dark:text-white",
                hoverBorder: "hover:border-[#181717] dark:hover:border-white",
                hoverBg: "hover:bg-[#181717]/10 dark:hover:bg-white/10"
              }}
            />
            <SocialLink 
              href={PROFILE_DATA.contact.linkedin} 
              icon={FaLinkedin} 
              label="LinkedIn" 
              colorClass={{
                icon: "text-[#0A66C2]",
                hoverBorder: "hover:border-[#0A66C2]",
                hoverBg: "hover:bg-[#0A66C2]/10"
              }}
            />
            <SocialLink 
              href={`mailto:${PROFILE_DATA.contact.email}`} 
              icon={SiGmail} 
              label="Email" 
              colorClass={{
                icon: "text-[#EA4335]",
                hoverBorder: "hover:border-[#EA4335]",
                hoverBg: "hover:bg-[#EA4335]/10"
              }}
              external={false}
            />
            <SocialLink 
              href={`tel:+201061598031`} 
              icon={FaPhone} 
              label="Call Me" 
              colorClass={{
                icon: "text-[#34A853]",
                hoverBorder: "hover:border-[#34A853]",
                hoverBg: "hover:bg-[#34A853]/10"
              }}
              external={false}
            />
          </div>

        </div>
      </div>
    </footer>
  );
}
