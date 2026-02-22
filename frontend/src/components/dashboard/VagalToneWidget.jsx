import React, { useState, useEffect } from 'react';
import { Activity, Wind, ShieldCheck } from 'lucide-react';
import { useAegisTelemetry } from '../../hooks/useAegisTelemetry';
import { motion, AnimatePresence } from 'framer-motion';

const VagalToneWidget = () => {
  const { telemetry } = useAegisTelemetry();
  const [isMeditating, setIsMeditating] = useState(false);
  const [breathePhase, setBreathePhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [manualOverride, setManualOverride] = useState(null);

  // The erraticism score (simulated manual override for the demo effect)
  const currentErraticism = manualOverride !== null ? manualOverride : (telemetry.keystroke_erraticism || 0) * 100;
  const isStressed = currentErraticism > 60;

  useEffect(() => {
    let interval;
    if (isMeditating) {
      let cycle = 0;
      interval = setInterval(() => {
        cycle++;
        if (cycle % 3 === 0) setBreathePhase('Exhale');
        else if (cycle % 3 === 1) setBreathePhase('Inhale');
        else setBreathePhase('Hold');
        
        // Gradually lower the erraticism score as they breathe
        setManualOverride(prev => {
          const val = prev !== null ? prev : currentErraticism;
          return Math.max(10, val - 15);
        });

      }, 4000); // 4 seconds per phase

      // End meditation after 4 full cycles (48 seconds)
      setTimeout(() => {
        setIsMeditating(false);
        setBreathePhase('Inhale');
      }, 48000);
    }
    return () => clearInterval(interval);
  }, [isMeditating]);

  // CSS classes for the dramatic "stress" effect
  const cardBorder = isStressed && !isMeditating
    ? 'border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
    : 'border-slate-200 shadow-sm';

  const titleColor = isStressed && !isMeditating ? 'text-red-500' : 'text-cyan-600';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-6 bg-white transition-all duration-700 border-2 ${cardBorder} relative overflow-hidden h-full`}
    >
      
      {/* Background stress texturing */}
      <AnimatePresence>
        {isStressed && !isMeditating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDIgMk0wIDJMMiAwIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className={`text-xl font-bold font-display transition-colors duration-500 ${titleColor}`}>
            Vagal Tone Control
          </h3>
          <p className="text-sm text-slate-500 font-medium">Real-time nervous system biofeedback</p>
        </div>
        {!isMeditating && (
           <motion.div 
              animate={isStressed ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5, repeat: isStressed ? Infinity : 0 }}
           >
             <Activity className={`w-6 h-6 transition-colors duration-500 ${titleColor}`} />
           </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isMeditating ? (
          <motion.div 
             key="default-mode"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
             className="flex flex-col items-center justify-center py-4 relative z-10"
          >
            <motion.div 
              key={Math.round(currentErraticism)}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-slate-800 mb-2 drop-shadow-sm"
            >
              {Math.round(currentErraticism)}<span className="text-2xl font-bold text-slate-400">/100</span>
            </motion.div>
            <p className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">
              Cognitive Friction
            </p>

            {isStressed ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMeditating(true)}
                className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 transition-all flex items-center shadow-sm"
              >
                <Wind className="w-5 h-5 mr-2" />
                Initiate Vagal Reset
              </motion.button>
            ) : (
              <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="px-6 py-3 bg-cyan-50 text-cyan-600 font-bold rounded-xl border border-cyan-100 flex items-center shadow-sm"
              >
                <ShieldCheck className="w-5 h-5 mr-2" />
                Optimal Regulation
              </motion.div>
            )}
          </motion.div>
        ) : (
          // Breathing Mode Active
          <motion.div 
             key="breathing-mode"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="flex flex-col items-center justify-center py-6 relative z-10"
          >
            <div className="relative w-32 h-32 flex items-center justify-center mb-8">
              {/* Outer Glow Orb */}
              <motion.div 
                animate={{
                  scale: breathePhase === 'Inhale' ? 1.5 : breathePhase === 'Hold' ? 1.5 : 0.5,
                  opacity: breathePhase === 'Inhale' ? 1 : breathePhase === 'Hold' ? 0.8 : 0.4
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="absolute w-32 h-32 rounded-full bg-cyan-400/20 blur-xl"
              />
              
              {/* Inner Solid Ring */}
              <motion.div 
                animate={{
                  scale: breathePhase === 'Inhale' ? 1 : breathePhase === 'Hold' ? 1 : 0.375,
                  borderColor: breathePhase === 'Hold' ? '#67e8f9' : breathePhase === 'Exhale' ? '#0891b2' : '#22d3ee'
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="absolute w-32 h-32 rounded-full border-2 border-cyan-400"
              />
              
              <motion.span 
                 key={breathePhase}
                 initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                 className="text-cyan-600 font-black tracking-widest uppercase z-10 shadow-cyan-100 drop-shadow-md"
              >
                {breathePhase}
              </motion.span>
            </div>
            <button
              onClick={() => { setIsMeditating(false); setManualOverride(null); }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
            >
              End Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default VagalToneWidget;
