# api-web-service-TP2

## 🌐 Endpoints disponibles

### 🔹 `GET /api/profile`
> Génère un **profil complet** à partir du pipeline d’agrégation.
http://localhost:3000/api/profile

### 🔹 `GET /api/darkdata`
> Expose uniquement les **dark data calculées**.
http://localhost:3000/api/darkdata

| Nom | Description | Exemple |
|------|--------------|----------|
| `email_domain` | Domaine extrait de l’adresse e-mail | `gmail.com` |
| `iban_length` | Longueur de l’IBAN récupéré | `27` |
| `card_is_valid` | Validation simple du numéro de carte | `true` |
| `quote_length` | Nombre de caractères dans la citation | `68` |


### 🔹 `GET /api/profiles?count=5`
> Génère plusieurs profils et renvoie également des **statistiques agrégées**.
http://localhost:3000/api/profile?count=2
> 
| Nom | Description |
|------|--------------|
| `total-profiles` | le nombre des profils retournés | 
| `avg-quote-length` | Longueur moyenne des quotes| 
| `avg-iban-length` | Longueur moyenne des ibans |


---

## 🧪 Tests rapides avec curl

```bash
# Profil unique
curl http://localhost:3000/api/profile

# Plusieurs profils
curl "http://localhost:3000/api/profiles?count=3"

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
# Dark data uniquement
curl http://localhost:3000/api/darkdata
```

