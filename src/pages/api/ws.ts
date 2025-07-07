import { NextApiRequest, NextApiResponse } from "next";
import { WebSocketServer as Server } from "ws";

let wss: Server | null = null;

export default function wsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!wss) {
    console.log("Starting WebSocket server...");
    const server = (res.socket as any)?.server;
    if (!server) {
      console.error("HTTP server not found on res.socket.");
      res.status(500).end();
      return;
    }

    wss = new Server({ server });

    wss.on("connection", (ws) => {
      console.log("Client connected");

      ws.on("message", (message) => {
        // This is where you would send the audio data to a Speech-to-Text service
        // For now, we'll just echo the message back or process it as needed.
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`); // Example: echo back the message
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    });

    wss.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });
  }

  res.end();
}
