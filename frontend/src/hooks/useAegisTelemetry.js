import { useState, useEffect, useCallback, useRef } from 'react';

const WEBSOCKET_URL = import.meta.env.VITE_WS_URL || 'wss://auris-1-82up.onrender.com/ws/telemetry';

export const useAegisTelemetry = () => {
  const [telemetry, setTelemetry] = useState({
    baseline_stress: 0,
    keystroke_erraticism: 0,
    vocal_cadence: 1.0,
    overall_stress_index: 0,
    crash_imminent: false,
    timestamp: null
  });
  const [isConnected, setIsConnected] = useState(false);
  const [interventionsCount, setInterventionsCount] = useState(0);

  const wsRef = useRef(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    wsRef.current = new WebSocket(WEBSOCKET_URL);

    wsRef.current.onopen = () => {
      console.log('Connected to Aegis Telemetry WebSocket');
      setIsConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'telemetry_update') {
          const payload = data.payload;
          
          setTelemetry(prev => {
            // Track if we just crossed into imminent crash
            if (payload.crash_imminent && !prev.crash_imminent) {
              setInterventionsCount(c => c + 1);
            }
            return payload;
          });
        }
      } catch (err) {
        console.error('Error parsing telemetry data:', err);
      }
    };

    wsRef.current.onclose = () => {
      console.log('Disconnected from Aegis Telemetry WebSocket');
      setIsConnected(false);
      // Attempt to reconnect after a delay
      setTimeout(connect, 3000);
    };

    wsRef.current.onerror = (err) => {
      // Silent error for hackathon demo so it doesn't spam the console
      wsRef.current.close();
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  // Hackathon Mock Data Stream: keeping the UI alive when WS is down
  useEffect(() => {
    let mockInterval;
    if (!isConnected) {
      mockInterval = setInterval(() => {
        setTelemetry(prev => {
          if (prev.crash_imminent) return prev; // Freeze metrics during a crash
          
          // Random walk for erraticism: stays roughly between 0.10 and 0.45
          const current = prev.keystroke_erraticism;
          let change = (Math.random() - 0.5) * 0.15;
          let next = current + change;
          next = Math.max(0.12, Math.min(0.42, next));
          
          return {
            ...prev,
            keystroke_erraticism: next,
            vocal_cadence: 0.9 + (Math.random() * 0.2),
            timestamp: new Date().toISOString()
          };
        });
      }, 2000); // update every 2 seconds
    }
    
    return () => {
      if (mockInterval) clearInterval(mockInterval);
    };
  }, [isConnected]);

  // For Hackathon demo: allow manual trigger
  const triggerManualCrash = async () => {
    try {
      await fetch(import.meta.env.VITE_API_URL + '/api/trigger-crash', {
        method: 'POST'
      });
    } catch (e) {
      console.log("Using local mock trigger for hackathon...");
      // Fallback local trigger if backend is not running
      setTelemetry(prev => ({
        ...prev,
        keystroke_erraticism: 0.92,
        vocal_cadence: 0.2,
        overall_stress_index: 0.88,
        crash_imminent: true
      }));
      setInterventionsCount(c => c + 1);
      
      // Auto recover after some time
      setTimeout(() => {
        setTelemetry(prev => ({
          ...prev,
          keystroke_erraticism: 0.15,
          vocal_cadence: 1.0,
          overall_stress_index: 0.1,
          crash_imminent: false
        }));
      }, 15000);
    }
  };

  return { 
    telemetry, 
    isConnected, 
    interventionsCount,
    triggerManualCrash 
  };
};
