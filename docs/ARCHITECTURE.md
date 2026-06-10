# Architecture

## Vue d'ensemble
SPA multi-pages, sans framework ni serveur. Chaque page HTML charge `style.css`,
puis (pour cours.html) `content.js`, puis `app.js`, puis un script inline propre
à la page. `app.js` expose tout via `window.APP` (IIFE — voir CLAUDE.md règle #2).

```
            ┌──────────── window.APP (app.js, IIFE) ────────────┐
            │  QUESTIONS · State · Profiles · icônes · anims    │
            └───────────────────────────────────────────────────┘
                 ▲              ▲                 ▲
        content.js (cours)   pages HTML      sw.js (cache PWA)
```

## Cycle de vie d'une page
1. `<head>` : mini-script anti-flash ajoute `html.pre-lock` si pas de session active.
2. `app.js` s'exécute (IIFE) → définit `window.APP`, puis `boot()` au DOM prêt.
3. `boot()` : `migrateLegacy()` → `hydrateIcons()` → `registerSW()` → vérifie le profil.
   - Profil actif en session → `fireReady()`.
   - Sinon → `gate()` affiche le portail (sélection/création/saisie), puis `fireReady()`.
4. `fireReady()` retire `pre-lock` et exécute tous les `onReady(cb)` enregistrés.
5. Le script inline de la page a fait `window.APP.onReady(() => { State.init(); render(); })`.

## Authentification (multi-profils)
- `Profiles` gère un registre de comptes (localStorage) + le profil actif (sessionStorage).
- `gate(onUnlock)` est une petite machine à états : `select` → `auth(pin|password)`
  ou `create` (assistant : nom → méthode → code → confirmation).
- Détails et clés de stockage : voir CLAUDE.md §5 et docs/SECURITE.md.

## État / progression
- `State` lit/écrit `naturoapp_data_<profil>`. `State._ensureShape()` rend les
  anciennes données compatibles (ajoute `lessonsRead`, `onboarded`, compteurs manquants).

## Contenu
- `content.js` → `window.NATURO_CONTENT { cours[], glossaire[] }`. `cours.html`
  le rend (catégories → cartes → lecteur plein écran), suit la lecture via
  `State.markLessonRead`, et lance l'entraînement ciblé via `revision.html?ids=`.

## Design system (`style.css`)
- Variables CSS (couleurs sauge/ocre/crème, rayons, ombres organiques, easings).
- Style « Organic Biophilic » : coins arrondis, ombres douces teintées vert,
  typo Lora (titres) + Inter (texte).
- Navigation : barre supérieure (desktop) + **barre inférieure** type app (mobile).
- Animations : entrées échelonnées, compteurs, anneaux SVG — toutes coupées si
  `prefers-reduced-motion`.

## PWA
- `manifest.json` (standalone, thème vert, icônes maskable) + `sw.js`
  (app-shell en cache, navigation réseau-d'abord). Bumper `CACHE_VERSION` à chaque
  changement de fichier statique.

## Conventions
- Français pour l'UI et les commentaires.
- Réutiliser les classes existantes de `style.css` avant d'écrire du CSS nouveau.
- Une page = un script inline ; les helpers partagés vont dans `app.js`.
