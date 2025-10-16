// src/controllers/routes.mjs
import express from "express";
import { generateUserProfile } from "./users.mjs";

const router = express.Router();

/**
 * GET /api/profile
 * → Retourne un seul profil agrégé complet
 */
router.get("/profile", async (req, res) => {
  try {
    const profile = await generateUserProfile();
    res.status(200).json(profile);
  } catch (error) {
    console.error("Erreur API /profile :", error.message);
    res.status(500).json({ error: "Erreur lors de la génération du profil" });
  }
});

/**
 * GET /api/profiles?count=5
 * → Génère plusieurs profils et renvoie aussi des statistiques (agrégation simple)
 */
router.get("/profiles", async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 3;
    const profiles = [];

    for (let i = 0; i < count; i++) {
      const p = await generateUserProfile();
      profiles.push(p);
    }

    // Exemple d'agrégation : moyenne de la longueur des citations et de la taille des IBAN
    const avgQuoteLength = (
      profiles.reduce((sum, p) => sum + p.dark_data.quote_length, 0) / profiles.length
    ).toFixed(2);

    const avgIbanLength = (
      profiles.reduce((sum, p) => sum + p.dark_data.iban_length, 0) / profiles.length
    ).toFixed(2);

    const stats = {
      total_profiles: profiles.length,
      avg_quote_length: Number(avgQuoteLength),
      avg_iban_length: Number(avgIbanLength)
    };

    res.status(200).json({ profiles, stats });
  } catch (error) {
    console.error("Erreur API /profiles :", error.message);
    res.status(500).json({ error: "Erreur lors de la génération multiple de profils" });
  }
});

/**
 * GET /api/darkdata
 * → Génère un profil et renvoie uniquement les dark data calculées
 */
router.get("/darkdata", async (req, res) => {
  try {
    const profile = await generateUserProfile();

    if (!profile.dark_data) {
      return res.status(404).json({
        error: "Aucune dark data trouvée. Veuillez regénérer un profil."
      });
    }

    res.status(200).json(profile.dark_data);
  } catch (error) {
    console.error("Erreur API /darkdata :", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des dark data" });
  }
});

export default router;
