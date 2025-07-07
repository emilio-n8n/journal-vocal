const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

// Exemple d'utilisation : envoyer un message toutes les 5 secondes
setInterval(() => {
  pusher.trigger("my-channel", "my-event", {
    message: "hello world from server.js " + new Date().toLocaleTimeString(),
  });
  console.log("Pusher event triggered.");
}, 5000);

console.log("Pusher backend initialized.");