# NaturoApp — Notice

Application de révision en naturopathie (QCM, flashcards, examens, stats).
100 % locale, sans serveur. La progression est enregistrée sur l'appareil.

## 📱 Mettre l'app en ligne et l'installer sur le téléphone

Pour l'**installer comme une vraie app** (icône sur l'écran d'accueil, plein écran,
hors-ligne), il faut qu'elle soit servie en **HTTPS** (`file://` ne suffit pas).
Guide complet (GitHub Pages, Netlify, domaine perso) : **`docs/DEPLOIEMENT.md`**.

En bref :
- **Le plus simple** : https://app.netlify.com/drop → glisser-déposer le dossier → lien prêt.
- **GitHub Pages** : Repo → Settings → Pages → branche `main`, dossier `/root`.
- **Installer** : iPhone (Safari) Partager → « Sur l'écran d'accueil » ; Android (Chrome) ⋮ → « Installer l'application ».

## 🔑 Code d'accès (1ʳᵉ ouverture)
À la toute première ouverture sur un appareil, l'app demande un **code d'accès**
(connu de Clara) pour réserver l'usage aux personnes autorisées. Une fois validé,
l'appareil est autorisé et ne le redemande plus. Pour changer ce code : voir
`docs/SECURITE.md` (régénérer l'empreinte). Le code n'est jamais écrit en clair.

## 🤖 Tuteur IA (optionnel)
Un professeur IA intégré (chat) qui explique, interroge, corrige et **génère des
quiz jouables**. Pour l'activer : **Réglages → Tuteur IA** → choisir un fournisseur
et coller **sa clé API personnelle** (elle reste sur l'appareil).
- **GPT (OpenAI)** et **Claude** marchent directement. Conseillé pour démarrer :
  **GPT-4o mini** (économique) — clé sur `platform.openai.com`.
- Options moins chères (Gemini, Mistral, DeepSeek, Qwen, Kimi, GLM) : possibles,
  mais parfois bloquées par le navigateur (un message le signale).
- Depuis un **cours** : bouton « Demander au tuteur IA ». Dans le tuteur :
  « 🎮 Quiz jouable » et « 🎯 Quiz sur mes points faibles » créent des QCM jouables
  dans la Révision. Mode **vocal** (lecture des réponses) et **impression** dispo.

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
