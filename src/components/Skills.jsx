import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { TiltCard3D } from './ui/TiltCard3D';

import { 
  SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiExpress,
  SiRedux, SiReactivex, SiAngular, SiPostman, SiBootstrap, 
  SiReactquery, SiJsonwebtokens, SiMongoose, SiDocker, SiSlack, 
  SiJira, SiTrello, SiVite, SiVercel, SiCloudflare
} from 'react-icons/si';

import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaGitAlt, 
  FaDatabase, FaRobot, FaBrain, FaSliders, FaLayerGroup, FaStore, 
  FaCodeBranch, FaArrowsRotate, FaSitemap, FaCubes, FaPenNib
} from 'react-icons/fa6';

import { VscVscode } from 'react-icons/vsc';

const iconMap = {
  // Frontend
  html5: <FaHtml5 className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#E34F26' }} />,
  css3: <FaCss3Alt className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#1572B6' }} />,
  javascript: <FaJs className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#F7DF1E' }} />,
  typescript: <SiTypescript className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#3178C6' }} />,
  react: <FaReact className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#61DAFB' }} />,
  nextjs: <SiNextdotjs className="h-5 w-5 text-black transition-transform duration-300 group-hover:scale-110 dark:text-white" />,
  angular: <SiAngular className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#DD0031' }} />,
  tailwindcss: <SiTailwindcss className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#06B6D4' }} />,
  bootstrap: <SiBootstrap className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#7952B3' }} />,
  uiux: <FaPenNib className="h-5 w-5 text-brand-plum transition-transform duration-300 group-hover:scale-110" />,

  // State Management
  redux: <SiRedux className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#764ABC' }} />,
  zustand: <FaStore className="h-5 w-5 text-yellow-600 transition-transform duration-300 group-hover:scale-110" />,
  reactquery: <SiReactquery className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#FF4154' }} />,
  reactivex: <SiReactivex className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#B7178C' }} />,

  // Backend & Databases
  nodedotjs: <FaNodeJs className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#339933' }} />,
  express: <SiExpress className="h-6 w-6 text-black transition-transform duration-300 group-hover:scale-110 dark:text-white" />,
  api: <SiPostman className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#FF6C37' }} />,
  jwt: <SiJsonwebtokens className="h-5 w-5 text-pink-500 transition-transform duration-300 group-hover:scale-110" />,
  mongodb: <SiMongodb className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#47A248' }} />,
  mongoose: <SiMongoose className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#880000' }} />,
  sql: <FaDatabase className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:scale-110" />,

  // AI
  llm: <FaBrain className="h-5 w-5 text-purple-500 transition-transform duration-300 group-hover:scale-110" />,
  finetuning: <FaSliders className="h-5 w-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" />,
  prompt: <FaRobot className="h-5 w-5 text-teal-500 transition-transform duration-300 group-hover:scale-110" />,
  rag: <FaLayerGroup className="h-5 w-5 text-indigo-500 transition-transform duration-300 group-hover:scale-110" />,
  vectordb: <FaDatabase className="h-5 w-5 text-brand-plum transition-transform duration-300 group-hover:scale-110" />,

  // Tools
  git: <FaGitAlt className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#F05032' }} />,
  github: <FaGithub className="h-6 w-6 text-black transition-transform duration-300 group-hover:scale-110 dark:text-white" />,
  postman: <SiPostman className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#FF6C37' }} />,
  docker: <SiDocker className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#2496ED' }} />,
  slack: <SiSlack className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#4A154B' }} />,
  jira: <SiJira className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#0052CC' }} />,
  trello: <SiTrello className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#0052CC' }} />,
  vscode: <VscVscode className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#007ACC' }} />,
  vite: <SiVite className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#646CFF' }} />,
  vercel: <SiVercel className="h-5 w-5 text-black transition-transform duration-300 group-hover:scale-110 dark:text-white" />,
  cloudflare: <SiCloudflare className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: '#F38020' }} />,

  // Software Engineering
  oop: <FaCubes className="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:scale-110" />,
  dsa: <FaCodeBranch className="h-5 w-5 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />,
  agile: <FaArrowsRotate className="h-5 w-5 text-cyan-500 transition-transform duration-300 group-hover:scale-110" />,
  architecture: <FaSitemap className="h-5 w-5 text-brand-indigo transition-transform duration-300 group-hover:scale-110" />
};

export function Skills() {
  return (
    <section id="skills" className="relative w-full py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
              Technical <span className="text-gradient">Arsenal</span>.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              A comprehensive toolkit for building modern, scalable, and AI-powered applications.
            </p>
          </motion.div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:grid-flow-row-dense">
          {SKILLS_DATA.map((category, index) => {
            // Alternating 'staircase' pattern for large screens: Left-Wide, Right-Wide, Left-Wide
            const isWideLg = index === 0 || index === 3 || index === 4;
            const isWideMd = index === 0 || index === 4;
            
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className={`bezel-shell ${isWideLg ? 'lg:col-span-2' : 'lg:col-span-1'} ${isWideMd ? 'md:col-span-2' : 'md:col-span-1'} col-span-1 h-full`}
              >
                <TiltCard3D scaleOnHover={1.02} className="h-full" containerClassName="h-full">
                  <div className="bezel-core h-full p-8">
                    <h3 className="mb-6 text-xl font-bold text-zinc-900 dark:text-white">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {category.items.map((item) => {
                        const iconEl = iconMap[item.icon] || <Code2 strokeWidth={1.5} className="h-5 w-5 text-zinc-500" />;
                        return (
                          <div
                            key={item.name}
                            className="group flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:scale-105 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                          >
                            {React.cloneElement(iconEl, { 'aria-hidden': 'true' })}
                            <span>{item.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
