import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: "NEON VELOCITY",
    category: "Automotive Platform",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200",
    tags: ["React", "ThreeJS", "Go"],
    description: "Hardware-accelerated rendering platform for high-performance automotive data visualization."
  },
  {
    title: "QUANTUM VAULT",
    category: "L1 Infrastructure",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    tags: ["Web3", "Solidity", "Next.js"],
    description: "Institutional-grade digital asset security with multi-signature verification protocols."
  },
  {
    title: "ORBITAL OS",
    category: "SaaS Dashboard",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    tags: ["Typescript", "D3.js", "Rust"],
    description: "Real-time satellite telemetry dashboard built for massive data throughput."
  },
  {
    title: "CYBER CORE",
    category: "Enterprise AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=1200",
    tags: ["Python", "TensorFlow", "React"],
    description: "Neural network analysis engine for predictive supply chain management."
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const springY = useSpring(y, { stiffness: 60, damping: 25 });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative w-full"
    >
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ 
          y: isHovered ? -10 : 0
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="group relative w-full overflow-hidden rounded-[2rem] md:rounded-[3.5rem] border border-zinc-900 bg-zinc-950/40 backdrop-blur-xl transition-colors duration-700 hover:border-brand-blue/30"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-[2rem] md:rounded-[3.5rem] border-[1.5px] border-brand-blue/40 pointer-events-none z-10 shadow-[inset_0_0_60px_rgba(0,102,255,0.1)] hidden md:block"
            />
          )}
        </AnimatePresence>

        <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10] overflow-hidden">
          <motion.img 
            style={{ y: springY }}
            animate={{ 
              scale: isHovered ? 1.08 : 1.02,
              filter: isHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.6)',
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            src={project.image} 
            alt={project.title} 
            className="h-[120%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-4 md:mb-10"
          >
            <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] mb-2 md:mb-4 block font-black text-brand-blue md:text-zinc-500 group-hover:text-brand-blue transition-colors">
              {project.category}
            </span>
            
            <h3 className="text-2xl sm:text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight md:leading-none text-white text-balance">
              {project.title}
            </h3>
            
            <p className="mt-4 text-zinc-400 font-medium text-xs md:text-base max-w-sm hidden sm:block opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              {project.description}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-3 md:px-5 py-1.5 md:py-2 glass rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-400 border border-white/5 group-hover:text-white group-hover:border-brand-blue/30 transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} />
      ))}
    </div>
  );
};

export default ProjectsSection;