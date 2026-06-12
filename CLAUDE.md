# CLAUDE.md — Guide de l'assistant pour NaturoApp

> Fiche de référence pour toute session Claude Code sur ce projet.
> Lis-la AVANT de modifier du code. Détails approfondis dans `docs/`.

## 1. C'est quoi
Application web de **révision en naturopathie**, pensée d'abord pour mobile et
**installable comme une app (PWA)**. Multi-utilisateurs.
**Vanilla HTML/CSS/JS**, sans build. La progression vit dans `localStorage`
(cache local + hors-ligne) ET se **synchronise dans le cloud via Supabase**
(comptes e-mail/mot de passe, multi-appareils). Ressources externes : Google Fonts
+ client `@supabase/supabase-js` (CDN).

> ⚠️ Évolution d'archi (2026-06-12) : la règle d'or historique « aucun serveur /
> aucune dépendance » a été **volontairement abandonnée** pour permettre la sync
> multi-appareils. Voir §9. Supabase ne demande pas de backend à écrire : la clé
> `anon` est publique par conception, la sécurité passe par Row Level Security.

## 2. Fichiers
```
index.html      Tableau de bord (héros + anneau de progression + planning)
cours.html      Cours à lire + glossaire (lit content.js)
revision.html   QCM + Flashcards (sidebar/drawer, modes)
examen.html     Examens blancs (timer, bilan, impression)
stats.html      Statistiques (heatmap, progression, historique, compte)
app.js          ⭐ Cœur : données QUESTIONS + State + Profiles(auth) + icônes + animations
content.js      ⭐ Contenu pédagogique (cours, glossaire) — À ENRICHIR
style.css       Design system complet
manifest.json   Config PWA   ·   sw.js  Service worker (hors-ligne)
icons/          Icônes de l'app installée
docs/           ARCHITECTURE.md · AJOUTER-DU-CONTENU.md · SECURITE.md
```

## 3. Règles d'or (NE PAS casser)
1. **Vanilla, sans build.** Pas de framework, pas de npm, pas de bundler. Dépendances
   externes limitées et chargées par CDN (Google Fonts, `@supabase/supabase-js`). Pas
   d'autre fetch externe non justifié.
2. **app.js est encapsulé dans une IIFE.** SEUL `window.APP` est global. ⚠️ Ne JAMAIS
   déclarer `const State`/`QUESTIONS`… au niveau global : ça entre en collision avec
   `const { State } = window.APP` des pages (« Identifier already declared ») et casse
   TOUT le script de la page. Tout ce qui doit être partagé passe par `window.APP`.
3. **Le rendu attend le déverrouillage.** Chaque page fait son init dans
   `window.APP.onReady(() => { State.init(); … })`. Ne jamais appeler `State.init()`
   avant qu'un profil soit actif (la clé de stockage dépend du profil).
4. **Icônes = SVG, jamais d'emoji.** Statique : `<span data-icon="nom"></span>`
   (hydraté au boot). Dynamique (innerHTML) : `APP.icon('nom')`, puis
   `APP.hydrateIcons(el)` si tu as inséré des `data-icon`.
5. **Écrire dans localStorage UNIQUEMENT via State/Profiles** (`State.recordAnswer`,
   `State.save`, `Profiles.create`…). Jamais en direct.
6. **Sécurité : échapper toute saisie utilisateur** rendue en innerHTML avec
   `APP.escapeHtml(...)` (noms de profil, contenu des cours). Voir `docs/SECURITE.md`.
7. **Respecter `prefers-reduced-motion`** (déjà géré globalement + helpers).
8. **Toujours charger `app.js` en dernier** dans le `<body>`. Ordre des scripts en fin
   de `<body>` : `content.js` (si besoin) → CDN `supabase-js` → `supabase-config.js`
   → `app.js`. Toute nouvelle page doit reprendre ce bloc.

## 4. API publique — `window.APP`
- `State` — données du profil actif. `.init() .save() .reset() .recordAnswer(id,ok)`
  `.getOverallScore() .getWeakQuestions(n) .getProgressByDay() .saveExamSession()`
  `.saveRevisionSession() .markLessonRead(id) .isLessonRead(id) .setOnboarded()`
  `.exportData() .importData(json)`
- `Profiles` — comptes. `.all() .count() .get(id) .active() .activeId()`
  `.create({name,method,credential}) .verify(id,cred) .rename(id,name) .remove(id)`
  `.changeCredential(id,method,cred) .clearActive()`. `method = 'pin' | 'password'`.
