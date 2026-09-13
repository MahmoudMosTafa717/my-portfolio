import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Maximize2, ExternalLink } from 'lucide-react';

export function VideoModal({ isOpen, onClose, videoSrc, title }) {
  const videoRef = useRef(null);

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

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 flex flex-col w-full max-w-4xl rounded-[2rem] bg-zinc-950 p-2 sm:p-3 ring-1 ring-white/15 shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} Demo Video`}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-zinc-900/90 rounded-[calc(2rem-0.5rem)] mb-2 border border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-plum/20 text-brand-plum">
                  <Play className="h-4 w-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {title} — Demo Video
                  </h3>
                  <span className="text-xs text-zinc-400">
                    Interactive Walkthrough
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleFullScreen}
                  className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
                <a
                  href={videoSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                  title="Open video in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close video"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Video Player Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[calc(2rem-0.5rem)] bg-zinc-900 shadow-inner">
              <iframe
                src={videoSrc}
                title={`${title} Demo Video`}
                className="h-full w-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
