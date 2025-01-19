import { motion } from 'framer-motion';
import type { SVGProps, ComponentType } from 'react';

interface Props {
  Logo: ComponentType<SVGProps<SVGSVGElement> & { class?: string }>;
}

export default function AnimatedLanding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1.5
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
      >
        <Logo 
          className="w-[clamp(300px,80vw,800px)] h-auto text-white/90 hover:text-white transition-colors duration-300"
          aria-label="Thrive Logo"
        />
      </motion.div>
      
      <motion.div 
        className="mt-12 space-y-4 text-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.5
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
          We're building something amazing. Stay tuned for our launch.
        </p>
      </motion.div>
    </div>
  );
} 