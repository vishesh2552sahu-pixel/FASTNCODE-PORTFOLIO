import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0066FF', '#ffffff', '#00e5ff']
      });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto glass p-6 md:p-16 rounded-[1.5rem] md:rounded-[2rem] border-zinc-800 shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
          >
            <div>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 uppercase">
                Let's Start a <br />
                <span className="text-brand-blue italic">Partnership.</span>
              </h2>
              <p className="text-zinc-500 mb-6 md:mb-8 text-sm md:text-base font-medium leading-relaxed">
                Ready to accelerate? Our team is standing by to turn your technical debt into a competitive advantage.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4 text-zinc-500 font-mono text-[10px] md:text-sm">
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
                  AVERAGE RESPONSE: 2 HOURS
                </div>
                <div className="flex items-center gap-3 md:gap-4 text-zinc-500 font-mono text-[10px] md:text-sm">
                  <div className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
                  GLOBAL DELIVERY READY
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="relative group">
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-zinc-800 py-3 md:py-4 outline-none focus:border-brand-blue transition-colors peer placeholder-transparent text-sm md:text-base"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <label className="absolute left-0 top-3 md:top-4 text-zinc-600 font-mono text-[10px] uppercase transition-all peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-brand-blue peer-focus:text-[9px] md:peer-focus:text-xs">
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-zinc-800 py-3 md:py-4 outline-none focus:border-brand-blue transition-colors peer placeholder-transparent text-sm md:text-base"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <label className="absolute left-0 top-3 md:top-4 text-zinc-600 font-mono text-[10px] uppercase transition-all peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-brand-blue peer-focus:text-[9px] md:peer-focus:text-xs">
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <textarea
                  required
                  rows={3}
                  placeholder="Brief Project Description"
                  className="w-full bg-transparent border-b border-zinc-800 py-3 md:py-4 outline-none focus:border-brand-blue transition-colors peer placeholder-transparent resize-none text-sm md:text-base"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <label className="absolute left-0 top-3 md:top-4 text-zinc-600 font-mono text-[10px] uppercase transition-all peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-brand-blue peer-focus:text-[9px] md:peer-focus:text-xs">
                  Message
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 md:py-6 bg-brand-blue text-white font-black uppercase tracking-widest text-[11px] md:text-sm rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,102,255,0.3)]"
              >
                Send Request <Send size={14} className="md:w-4 md:h-4" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 md:py-20 text-center"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-blue rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_50px_rgba(0,102,255,0.5)]">
              <CheckCircle2 size={32} className="text-white md:hidden" />
              <CheckCircle2 size={48} className="text-white hidden md:block" />
            </div>
            <h3 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 uppercase">Submission Received</h3>
            <p className="text-zinc-500 max-w-sm text-sm md:text-base font-medium">
              We've received your inquiry and our engineering leads are reviewing it. Expect a response shortly.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-8 md:mt-12 text-brand-blue font-mono text-[10px] md:text-xs uppercase tracking-widest hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;