"use client";

import { useState, useEffect, useRef } from "react";

export const useGemini = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);

  useEffect(() => {
    const wsUrl = process.env.NODE_ENV === "production"
      ? `wss://journal-vocal-backend.onrender.com`
      : "ws://localhost:8080";
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      setSocket(ws);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setSocket(null);
    };

    ws.onerror = (err) => {
      setError(err);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { socket, isConnected, error };
};
