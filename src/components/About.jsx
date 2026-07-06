import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { PROFILE_DATA } from '../data/portfolioData';

function AnimatedCounter({ value }) {
  const numMatch = value.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(num.toString(), '');

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    duration: 2500, // 2.5 seconds
    bounce: 0,
    ease: [0.23, 1, 0.32, 1]
  });

  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (inView) {
      springValue.set(num);
    }
  }, [inView, num, springValue]);

  return (
    <span ref={ref} className="inline-flex">
      <motion.span>{displayValue}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="bezel-shell mx-auto max-w-5xl"
        >
          <div className="bezel-core p-8 md:p-12 lg:p-16 transition-colors duration-500">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              
              {/* Text Content */}
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-zinc-900 dark:text-white transition-colors duration-500">
                  Engineering at the intersection of <span className="text-gradient">performance</span> and <span className="text-gradient">design</span>.
                </h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 transition-colors duration-500">
                  {PROFILE_DATA.intro}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {PROFILE_DATA.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col justify-center rounded-2xl border border-zinc-200 bg-white/50 p-4 sm:p-6 dark:border-zinc-800/50 dark:bg-zinc-950/50 transition-colors duration-500 shadow-sm"
                  >
                    <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-500">
                      <AnimatedCounter value={stat.value} />
                    </span>
                    <span className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-colors duration-500">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
