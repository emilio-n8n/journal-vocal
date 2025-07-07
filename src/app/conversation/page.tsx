"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGemini } from "@/hooks/useGemini";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import ImageUploader from "@/components/ImageUploader";

export default function ConversationPage() {
  const router = useRouter();
  const { isConnected, error, socket } = useGemini();
  const [transcription, setTranscription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    (data) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    }
  );

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.transcript) {
          setTranscription((prev) => prev + message.transcript);
        }
      };
    }
  }, [socket]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleGenerateArticle = async () => {
    const formData = new FormData();
    formData.append("transcription", transcription);
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch("/api/generate-article", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    router.push(`/article?article=${data.article}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold">Enregistrement en cours...</h1>
      <p className="mt-4 text-lg">
        État de la connexion: {isConnected ? "Connecté" : "Déconnecté"}
      </p>
      {error && <p className="text-red-500">Erreur: {JSON.stringify(error)}</p>}
      <div className="mt-8">
        <Button
          onClick={handleToggleRecording}
          size="lg"
          disabled={!isConnected}
        >
          {isRecording ? "Arrêter l'enregistrement" : "Commencer l'enregistrement"}
        </Button>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold">Transcription</h2>
        <p className="mt-4 text-lg">{transcription}</p>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <ImageUploader onFilesChange={setImages} />
      </div>
      <div className="mt-8">
        <Button
          onClick={handleGenerateArticle}
          size="lg"
          disabled={!transcription}
        >
          Générer l'article
        </Button>
      </div>
    </div>
  );
}
