import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, FileText, Loader2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export function CvModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const cv = PROFILE_DATA.contact.cv;
  const timerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setIsLoading(true);
      // Google Drive iframes don't always fire onLoad; hide spinner after 3s fallback
      timerRef.current = setTimeout(() => setIsLoading(false), 3000);
    } else {
      document.body.style.overflow = 'unset';
      clearTimeout(timerRef.current);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      clearTimeout(timerRef.current);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 flex flex-col w-full max-w-5xl h-[90vh] rounded-[2rem] bg-zinc-100 p-2 sm:p-3 ring-1 ring-zinc-200 shadow-2xl dark:bg-zinc-950 dark:ring-white/10"
            role="dialog"
            aria-modal="true"
            aria-label="Curriculum Vitae Preview"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-zinc-900 rounded-[calc(2rem-0.5rem)] mb-2 shadow-sm border border-zinc-200/60 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-plum/10 text-brand-plum dark:bg-brand-plum/20">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                    Mahmoud Mostafa Saber — CV
                  </h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Full-Stack Software Engineer
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={cv.download}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  title="Download PDF"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href={cv.view}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  title="Open in Google Drive"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Open Drive</span>
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close CV Modal"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer — Google Drive preview embed */}
            <div className="relative flex-1 w-full overflow-hidden rounded-[calc(2rem-0.5rem)] bg-zinc-900 shadow-inner">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-900 text-zinc-400 z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-plum" />
                  <p className="text-sm font-medium">Loading CV...</p>
                </div>
              )}
              <iframe
                src={cv.preview}
                title="Mahmoud Mostafa CV"
                className="w-full h-full border-0"
                onLoad={() => {
                  clearTimeout(timerRef.current);
                  setIsLoading(false);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