- `Cloud` — sync Supabase. `.enabled()` (config présente ?) `.start(done)` (auth + réconciliation, appelé par boot) `.signOut()` `.schedulePush()` (push debouncé, appelé par State.save) `.currentUser()`.
- `onReady(cb)` — exécute cb quand un compte est actif (cloud ou local). `currentProfile()`.
- `QUESTIONS` (80) · `shuffle` · `getQuestionsByDay` · `formatTime` · `getScoreColor` · `getGrade`
- `icon(name,opts)` · `hydrateIcons(root)` · `escapeHtml(s)`
- `animateNumber(el,to,opts)` · `progressRing(pct,opts)` · `setRing(barEl,pct)` · `prefersReducedMotion()`

## 5. Données & stockage (par profil)
- `naturoapp_profiles` (localStorage) : `{ profiles:[{id,name,auth:{method,salt,hash,len},createdAt}] }`
- `naturoapp_active` (sessionStorage) : id du profil déverrouillé pour la session
- `naturoapp_data_<id>` (localStorage) : la progression du profil (questionStats, sessions, lessonsRead, dailyStats…)
- Migration auto de l'ancien compte unique (`naturoapp_v1` + `naturoapp_auth`) → 1er profil « Clara ».

## 5bis. Sync cloud (Supabase)
- Config dans **`supabase-config.js`** (`window.SUPABASE_URL` + `window.SUPABASE_ANON_KEY`,
  publiques). Tant que les valeurs contiennent `YOUR-PROJECT`, le cloud est **désactivé**
  et l'app retombe sur les comptes locaux PIN (aucune régression).
- **Cloud activé** : `boot()` appelle `Cloud.start(fireReady)` → connexion e-mail/mdp
  (Supabase Auth) → un profil local « miroir » est créé (`id = user.id`, `auth.method='cloud'`)
  pour réutiliser tout le moteur `State`. La progression de l'utilisateur cloud vit donc
  toujours dans `naturoapp_data_<user.id>` (cache local), et se synchronise.
- **Réconciliation au login** : compare `updatedAt` local vs cloud → le plus récent gagne
  (last-write-wins sur le blob `data`). Si le cloud est vide → migration du compte local
  le plus « riche » de l'appareil.
- **Push** : `State.save()` estampille `data.updatedAt` puis déclenche `Cloud.schedulePush()`
  (upsert debouncé ~2 s dans la table `user_progress`).
- **Table SQL** : `user_progress(user_id uuid PK → auth.users, display_name text, data jsonb, updated_at timestamptz)` + RLS (chaque user ne lit/écrit que sa ligne). SQL complet dans `docs/` ou le handoff.
- **Hors-ligne** : la 1re connexion sur un appareil exige le réseau ; ensuite la session
  Supabase est persistée → l'app marche hors-ligne sur le cache local et resynchronise au retour.
- Recommandé côté Supabase : désactiver « Confirm email » (Auth → Email) pour une UX fluide.

## 6. Ajouter du contenu
Voir **`docs/AJOUTER-DU-CONTENU.md`**. En bref : éditer `content.js`
(`window.NATURO_CONTENT.cours[]`), relier aux QCM via `questionIds`, puis
**incrémenter `CACHE_VERSION` dans `sw.js`**. Pour ajouter des QUESTIONS : éditer
le tableau `QUESTIONS` en haut de `app.js` (mêmes champs : id, jour, categorie,
sujet, question, options[4], bonne, explication, piege, mnemo, tags).

## 7. Tester
Servir le dossier (`python3 -m http.server`) et ouvrir dans un navigateur
(le `file://` direct empêche PWA + crypto). Dans un contexte non sécurisé (http
non-localhost) le hash PIN utilise un fallback JS pur — c'est normal. Toujours
vérifier la console (0 erreur) et tester mobile (≤768px) ET desktop.

## 8. Pièges connus
- Le `<style>` inline des pages est chargé APRÈS `style.css` → pour surcharger une
  règle du design system depuis une media-query globale, utiliser `!important`
  (cas du drawer `.sidebar` en mobile).
- Les fonctions appelées par `onclick="..."` inline doivent rester globales
  (ne pas les enfermer dans le callback `onReady`).
- `Date.now()`/`Math.random()` OK ici (ce n'est pas un workflow).
