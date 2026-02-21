import React, { useEffect, useState, useRef } from 'react';
import { useAegisTelemetry } from '../../hooks/useAegisTelemetry';
import { BellOff } from 'lucide-react';

const AegisOverlay = () => {
  const { telemetry } = useAegisTelemetry();
  const [audioPlayed, setAudioPlayed] = useState(false);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (telemetry.crash_imminent) {
      // Start Aegis Protocol
      if (!audioPlayed) {
        // Must be called after user interaction usually, but let's try
        try {
          playBinauralBeat();
          playVoicePrompt();
        } catch(e) {
          console.error("Audio playback failed", e);
        }
        setAudioPlayed(true);
      }
    } else {
      // Stop Aegis Protocol
      stopAudio();
      setAudioPlayed(false);
    }
    
    return () => {
      // Cleanup on unmount
      if (audioCtxRef.current) {
         stopAudio();
      }
    }
  }, [telemetry.crash_imminent, audioPlayed]);

  const playBinauralBeat = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    // Left ear 200Hz, Right ear 240Hz -> 40Hz binaural beat
    const leftOsc = ctx.createOscillator();
    const rightOsc = ctx.createOscillator();
    const leftPan = ctx.createStereoPanner();
    const rightPan = ctx.createStereoPanner();
    const gainNode = ctx.createGain();

    leftOsc.type = 'sine';
    rightOsc.type = 'sine';
    leftOsc.frequency.value = 200;
    rightOsc.frequency.value = 240;

    leftPan.pan.value = -1;
    rightPan.pan.value = 1;

    gainNode.gain.value = 0.05; // Soothing low volume

    leftOsc.connect(leftPan);
    rightOsc.connect(rightPan);
    leftPan.connect(gainNode);
    rightPan.connect(gainNode);
    gainNode.connect(ctx.destination);

    leftOsc.start();
    rightOsc.start();

    // Store nodes to stop them later
    audioCtxRef.current.nodes = { leftOsc, rightOsc, gainNode };
  };

  const playVoicePrompt = () => {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance("Aegis Intervention active. Please take a 5-minute reset.");
        msg.rate = 0.85; // Soothing pace
        msg.pitch = 0.9;
        window.speechSynthesis.speak(msg);
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current?.nodes) {
      const { leftOsc, rightOsc, gainNode } = audioCtxRef.current.nodes;
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        try { leftOsc.stop(); rightOsc.stop(); } catch(err){ console.log(err); }
      }, 1000);
      audioCtxRef.current.nodes = null;
    }
  };

  if (!telemetry.crash_imminent) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none transition-colors duration-1000 bg-amber-500/30 flex flex-col items-center justify-center backdrop-blur-[2px]">
      <div className="bg-white/95 p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-pulse pointer-events-auto border-2 border-amber-200">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <BellOff className="w-10 h-10 text-amber-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">Aegis Protocol Engaged</h2>
        <p className="text-gray-600 text-center max-w-md text-lg leading-relaxed mb-6">
          Elevated keystroke erraticism and flattened vocal cadence detected. 
          <br/><br/>
          <span className="font-semibold text-amber-700">The environment has been adjusted.</span> Slack & Teams are on Do Not Disturb.
          <br/><br/>
          Please take a 5-minute reset.
        </p>
      </div>
    </div>
  );
};

export default AegisOverlay;
