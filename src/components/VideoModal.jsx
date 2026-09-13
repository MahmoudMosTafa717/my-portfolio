import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Maximize2, ExternalLink } from 'lucide-react';

export function VideoModal({ isOpen, onClose, videoSrc, title }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 flex flex-col w-full max-w-4xl max-h-[90vh] rounded-2xl sm:rounded-[2rem] bg-zinc-950 p-1.5 sm:p-3 ring-1 ring-white/15 shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} Demo Video`}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-zinc-900/90 rounded-xl sm:rounded-[calc(2rem-0.5rem)] mb-1.5 sm:mb-2 border border-zinc-800 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-brand-plum/20 text-brand-plum">
                  <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                    {title} — Demo Video
                  </h3>
                  <span className="text-[10px] sm:text-xs text-zinc-400 hidden xs:inline">
                    Interactive Walkthrough
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={videoSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-zinc-800 bg-zinc-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                  title="Open video in new tab"
                >
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close video"
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>

            {/* Video Player — flex-1 fills remaining height; aspect-video enforced via padding trick on mobile */}
            <div className="relative flex-1 min-h-0 overflow-hidden rounded-xl sm:rounded-[calc(2rem-0.5rem)] bg-zinc-900 shadow-inner">
              {/* 16:9 padding trick so video never overflows on tiny screens */}
              <div className="w-full h-full" style={{ aspectRatio: '16/9', maxHeight: '100%' }}>
                <iframe
                  src={videoSrc}
                  title={`${title} Demo Video`}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
