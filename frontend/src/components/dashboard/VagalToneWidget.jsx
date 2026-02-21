import React, { useState, useEffect } from 'react';
import { Activity, Wind, ShieldCheck } from 'lucide-react';
import { useAegisTelemetry } from '../../hooks/useAegisTelemetry';

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

  // CSS classes for the dramatic "stres" effect
  const cardBorder = isStressed && !isMeditating
    ? 'border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
    : 'border-slate-200 shadow-sm';

  const titleColor = isStressed && !isMeditating ? 'text-red-500' : 'text-cyan-600';

  return (
    <div className={`rounded-2xl p-6 bg-white transition-all duration-700 border-2 ${cardBorder} relative overflow-hidden`}>
      
      {/* Background stress texturing */}
      {isStressed && !isMeditating && (
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDIgMk0wIDJMMiAwIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] mix-blend-overlay"></div>
      )}

      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className={`text-xl font-bold font-display transition-colors duration-500 ${titleColor}`}>
            Vagal Tone Control
          </h3>
          <p className="text-sm text-slate-500">Real-time nervous system biofeedback</p>
        </div>
        {!isMeditating && (
          <Activity className={`w-6 h-6 transition-colors duration-500 ${titleColor}`} />
        )}
      </div>

      {!isMeditating ? (
        <div className="flex flex-col items-center justify-center py-4 relative z-10">
          <div className="text-5xl font-bold text-slate-800 mb-2">
            {Math.round(currentErraticism)}<span className="text-2xl text-slate-400">/100</span>
          </div>
          <p className="text-sm text-slate-500 mb-6 uppercase tracking-widest">
            Cognitive Friction
          </p>

          {isStressed ? (
            <button
              onClick={() => setIsMeditating(true)}
              className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 transition-all flex items-center"
            >
              <Wind className="w-5 h-5 mr-2" />
              Initiate Vagal Reset
            </button>
          ) : (
            <div className="px-6 py-3 bg-cyan-50 text-cyan-600 font-medium rounded-xl border border-cyan-100 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2" />
              Optimal Regulation
            </div>
          )}
        </div>
      ) : (
        // Breathing Mode Active
        <div className="flex flex-col items-center justify-center py-6 relative z-10">
          <div className="relative w-32 h-32 flex items-center justify-center mb-8">
            {/* The breathing orb */}
            <div 
              className={`absolute rounded-full bg-cyan-400/20 blur-xl transition-all duration-[4000ms] ease-in-out
                ${breathePhase === 'Inhale' ? 'w-48 h-48 opacity-100' : ''}
                ${breathePhase === 'Hold' ? 'w-48 h-48 opacity-80' : ''}
                ${breathePhase === 'Exhale' ? 'w-16 h-16 opacity-40' : ''}
              `} 
            />
            <div 
              className={`absolute rounded-full border border-cyan-400 transition-all duration-[4000ms] ease-in-out
                ${breathePhase === 'Inhale' ? 'w-32 h-32' : ''}
                ${breathePhase === 'Hold' ? 'w-32 h-32 border-cyan-300' : ''}
                ${breathePhase === 'Exhale' ? 'w-12 h-12 border-cyan-600' : ''}
              `} 
            />
            <span className="text-cyan-600 font-bold tracking-widest uppercase z-10 animate-pulse">
              {breathePhase}
            </span>
          </div>
          <button
            onClick={() => { setIsMeditating(false); setManualOverride(null); }}
            className="text-xs text-slate-400 hover:text-slate-600 uppercase tracking-widest"
          >
            End Session
          </button>
        </div>
      )}

    </div>
  );
};

export default VagalToneWidget;
