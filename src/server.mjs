// src/server.mjs
import express from "express";
import config from "./config.mjs";
import router from "./controllers/routes.mjs";

const app = express();
const env = config.development;

app.use(express.json());

// 👇 Toutes les routes définies dans routes.mjs seront préfixées par /api
app.use("/api", router);

app.listen(env.port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${env.port}/api/profile`);
});
