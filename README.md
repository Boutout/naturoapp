# 🌿 NaturoApp

Application web de **révision en naturopathie**, pensée mobile-first et **installable comme une app (PWA)**. 100 % **vanilla HTML/CSS/JS**, **aucune dépendance**, **aucun serveur** : tout tourne dans le navigateur, la progression vit dans `localStorage`.

> 👉 Notice d'utilisation (installation, comptes, tuteur) : **[LISEZ-MOI.md](LISEZ-MOI.md)**
> 👉 Mise en ligne : **[docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md)**

## ✨ Fonctionnalités

- **QCM** (mono & multi-réponses) · **Flashcards** · **Examens blancs** (timer, bilan, impression)
- **Cours** à lire + **glossaire** cherchable · **Carte mentale** interactive des concepts
- **Statistiques** : heatmap, progression par thème, courbe d'évolution des examens
- **Gamification** : XP/niveaux, série quotidienne, objectif du jour, badges, jardin, défi du jour, **SRS** (répétition espacée)
- **Cas pratiques** (patient virtuel, raisonnement clinique) · **Bilan de vitalité** · **Sprint chrono**
- **Recherche universelle** (Ctrl/⌘ + K) dans questions, cours, cas, glossaire
- **Tuteur IA** multi-fournisseurs (GPT, Claude, Gemini, Mistral, DeepSeek, Qwen, Kimi, GLM) — clé personnelle, mémoire de conversation, mode vocal, fiches imprimables, **quiz IA jouables** (libre ou sur tes points faibles)
- **Multi-comptes** sur un même appareil (style Netflix), chacun protégé par PIN ou mot de passe
- **Code d'accès** global à la 1ʳᵉ ouverture (réserve l'app aux personnes autorisées)
- **PWA** : installable, hors-ligne (service worker), thème clair/sombre, son & vibration

## 🗂 Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Tableau de bord |
| `cours.html` / `content.js` | Cours & glossaire (contenu pédagogique à enrichir) |
| `revision.html` | QCM & Flashcards |
| `examen.html` | Examens blancs |
| `stats.html` | Statistiques |
| `cas.html` · `bilan.html` · `carte.html` · `tuteur.html` · `reglages.html` | Cas pratiques · Bilan · Carte mentale · Tuteur IA · Réglages |
| `app.js` | ⭐ Cœur : données QUESTIONS + State + comptes + icônes + IA |
| `style.css` | Design system |
| `manifest.json` · `sw.js` · `icons/` | PWA |
| `docs/` · `CLAUDE.md` | Doc technique & guide assistant |

## 🚀 Lancer en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000  (le file:// direct casse la PWA + le crypto)
```

## 🔒 Sécurité

Tout étant côté client, les protections (code d'accès, codes de compte) sont des **verrous locaux dissuasifs** : le code n'est jamais stocké en clair (empreinte SHA-256 salée). Détails et limites honnêtes dans **[docs/SECURITE.md](docs/SECURITE.md)**.

## ➕ Ajouter du contenu

Éditer `content.js` (cours/glossaire) ou le tableau `QUESTIONS` en haut de `app.js`, puis **incrémenter `CACHE_VERSION` dans `sw.js`**. Guide : **[docs/AJOUTER-DU-CONTENU.md](docs/AJOUTER-DU-CONTENU.md)**.

---
*Projet personnel pour la révision en naturopathie. Outil pédagogique — ne remplace pas un avis médical.*
