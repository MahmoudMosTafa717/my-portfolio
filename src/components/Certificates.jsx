import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink, Eye, X, Download, Calendar } from 'lucide-react';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import { TiltCard3D } from './ui/TiltCard3D';

function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 flex flex-col w-full max-w-4xl max-h-[92vh] rounded-[2rem] bg-zinc-100 p-3 sm:p-4 ring-1 ring-zinc-200 shadow-2xl dark:bg-zinc-950 dark:ring-white/10"
          role="dialog"
          aria-modal="true"
          aria-label={certificate.title}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-zinc-900 rounded-[calc(2rem-0.5rem)] mb-3 shadow-sm border border-zinc-200/60 dark:border-zinc-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-plum/10 text-brand-plum dark:bg-brand-plum/20">
                <Award className="h-5 w-5" />
              </div>
              <div className="truncate">
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white truncate">
                  {certificate.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {certificate.issuer} • {certificate.level}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {certificate.verificationUrl && (
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  title="Verify on Issuer Website"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Verify</span>
                </a>
              )}
              <a
                href={certificate.fallbackImage || certificate.image}
                download
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                title="Download High-Res Image"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Image</span>
              </a>
              <button
                onClick={onClose}
                aria-label="Close Certificate Preview"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative flex-1 overflow-auto rounded-[calc(2rem-0.5rem)] bg-zinc-900/5 dark:bg-black/50 p-2 sm:p-4 flex items-center justify-center">
            <picture>
              <source srcSet={certificate.image} type="image/webp" />
              <img
                src={certificate.fallbackImage || certificate.image}
                alt={certificate.title}
                className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-md"
              />
            </picture>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="relative w-full py-24 md:py-32 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-brand-plum/10 text-brand-plum text-xs font-bold tracking-wide uppercase dark:bg-brand-plum/20">
              <Award className="h-3.5 w-3.5" />
              Credentials & Proficiency
            </div>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-zinc-900 dark:text-white transition-colors duration-500">
              Licenses & <span className="text-gradient">Certifications</span>.
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              Standardized language masteries and verified qualifications validating global communication readiness.
            </p>
          </motion.div>
        </div>

        {/* Certificates Grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CERTIFICATES_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: index * 0.15 }}
              className="flex flex-col"
            >
              <TiltCard3D scaleOnHover={1.02} className="h-full">
                <div className="bezel-shell h-full flex flex-col group overflow-hidden">
                  <div className="bezel-core h-full flex flex-col p-6 sm:p-7 justify-between transition-colors duration-500">
                    
                    {/* Top: Image Thumbnail with Hover Overlay */}
                    <div>
                      <div 
                        onClick={() => setSelectedCert(cert)}
                        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-6 cursor-pointer group/img shadow-inner"
                      >
                        <picture>
                          <source srcSet={cert.image} type="image/webp" />
                          <img
                            src={cert.fallbackImage || cert.image}
                            alt={cert.title}
                            width="600"
                            height="450"
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-ui)] group-hover/img:scale-105"
                          />
                        </picture>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                          <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold shadow-lg">
                            <Eye className="h-4 w-4" />
                            Click to Enlarge
                          </span>
                        </div>
                      </div>

                      {/* Header Badge & Level */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${cert.badgeColor} shadow-sm`}>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {cert.level}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                          <Calendar className="h-3.5 w-3.5" />
                          {cert.date}
                        </div>
                      </div>

                      {/* Title & Issuer */}
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-500 mb-1">
                        {cert.title}
                      </h3>
                      <h4 className="text-sm font-semibold text-brand-plum mb-4">
                        {cert.issuer}
                      </h4>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-800 hover:text-brand-plum dark:text-zinc-200 dark:hover:text-brand-plum transition-colors cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Preview Certificate
                      </button>

                      {cert.verificationUrl ? (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-plum hover:underline"
                        >
                          Verify Credential
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                          Verified C2 Score
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}
