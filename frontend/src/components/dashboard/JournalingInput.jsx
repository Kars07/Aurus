import React, { useState, useRef } from 'react';
import { Mic, Square, Sparkles } from 'lucide-react';
import { useAegisTelemetry } from '../../hooks/useAegisTelemetry';

const JournalingInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [nudge, setNudge] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { telemetry } = useAegisTelemetry();
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTranscript('');
      setNudge('');
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      // Fallback for demo without microphone access
      setIsRecording(true);
      setTranscript('');
      setNudge('');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    processVoiceLog();
  };

  const processVoiceLog = async () => {
    setIsProcessing(true);
    
    // Simulate user input for demo
    setTranscript("My lower back is killing me and I only got 4 hours of sleep.");

    try {
      // Try to hit real backend if available
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: "My lower back is killing me and I only got 4 hours of sleep.",
          telemetry: telemetry
        }),
      });
      const data = await response.json();
      setNudge(data.nudge || "Activity is low and pain is high. You are at risk for a pressure sore today. Here are 3 gentle seated torso twists you can do right now.");
    } catch {
      // Fallback nudge for Hackathon Magic Moment
      setTimeout(() => {
        setNudge("Activity is low and pain is high. You are at risk for a pressure sore today. Here are 3 gentle seated torso twists you can do right now.");
        setIsProcessing(false);
      }, 1500);
      return;
    }
    setIsProcessing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full healthcare-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">Daily Journal</h3>
        <div className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-semibold rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Empathetic AI Active
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[16rem]">
        {/* Massive Accessible Button */}
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={isRecording ? stopRecording : undefined}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          aria-label={isRecording ? "Stop Recording" : "Hold to Speak"}
          className={`
            w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300
            ${isRecording 
              ? 'bg-red-50 text-red-600 scale-95 border-4 border-red-200 animate-pulse' 
              : 'bg-gradient-to-br from-cyan-400 to-[#3835AC] text-white hover:scale-105 hover:shadow-cyan-200/50'
            }
            focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-offset-4
          `}
        >
          {isRecording ? (
            <>
              <Square className="w-12 h-12 mb-2 fill-current" />
              <span className="font-bold text-lg tracking-wide">Recording</span>
            </>
          ) : (
            <>
              <Mic className="w-12 h-12 mb-2" />
              <span className="font-bold text-lg tracking-wide leading-tight">Hold to<br/>Speak</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript & Nudge Area */}
      <div className="mt-6 min-h-[8rem] bg-[#F6FAFF] rounded-xl p-5 border border-blue-50">
        {isProcessing && (
          <div className="flex items-center justify-center h-full text-cyan-600 space-x-2">
           <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
           <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
           <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
        
        {!isProcessing && !transcript && !nudge && (
          <p className="text-gray-400 text-center italic mt-4">
            "Your voice is a powerful biomarker. Vent about your day to receive immediate support."
          </p>
        )}

        {transcript && (
          <div className="mb-4">
             <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">You said:</span>
             <p className="text-gray-800 font-medium mt-1">"{transcript}"</p>
          </div>
        )}

        {nudge && (
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-cyan-400">
             <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-bold text-cyan-700">Prevention Nudge</span>
             </div>
             <p className="text-gray-700 font-medium leading-relaxed">{nudge}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalingInput;
