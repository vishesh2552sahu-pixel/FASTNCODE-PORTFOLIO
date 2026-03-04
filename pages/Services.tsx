
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const detailedServices = [
  {
    id: 'service-web',
    displayId: '01',
    title: 'High-Performance Web',
    description: 'We construct digital interfaces that set global benchmarks for speed and fluid motion. Our stack prioritizes sub-second Time-to-Interactive (TTI) and zero-jank animations using hardware-accelerated rendering.',
    tech: ['Next.js 15', 'Three.js / WebGL', 'Framer Motion', 'React Server Components'],
    outcomes: [
      'Core Web Vitals (All Green)',
      'Immersive 3D Experience Integration',
      'Scalable Design Systems',
      'Advanced State Management'
    ]
  },
  {
    id: 'service-distributed',
    displayId: '02',
    title: 'Distributed Systems',
    description: 'Our backend engineering focus is on extreme horizontal scalability and low-latency data propagation. We engineer mission-critical systems capable of handling millions of concurrent events.',
    tech: ['Go (Golang)', 'Rust', 'gRPC / Protobuf', 'PostgreSQL / Redis'],
    outcomes: [
      'Microservices Architecture',
      'Real-time Data Streaming',
      'Zero-Downtime Migration',
      'High-Availability Clustering'
    ]
  },
  {
    id: 'service-design',
    displayId: '03',
    title: 'Product Design',
    description: 'Design is not just visual; it is the logic of interaction. We merge minimalist aesthetics with high-utility UX patterns to build products that feel intuitive from the first click.',
    tech: ['Figma Engineering', 'Motion Prototyping', 'Accessibility Compliance', 'User Psychology'],
    outcomes: [
      'Bespoke Visual Identities',
      'Conversion-Optimized Funnels',
      'Intuitive Dashboard UX',
      'Atomic Design Systems'
    ]
  },
  {
    id: 'service-cloud',
    displayId: '04',
    title: 'Cloud Infrastructure',
    description: 'We provide the foundational bedrock for high-growth tech. Our Multi-Cloud strategy leverages automated scaling and security hardening to ensure your application is indestructible.',
    tech: ['AWS / GCP', 'Kubernetes (EKS/GKE)', 'Terraform / IaC', 'GitHub Actions / CI/CD'],
    outcomes: [
      'Infrastructure as Code (IaC)',
      'Automated Scaling Protocols',
      'SOC2 Ready Environments',
      'Edge Computing Deployment'
    ]
  }
];

interface ServicesProps {
  targetedId?: string | null;
}

const Services: React.FC<ServicesProps> = ({ targetedId }) => {
  useEffect(() => {
    if (targetedId) {
      const element = document.getElementById(targetedId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [targetedId]);

  return (
    <div className="px-fluid py-fluid-section min-h-screen max-w-7xl mx-auto w-full">
      <header className="mb-24 md:mb-40">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-brand-blue text-[10px] md:text-xs uppercase tracking-[0.6em] mb-8 block font-black"
        >
          SERVICE VERTICALS // STACK_2025
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="text-fluid-h1 font-black tracking-tighter leading-[0.85] uppercase"
        >
          Engineering <br /><span className="shimmer-text italic">Detail.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="mt-10 md:mt-14 text-zinc-500 text-lg md:text-2xl max-w-2xl font-medium leading-relaxed text-pretty"
        >
          A comprehensive breakdown of our technical core. We eliminate friction by deploying elite architectural patterns across every vertical.
        </motion.p>
      </header>

      <section className="space-y-24 md:space-y-64">
        {detailedServices.map((service, idx) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-zinc-900 pt-12 md:pt-24 scroll-mt-24 md:scroll-mt-32 transition-colors duration-1000 ${targetedId === service.id ? 'bg-brand-blue/[0.03]' : ''}`}
          >
            <div className="md:col-span-1 pt-2">
              <span className="font-mono text-brand-blue text-lg md:text-xl font-black">{service.displayId}</span>
            </div>
            
            <div className="md:col-span-5">
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-12 leading-tight">
                {service.title}
              </h2>
              <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                {service.tech.map((t) => (
                  <span key={t} className="px-3 md:px-4 py-1.5 md:py-2 bg-zinc-900/50 text-zinc-400 font-mono text-[8px] md:text-[10px] uppercase tracking-widest rounded-lg border border-zinc-800 backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-6">
              <p className="text-zinc-400 text-base md:text-xl font-medium leading-relaxed mb-10 md:mb-16 text-pretty">
                {service.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 md:gap-y-10 gap-x-8 md:gap-x-12">
                {service.outcomes.map((outcome) => (
                  <div key={outcome} className="group">
                    <div className="flex items-center gap-3 md:gap-4 text-zinc-100 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-black group-hover:text-brand-blue transition-colors">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-blue rounded-full shadow-[0_0_15px_rgba(0,102,255,0.6)]" />
                      {outcome}
                    </div>
                    <div className="mt-2 md:mt-3 h-[1px] w-0 group-hover:w-full bg-brand-blue transition-all duration-700 opacity-30" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="mt-24 md:mt-64 text-center py-16 md:py-48 border-y border-zinc-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h3 className="text-3xl md:text-7xl font-black tracking-tighter uppercase mb-10 md:mb-16 px-6 leading-tight">
            The <span className="italic text-zinc-800">Standard</span> is Perfection.
          </h3>
          <p className="text-zinc-500 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 md:mb-24 font-medium text-pretty px-6">
            Our methodology is defined by transparency, extreme technical rigor, and an obsession with hardware-accelerated rendering and sub-pixel perfection.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-24 lg:gap-32 px-6">
            {[
              { l: 'LATENCY', v: '< 50MS' },
              { l: 'UPTIME', v: '99.99%' },
              { l: 'FPS', v: '120 HZ' }
            ].map(stat => (
              <div key={stat.l} className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-2 md:mb-3">{stat.v}</span>
                <span className="font-mono text-[8px] md:text-[11px] text-brand-blue tracking-[0.4em] md:tracking-[0.5em] uppercase font-black">{stat.l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
