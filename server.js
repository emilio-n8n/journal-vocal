const { WebSocketServer } = require("ws");
const http = require("http");

const port = process.env.PORT || 8080;

// Créer un serveur HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running\n");
});

// Attacher le serveur WebSocket au serveur HTTP
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Vous pouvez traiter le message ici et envoyer des réponses
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Faire écouter le serveur HTTP sur le port fourni par Render
server.listen(port, () => {
  console.log(`HTTP and WebSocket server started on port ${port}`);
});