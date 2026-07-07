import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, Code, Award } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

interface PortfolioProps {
  isDedicatedPage?: boolean;
  onNavigate?: (path: string) => void;
}

export default function Portfolio({ isDedicatedPage = false, onNavigate }: PortfolioProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section
      id="portfolio"
      className={`relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ${
        isDedicatedPage ? 'pt-32 pb-24' : 'py-24'
      }`}
    >
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-blue-600/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative text-left">
        {/* Back navigation button if on dedicated page */}
        {isDedicatedPage && onNavigate && (
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 mb-8 transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
          </button>
        )}
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
            02 / Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white">
            Proven commercial systems <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">delivered to world-class brands</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-4 max-w-xl">
            Explore our curated catalog of production-ready, highly functional web assets deployed across multiple commercial sectors.
          </p>
        </div>

        {/* Portfolio Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-white/5 p-4.5 rounded-3xl border border-slate-200/50 dark:border-white/10 hover:border-blue-500/15 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
              {/* Image Showcase Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-900 group">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Category overlay */}
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-mono text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                  {project.category}
                </span>
              </div>

              {/* Card Info */}
              <div className="flex-1 flex flex-col justify-between px-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {project.clientName}
                  </span>
                  <h3 className="text-base font-bold font-sans text-slate-950 dark:text-slate-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Highlight Stat pill */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/5 dark:bg-blue-500/5 border border-blue-500/10 mb-5 max-w-fit">
                  <Award className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    {project.stats.value} {project.stats.label}
                  </span>
                </div>

                {/* Actions Area */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-900/60 mt-auto">
                  <button
                    className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(project);
                    }}
                  >
                    Project Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-3xl max-w-2xl w-full shadow-2xl text-left overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer z-10"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Scrollable container */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                
                {/* Image Display */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-sm text-white font-mono text-[9px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-md">
                    {activeProject.category}
                  </span>
                </div>

                {/* Heading */}
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                    {activeProject.clientName}
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold font-sans text-slate-950 dark:text-slate-100 mt-1">
                    {activeProject.title}
                  </h3>
                </div>

                {/* Dynamic Stats Banner */}
                <div className="grid grid-cols-2 gap-4 bg-blue-500/5 dark:bg-white/5 border border-blue-500/10 dark:border-white/10 p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">DELIVERED METRICS</span>
                    <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                      {activeProject.stats.value}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">IMPACT SCOPE</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {activeProject.stats.label}
                    </span>
                  </div>
                </div>

                {/* Project details description */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-slate-100">
                    Project Architecture:
                    </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {activeProject.details}
                  </p>
                </div>

                {/* Technologies Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-slate-100 mb-3 flex items-center gap-1.5">
                    <Code className="h-4 w-4 text-blue-500" />
                    Technology Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#0a0a0a] border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct action links */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-slate-100 dark:border-white/10">
                  <a
                    href={activeProject.liveUrl}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-blue-500 text-white transition-colors text-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Demo Mode: Navigating to live prototype of ${activeProject.title}`);
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                  <a
                    href={activeProject.githubUrl}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Code Access: GitHub repository is set to private by client request.`);
                    }}
                  >
                    <Github className="h-4 w-4" />
                    View Source
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
