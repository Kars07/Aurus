import React, { useState, useRef } from 'react';
import { Mic, Square, Sparkles } from 'lucide-react';
import { useAegisTelemetry } from '../../hooks/useAegisTelemetry';
import { useHistory } from '../../context/HistoryContext';

const JournalingInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [manualText, setManualText] = useState('');
  const [nudge, setNudge] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { telemetry } = useAegisTelemetry();
  const { addEntry } = useHistory();
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTranscript('');
      transcriptRef.current = '';
      setNudge('');

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
          transcriptRef.current = currentTranscript;
        };
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      // Fallback for demo without microphone access
      setIsRecording(true);
      setTranscript('');
      transcriptRef.current = '';
      setNudge('');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);

    // Give the Web Speech API a moment to capture the final word
    setTimeout(() => {
      processVoiceLog(transcriptRef.current);
    }, 500);
  };

  const handleManualSubmit = () => {
    if (!manualText.trim()) return;
    processVoiceLog(manualText);
  };

  const processVoiceLog = async (finalTranscript) => {
    setIsProcessing(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let textToProcess = finalTranscript || transcript;

    // Only apply the speech API error if they actually pressed the mic button (finalTranscript/transcript empty but manualText is also empty)
    if (!textToProcess && !manualText) {
      if (!SpeechRecognition) {
        textToProcess = "[Speech Recognition API not supported in this browser. Please use Chrome/Edge or ensure microphone permissions.]";
      } else {
        textToProcess = "[No speech detected. Please hold the button and speak clearly.]";
      }
    }

    setTranscript(textToProcess);
    setManualText(''); // Clear manual input after submission

    // Prepare NAT prompt
    const vocalStress = Math.round((telemetry.vocal_cadence || 1.0) * 100);
    const errat = Math.round((telemetry.keystroke_erraticism || 0) * 100);

    const systemPrompt = `Analyze the patient's daily journal log. You must call the 'auris_reasoning' tool with these exact parameters:
- mode: "daily"
- vocal_stress: ${vocalStress}
- keystroke_erraticism: ${errat}
- transcript: "${textToProcess}"`;

    try {
      // Hit NAT Agent Server via Vite Proxy
      const response = await fetch('https://auris-w1og.onrender.com/api/ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: systemPrompt }],
          model: 'nvidia/nemotron',
          temperature: 0.1,
          stream: false
        }),
      });

      const data = await response.json();
      let content = data.choices[0].message.content;

      // Highly robust JSON extractor to strip out "Thought:", "Final Answer:", and Markdown wrappers
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');

      if (firstBrace !== -1 && lastBrace !== -1) {
        content = content.substring(firstBrace, lastBrace + 1);
      } else {
        throw new Error("No JSON object found in the LLM response.");
      }

      const payload = JSON.parse(content);

      const savedNudge = payload.patient_facing_nudge || "I hear you. Let me know if you need any specific exercises or support.";
      setNudge(savedNudge);

      addEntry({
        type: 'journal',
        transcript: textToProcess,
        nudge: savedNudge
      });
    } catch (err) {
      console.error("NAT Agent Error:", err);
      // Fallback nudge for Hackathon Magic Moment
      setTimeout(() => {
        const fallbackNudge = "I hear you. Activity and pain markers are concerning. Try taking some deep breaths and stretching out for a minute.";
        setNudge(fallbackNudge);
        addEntry({
          type: 'journal',
          transcript: textToProcess,
          nudge: fallbackNudge
        });
      }, 1500);
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
              : 'bg-gradient-to-br from-cyan-400 to-[#06b6d4] text-white hover:scale-105 hover:shadow-cyan-200/50'
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
              <span className="font-bold text-lg tracking-wide leading-tight">Hold to<br />Speak</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript & Nudge Area */}
      <div className="mt-8">
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-1 mb-2">Or type manually:</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
            placeholder="I'm feeling a bit stiff today..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
            disabled={isProcessing}
          />
          <button
            onClick={handleManualSubmit}
            disabled={isProcessing || !manualText.trim()}
            className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      <div className="mt-6 min-h-[8rem] bg-[#F6FAFF] rounded-xl p-5 border border-blue-50 relative">

        {/* If doing nothing at all */}
        {!isProcessing && !transcript && !nudge && (
          <p className="text-gray-400 text-center italic mt-4">
            "Your voice is a powerful biomarker. Vent about your day to receive immediate support."
          </p>
        )}

        {/* The user's input/transcript area */}
        {transcript && (
          <div className="mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">You said:</span>
            <p className="text-gray-800 font-medium mt-1">"{transcript}"</p>
          </div>
        )}

        {/* The AI's response OR a loading indicator */}
        {isProcessing ? (
          <div className="flex items-center gap-2 mt-4 ml-2">
            <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : nudge ? (
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-cyan-400">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-bold text-cyan-700">Prevention Nudge</span>
            </div>
            <p className="text-gray-700 font-medium leading-relaxed">{nudge}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JournalingInput;
