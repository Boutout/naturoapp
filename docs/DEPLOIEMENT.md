# Mise en ligne de NaturoApp

L'app a besoin d'être servie en **HTTPS** pour être installable (PWA) et pour que
le verrou (Web Crypto) fonctionne pleinement. `file://` ne suffit pas.

Un fichier **`CNAME`** est présent dans le dépôt avec le domaine
**`naturoapp.konect.xyz`** : il est destiné à **GitHub Pages** (domaine personnalisé).
Le `.nojekyll` à la racine évite que GitHub « traite » les fichiers (on les sert tels quels).

---

## ⚠️ À trancher : GitHub Pages OU VPS (pas les deux sur le même domaine)

Deux pistes visent le même domaine `naturoapp.konect.xyz` — il faut **en choisir une**,
sinon conflit DNS/routage :

- **GitHub Pages** (recommandé ici) : gratuit, simple, statique. Le `CNAME` est déjà prêt.
- **VPS konect** (Docker/Traefik) : le pipeline `compose.yml` + `deploy.yml` existe mais
  est en **déclenchement manuel** (`workflow_dispatch`). À n'utiliser que si tu héberges
  toi-même.

Le reste de ce guide suppose **GitHub Pages**.

---

## Étapes GitHub Pages

1. **Repo GitHub → Settings → Pages**
   - *Source* : « Deploy from a branch »
   - *Branch* : `main` · *Folder* : `/ (root)` → **Save**
2. **Custom domain** : vérifier que le champ affiche `naturoapp.konect.xyz`
   (il est rempli automatiquement à partir du fichier `CNAME`). Laisser GitHub
   faire la **vérification DNS**, puis cocher **Enforce HTTPS** quand c'est dispo.
3. **DNS** (chez le gestionnaire du domaine `konect.xyz`) — faire pointer le
   sous-domaine vers GitHub Pages :
   - soit un **CNAME** `naturoapp` → `boutout.github.io`
   - soit 4 enregistrements **A** vers les IP GitHub Pages
     (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`).
   - ⚠️ Si le DNS de `naturoapp.konect.xyz` pointe actuellement vers le **VPS/Cloudflare**,
     il faut le **rebasculer** vers GitHub Pages (sinon Pages restera « non vérifié »).
4. Patienter la propagation DNS + l'émission du certificat, puis ouvrir
   `https://naturoapp.konect.xyz`.

> Sans domaine perso, l'app est de toute façon servie sur
> `https://boutout.github.io/naturoapp/` une fois Pages activé. Dans ce cas,
> **supprimer le fichier `CNAME`** (sinon Pages tente le domaine perso).

---

## Alternative ultra-simple (sans DNS) : Netlify Drop

1. https://app.netlify.com/drop
2. Glisser-déposer **tout le dossier** → lien `https://…netlify.app` immédiat.

---

## Installer sur le téléphone (lien HTTPS ouvert)

- **iPhone (Safari)** : Partager → « Sur l'écran d'accueil ».
- **Android (Chrome)** : ⋮ → « Installer l'application ».

## Après chaque mise à jour du code

Incrémenter **`CACHE_VERSION` dans `sw.js`** pour que les appareils déjà
installés reçoivent la nouvelle version (sinon ils gardent l'ancienne en cache).
