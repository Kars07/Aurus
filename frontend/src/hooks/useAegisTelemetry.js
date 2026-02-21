import { useState, useEffect, useCallback, useRef } from 'react';

const WEBSOCKET_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8001/ws/telemetry';

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
      console.error('WebSocket Error:', err);
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

  // For Hackathon demo: allow manual trigger
  const triggerManualCrash = async () => {
    try {
      await fetch(import.meta.env.VITE_API_URL + '/api/trigger-crash', {
        method: 'POST'
      });
    } catch (e) {
      console.error("Failed to trigger manual crash", e);
      // Fallback local trigger if backend is not running
      setTelemetry(prev => ({
        ...prev,
        keystroke_erraticism: 0.9,
        vocal_cadence: 0.2,
        overall_stress_index: 0.85,
        crash_imminent: true
      }));
      setInterventionsCount(c => c + 1);
      
      // Auto recover after some time
      setTimeout(() => {
        setTelemetry(prev => ({
          ...prev,
          keystroke_erraticism: 0.1,
          vocal_cadence: 1.0,
          overall_stress_index: 0.1,
          crash_imminent: false
        }));
      }, 10000);
    }
  };

  return { 
    telemetry, 
    isConnected, 
    interventionsCount,
    triggerManualCrash 
  };
};
