# api-web-service-TP2
## 🎯 Objectif du projet
Ce projet a pour objectif de **réutiliser un pipeline d’agrégation** pour alimenter une **API REST Node.js (Express)**.  
L’application combine plusieurs sources de données hétérogènes pour produire un **profil utilisateur unifié**,  
puis génère et expose des **dark data** issues de calculs dérivés.  

---

## 🏗️ Structure du projet
```
src/
├── config.mjs              → Configuration générale (port, clés API)
├── server.mjs              → Serveur Express
├── controllers/
│   ├── routes.mjs          → Routes REST exposées
│   └── users.mjs           → Pipeline d’agrégation et calcul des dark data
```

---

## ⚙️ Technologies utilisées
- **Node.js**
- **Express.js** (framework backend)
- **Axios** (requêtes HTTP)
- **fs** (sauvegarde locale)

---

## 🚀 Lancement du projet

### 1️⃣ Installation
```bash
npm install
```

### 2️⃣ Lancer le serveur
```bash
node src/server.mjs
```

Le serveur démarre sur :  
👉 **http://localhost:3000**

---

## 🌐 Endpoints disponibles

### 🔹 `GET /api/profile`
> Génère un **profil complet** à partir du pipeline d’agrégation.

### 🔹 `GET /api/profiles?count=5`
> Génère plusieurs profils et renvoie également des **statistiques agrégées**.

### 🔹 `GET /api/darkdata`
> Expose uniquement les **dark data calculées**.

---

## 🧠 Dark Data générées

| Nom | Description | Exemple |
|------|--------------|----------|
| `email_domain` | Domaine extrait de l’adresse e-mail | `gmail.com` |
| `iban_length` | Longueur de l’IBAN récupéré | `27` |
| `card_is_valid` | Validation simple du numéro de carte | `true` |
| `quote_length` | Nombre de caractères dans la citation | `68` |

---

## 🧪 Tests rapides avec curl

```bash
# Profil unique
curl http://localhost:3000/api/profile

# Plusieurs profils
curl "http://localhost:3000/api/profiles?count=3"

# Dark data uniquement
curl http://localhost:3000/api/darkdata
```

---

## 👨‍💻 Auteur
**Khaled Ben Salah**  
Projet académique – ESGI Paris  
Master 2 – Big Data & Intelligence Artificielle  
2025
