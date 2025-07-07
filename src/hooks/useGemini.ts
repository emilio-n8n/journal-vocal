"use client";

import { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";

export const useGemini = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    // Initialiser Pusher avec vos clés publiques
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    // S'abonner à un canal
    const channel = pusher.subscribe("my-channel");

    // Écouter un événement spécifique
    channel.bind("my-event", (data: any) => {
      setMessage(data.message);
      setIsConnected(true); // Considérer comme connecté si on reçoit un message
    });

    // Gérer les erreurs de connexion Pusher
    pusher.connection.bind("error", (err: any) => {
      console.error("Pusher connection error:", err);
      setError(err);
      setIsConnected(false);
    });

    pusher.connection.bind("connected", () => {
      setIsConnected(true);
    });

    pusher.connection.bind("disconnected", () => {
      setIsConnected(false);
    });

    // Nettoyage lors du démontage du composant
    return () => {
      channel.unbind_all();
      pusher.unsubscribe("my-channel");
      pusher.disconnect();
    };
  }, []);

  return { message, isConnected, error };
};