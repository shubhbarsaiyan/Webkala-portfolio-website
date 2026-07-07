import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 500); // Wait for fade exit
          }, 400);
          return 100;
        }
        // Random increase for natural progress effect
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-900"
        >
          {/* Ambient Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative flex flex-col items-center max-w-sm px-6 w-full text-center">
            {/* Animated Brand Symbol */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-4 h-28 flex items-center justify-center"
            >
              <img 
                src="/logo_full.png" 
                alt="Webकला Logo" 
                className="h-full w-auto object-contain"
              />
            </motion.div>

            {/* Progress Container */}
            <div className="w-full h-[3px] bg-slate-100 rounded-full mt-10 overflow-hidden border border-slate-200">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.span
              className="text-xs font-mono text-blue-600 mt-3 tracking-wider font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
