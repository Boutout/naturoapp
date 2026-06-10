# NaturoApp — Notice

Application de révision en naturopathie (QCM, flashcards, examens, stats).
100 % locale, sans serveur. La progression est enregistrée sur l'appareil.

## 📱 Mettre l'app en ligne et l'installer sur le téléphone

Pour l'**installer comme une vraie app** (icône sur l'écran d'accueil, plein écran,
fonctionnement hors-ligne), il faut qu'elle soit servie en **HTTPS**. Ouvrir le
fichier directement (`file://...`) ne suffit pas : ni l'installation ni le verrou
sécurisé ne fonctionneront. Choisis **une** des options gratuites ci-dessous.

### Option A — Netlify Drop (le plus simple, sans compte technique)
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose **tout le dossier `NaturoApp`** dans la page.
3. Tu obtiens un lien `https://...netlify.app` → c'est ton app, prête.

### Option B — GitHub Pages
1. Crée un dépôt GitHub et envoie-y tous les fichiers (sans changer la structure).
2. Repo → **Settings → Pages** → Source : branche `main`, dossier `/root`.
3. Ton app sera sur `https://<utilisateur>.github.io/<repo>/`.

### Installer sur le téléphone (une fois le lien HTTPS ouvert)
- **iPhone (Safari)** : bouton Partager → « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮ → « Installer l'application » / « Ajouter à l'écran d'accueil ».

## 👥 Plusieurs comptes (multi-utilisateurs)
- L'app gère **plusieurs comptes sur le même appareil** (comme les profils Netflix).
- Au lancement : on **choisit son profil** puis on entre son code. Chaque compte a
  son **prénom**, son **code** et sa **progression** séparés.
- « **Ajouter un compte** » crée un nouveau profil (prénom → méthode → code).
- Le bouton 🔒 en haut à droite **verrouille** et **revient à la sélection de profil**.

## 🔒 Code de sécurité (PIN ou mot de passe)
- À la création d'un compte, on **choisit la méthode** : **code PIN** (4–6 chiffres,
  rapide sur mobile) **ou mot de passe** (6 caractères min).
- Le code n'est **jamais stocké en clair** : seule une empreinte chiffrée (SHA-256
  salée) est gardée sur l'appareil. C'est un verrou local « best effort » (détails
  dans `docs/SECURITE.md`).
- **Sauvegarde** : page **Stats → Compte & sauvegarde** permet d'**exporter** sa
  progression (fichier) et de la **réimporter** (changer d'appareil, ne rien perdre).
  Pense à exporter régulièrement : sans serveur, un code oublié = repartir de zéro.

## 📚 Cours & concepts
- Onglet **Cours** : fiches à lire (par catégorie) + **glossaire** cherchable.
- Pour **ajouter des cours**, voir **`docs/AJOUTER-DU-CONTENU.md`** (on édite `content.js`).

## 🛠️ Fichiers
```
index.html   Tableau de bord       app.js       Données + moteur + comptes + icônes
cours.html   Cours & glossaire     content.js   ⭐ Contenu des cours (à enrichir)
revision.html QCM & Flashcards      style.css    Design system
examen.html  Examens blancs        manifest.json / sw.js   PWA (installation, hors-ligne)
stats.html   Statistiques          icons/       Icônes de l'app installée
docs/        Fiches techniques (architecture, ajout de contenu, sécurité)
CLAUDE.md    Guide pour l'assistant Claude Code
```

## ✏️ Modifier le contenu
- **Cours / glossaire** → `content.js`  ·  **Questions de QCM** → tableau `QUESTIONS`
  en haut de `app.js`. Guide détaillé : `docs/AJOUTER-DU-CONTENU.md`.
- ⚠️ Après toute modification, **incrémente `CACHE_VERSION` dans `sw.js`** pour que la
  mise à jour se propage sur les appareils où l'app est déjà installée.
