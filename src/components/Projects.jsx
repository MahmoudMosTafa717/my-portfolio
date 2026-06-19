import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS_DATA, PROFILE_DATA } from '../data/portfolioData';
import { TiltCard3D } from './ui/TiltCard3D';

export function Projects() {
  return (
    <section id="projects" className="relative w-full py-24 md:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
              Featured <span className="text-gradient">Work</span>.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Selected projects demonstrating scalable architecture, modern frontend patterns, and AI integrations.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {PROJECTS_DATA.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: index * 0.1 }}
                className={`flex flex-col items-center gap-8 md:gap-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Image Container with Double-Bezel and 3D Tilt */}
                <div className="w-full lg:w-3/5">
                  <TiltCard3D scaleOnHover={1.03}>
                    <div className="bezel-shell group relative overflow-hidden">
                      <div className="bezel-core aspect-video w-full">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-ui)] group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </div>
                  </TiltCard3D>
                </div>

                {/* Content */}
                <div className="flex w-full flex-col justify-center lg:w-2/5">
                  <h3 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  
                  <div className="mb-8 flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="group btn-island-primary px-5 py-2">
                        <span>Live Demo</span>
                        <div className="btn-icon-wrapper h-6 w-6">
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </div>
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code on GitHub`} className="group flex items-center justify-center rounded-full border border-zinc-200 bg-transparent p-3 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">
                        <Github className="h-5 w-5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explore More Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mt-24 flex justify-center"
        >
          <a href={PROFILE_DATA.contact.github} target="_blank" rel="noreferrer" className="bezel-shell group flex w-full max-w-2xl items-center justify-between transition-transform duration-500 hover:scale-[1.02]">
            <div className="bezel-core flex w-full items-center justify-between p-6 sm:p-8">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <Github className="h-6 w-6 text-zinc-900 dark:text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Explore More Projects</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">View my complete open-source contributions.</p>
                </div>
              </div>
              <ExternalLink className="h-6 w-6 text-zinc-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zinc-900 dark:group-hover:text-white" aria-hidden="true" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
