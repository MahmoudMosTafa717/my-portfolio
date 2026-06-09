import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '../data/portfolioData';

const TIMELINE_DATA = [
  { ...EDUCATION_DATA[0], type: 'education', position: 'right', icon: GraduationCap }, // ITI
  { ...EXPERIENCE_DATA[0], type: 'experience', position: 'left', icon: Briefcase }, // Web Masters
  { ...EXPERIENCE_DATA[1], type: 'experience', position: 'left', icon: Briefcase }, // iSchool
  { ...EXPERIENCE_DATA[2], type: 'experience', position: 'left', icon: Briefcase }, // Outlier
  { ...EXPERIENCE_DATA[3], type: 'experience', position: 'left', icon: Briefcase }, // EELU Training
  { ...EDUCATION_DATA[1], type: 'education', position: 'right', icon: GraduationCap } // CS
];

function TimelineContent({ item, Icon }) {
  return (
    <>
      <div className="mb-2 text-sm font-semibold text-brand-plum">
        {item.period}
      </div>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-5 w-5 text-zinc-400" />
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-500">
          {item.role || item.degree}
        </h3>
      </div>
      <h4 className="text-md font-medium text-zinc-600 dark:text-zinc-400 mb-4 transition-colors duration-500">
        {item.company || item.institution}
      </h4>
      
      {item.points ? (
        <ul className="space-y-2">
          {item.points.map((point, i) => (
            <li key={i} className="text-zinc-600 dark:text-zinc-400 text-sm flex items-start gap-2 transition-colors duration-500">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors duration-500" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-zinc-600 dark:text-zinc-400 text-sm transition-colors duration-500">
          {item.details}
        </p>
      )}
    </>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative w-full py-24 md:py-32 lg:py-40 bg-zinc-50 dark:bg-zinc-950/50 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-zinc-900 dark:text-white transition-colors duration-500">
              Experience & <span className="text-gradient">Education</span>.
            </h2>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-5xl py-12">
          {/* The Central Line */}
          <div className="absolute left-6 md:left-1/2 top-8 bottom-8 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 transition-colors duration-500" />

          {TIMELINE_DATA.map((item, index) => {
            const isLeft = item.position === 'left';
            return (
              <div key={item.id + item.type} className={`relative flex flex-col md:flex-row md:items-center w-full mb-16 group ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                
                {/* The Dot */}
                <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900 transition-colors duration-500">
                  <div className="h-3 w-3 rounded-full bg-brand-plum transition-transform duration-300 group-hover:scale-150" />
                </div>

                {/* Empty Half (Desktop only) */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content Half */}
                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
                    className="bezel-shell w-full"
                  >
                    <div className="bezel-core p-6 text-left transition-colors duration-500">
                      <TimelineContent item={item} Icon={item.icon} />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
