import express from "express";
import { createClient } from "bedrock-protocol";

// CONFIGURACIÓN DEL SERVIDOR MINECRAFT
const HOST = "vetalancraft.aternos.me"; // tu servidor
const PORT = 11885;                     // puerto del servidor
const USERNAME = "BotAFK";              // nombre del bot

// SERVIDOR EXPRESS para mantener vivo el bot en Koyeb/UptimeRobot
const app = express();
const PORT_EXPRESS = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Bot AFK Vetalancraft activo ✅");
});

app.listen(PORT_EXPRESS, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT_EXPRESS}`);
});

// FUNCIONAMIENTO DEL BOT AFK
function iniciarBot() {
  const client = createClient({
    host: HOST,
    port: PORT,
    username: USERNAME
  });

  client.on("connect", () => {
    console.log("🟢 Bot conectado al servidor de Aternos");
  });

  client.on("disconnect", (reason) => {
    console.log("❌ Bot desconectado:", reason);
    setTimeout(iniciarBot, 5000); // Reconecta después de 5 segundos
  });

  client.on("error", (err) => {
    console.error("⚠️ Error del bot:", err);
    client.close();
    setTimeout(iniciarBot, 5000);
  });
}

// Inicia el bot
iniciarBot();
